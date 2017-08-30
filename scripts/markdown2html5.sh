#!/bin/sh
# Convert a markdown file to HTML5, generating thumbnails 
# *currently this will generate new thumbnails each run*

# Parse out all headers and make a small nav element
# TODO: Nesting
anchors() {
	while read -r line; do
		case "$line" in
			"##"\ *) printf '\t\t\t\t<li><a href="#%s">%s</a></li>\n' "${line#* }" "${line#* }" ;;
		esac
	done < "$1"
}

section() {
	cat <<SECTION
		<section>
			<header>
				<h2><a name="${1#* }">${1#* }</a></h2>
			</header>
SECTION
}

inline() {
	# Match links
	line="$1"
	# Ugly, but it does work.
	while :; do
		case "$line" in
			*"*"*"*"*)	middle="${line#*\*}"
				middle="${middle%%\**}"
				line="${line%%\**}<em>$middle</em>${line##*\*}" ;;
			*_*_*)	middle="${line#-*}"
				middle="${middle%%-*}"
				line="${line&&-*}<s>$middle</s>${line##-*}" ;;
			*\[*\]\(*\)*) 	desc="${line##*\[}"
				url="${line##*\(}"
				desc="${desc%%\]*}"
				url="${url%%\)*}"
				line="${line%%\[*}<a href=\"$url\">$desc</a>${line##*\)}" ;;
			*\`*\`*) middle="${line#*\`}"
				middle="${middle%%\`*}"
				line="${line%%\`*}<pre><code>$middle</code></pre>${line##*\`}" ;;
			*) break ;;
		esac
	done
	printf '			<p>%s</p>\n' "$line"
}

# Generate thumbnails, make links to real resources, add max-height and max-width
images() {
	# Grab what is between [ and ], ( and )
	desc="${1##*\[}"
	file="${1##*\(}"
	desc="${desc%%\]*}"
	file="${file%%\)*}"
	file="${file%%\ *}"
	# See if we have metadata
	if test -f "$file"; then
		link="$(exiftool "$file" | awk '/^Comment/ {print $NF }')"
		if test "$link" = ""; then
			mogrify -resize 1200x1080 -format jpg "$file"
			link="$(pbpst -Sf "$file").jpg"
			exiftool -overwrite_original -Comment="$link" "$file"
		fi
	else 
		link="$file"
	fi
	wait
	printf '			<img style="%s" src="%s" alt="%s" title="%s" />\n' "max-width: 99%; max-height: 99%" "$link" "$desc" "$desc"
}

# Using heredocs simply to have clean tabs
body() {
	read -r title
	section "$title"
	while :; do
		flag=0
		while read -r "line"; do
			case "$line" in
				\>*) printf '<blockquote><p>%s</p></blockquote>\n' "$(inline "${line#*>}")" ;;
				"##"\ *) printf '		%s\n\n' "</section>"
					section "$line"
					flag=1
					break ;;
				# Should be enough to catch our images
				!*) images "$line" ;;
				# Catch empty lines
				"") ;;
				*) inline "$line" ;; 
			esac
		done		
		test $flag -eq 0 && break
	done
	printf '		%s\n\n' "</section>"
}

cat <<HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>$(basename "$1")</title>
		<link rel="stylesheet" href="../style.css">
	</head>
	<main>
		<a href="https://halfwit.github.io">back</a>
		<h1>$(head -n 1 "$1" | sed 's/# //')</h1>
		<nav>
			<ul>
$(anchors "$1")
			</ul>
		<nav>
		$(awk 'NR > 1 { print }' "$1" | body)
	</main>
	<footer>
		<section>
			<p>© 2017 Michael Misch</p>
			<p>Questions? Comments? Email me. <a href="mailto:michaelmisch1985@gmail.com">michaelmisch1985@gmail.com</a></p>
		</section>
	</footer>
</html>
HTML
wait
