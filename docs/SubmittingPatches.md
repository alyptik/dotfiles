Here are some guidelines for people who want to contribute their code
to this software.

(0) Decide what to base your work on.

In general, always base your work on the oldest branch that your
change is relevant to.

 - A bugfix should be based on 'maint' in general. If the bug is not
   present in 'maint', base it on 'master'. For a bug that's not yet
   in 'master', find the topic that introduces the regression, and
   base your work on the tip of the topic.

 - A new feature should be based on 'master' in general. If the new
   feature depends on a topic that is in 'pu', but not in 'master',
   base your work on the tip of that topic.

 - Corrections and enhancements to a topic not yet in 'master' should
   be based on the tip of that topic. If the topic has not been merged
   to 'next', it's alright to add a note to squash minor corrections
   into the series.

 - In the exceptional case that a new feature depends on several topics
   not in 'master', start working on 'next' or 'pu' privately and send
   out patches for discussion. Before the final merge, you may have to
   wait until some of the dependent topics graduate to 'master', and
   rebase your work.

 - Some parts of the system have dedicated maintainers with their own
   repositories (see the section "Subsystems" below).  Changes to
   these parts should be based on their trees.

To find the tip of a topic branch, run "git log --first-parent
master..pu" and look for the merge commit. The second parent of this
commit is the tip of the topic branch.

(1) Make separate commits for logically separate changes.

Unless your patch is really trivial, you should not be sending
out a patch that was generated between your working tree and
your commit head.  Instead, always make a commit with complete
commit message and generate a series of patches from your
repository.  It is a good discipline.

Give an explanation for the change(s) that is detailed enough so
that people can judge if it is good thing to do, without reading
the actual patch text to determine how well the code does what
the explanation promises to do.

If your description starts to get too long, that's a sign that you
probably need to split up your commit to finer grained pieces.
That being said, patches which plainly describe the things that
help reviewers check the patch, and future maintainers understand
the code, are the most beautiful patches.  Descriptions that summarize
the point in the subject well, and describe the motivation for the
change, the approach taken by the change, and if relevant how this
differs substantially from the prior version, are all good things
to have.

Make sure that you have tests for the bug you are fixing.  See
t/README for guidance.

When adding a new feature, make sure that you have new tests to show
the feature triggers the new behavior when it should, and to show the
feature does not trigger when it shouldn't.  After any code change, make
sure that the entire test suite passes.

If you have an account at GitHub (and you can get one for free to work
on open source projects), you can use their Travis CI integration to
test your changes on Linux, Mac (and hopefully soon Windows).  See
GitHub-Travis CI hints section for details.

Do not forget to update the documentation to describe the updated
behavior and make sure that the resulting documentation set formats
well. It is currently a liberal mixture of US and UK English norms for
spelling and grammar, which is somewhat unfortunate.  A huge patch that
touches the files all over the place only to correct the inconsistency
is not welcome, though.  Potential clashes with other changes that can
result from such a patch are not worth it.  We prefer to gradually
reconcile the inconsistencies in favor of US English, with small and
easily digestible patches, as a side effect of doing some other real
work in the vicinity (e.g. rewriting a paragraph for clarity, while
turning en_UK spelling to en_US).  Obvious typographical fixes are much
more welcomed ("teh -> "the"), preferably submitted as independent
patches separate from other documentation changes.

Oh, another thing.  We are picky about whitespaces.  Make sure your
changes do not trigger errors with the sample pre-commit hook shipped
in templates/hooks--pre-commit.  To help ensure this does not happen,
run "git diff --check" on your changes before you commit.


(2) Describe your changes well.

The first line of the commit message should be a short description (50
characters is the soft limit, see DISCUSSION in git-commit(1)), and
should skip the full stop.  It is also conventional in most cases to
prefix the first line with "area: " where the area is a filename or
identifier for the general area of the code being modified, e.g.

  . doc: clarify distinction between sign-off and pgp-signing
  . githooks.txt: improve the intro section

If in doubt which identifier to use, run "git log --no-merges" on the
files you are modifying to see the current conventions.

It's customary to start the remainder of the first line after "area: "
with a lower-case letter. E.g. "doc: clarify...", not "doc:
Clarify...", or "githooks.txt: improve...", not "githooks.txt:
Improve...".

The body should provide a meaningful commit message, which:

  . explains the problem the change tries to solve, i.e. what is wrong
    with the current code without the change.

  . justifies the way the change solves the problem, i.e. why the
    result with the change is better.

  . alternate solutions considered but discarded, if any.

Describe your changes in imperative mood, e.g. "make xyzzy do frotz"
instead of "[This patch] makes xyzzy do frotz" or "[I] changed xyzzy
to do frotz", as if you are giving orders to the codebase to change
its behavior.  Try to make sure your explanation can be understood
without external resources. Instead of giving a URL to a mailing list
archive, summarize the relevant points of the discussion.

If you want to reference a previous commit in the history of a stable
branch, use the format "abbreviated sha1 (subject, date)",
with the subject enclosed in a pair of double-quotes, like this:

    Commit f86a374 ("pack-bitmap.c: fix a memleak", 2015-03-30)
    noticed that ...

The "Copy commit summary" command of gitk can be used to obtain this
format, or this invocation of "git show":

    git show -s --date=short --pretty='format:%h ("%s", %ad)' <commit>

(3) Generate your patch using Git tools out of your commits.

Git based diff tools generate unidiff which is the preferred format.

You do not have to be afraid to use -M option to "git diff" or
"git format-patch", if your patch involves file renames.  The
receiving end can handle them just fine.

Please make sure your patch does not add commented out debugging code,
or include any extra files which do not relate to what your patch
is trying to achieve. Make sure to review
your patch after generating it, to ensure accuracy.  Before
sending out, please make sure it cleanly applies to the "master"
branch head.  If you are preparing a work based on "next" branch,
that is fine, but please mark it as such.


(4) Sending your patches.

Learn to use format-patch and send-email if possible.  These commands
are optimized for the workflow of sending patches, avoiding many ways
your existing e-mail client that is optimized for "multipart/*" mime
type e-mails to corrupt and render your patches unusable.

People on the Git mailing list need to be able to read and
comment on the changes you are submitting.  It is important for
a developer to be able to "quote" your changes, using standard
e-mail tools, so that they may comment on specific portions of
your code.  For this reason, each patch should be submitted
"inline" in a separate message.

Multiple related patches should be grouped into their own e-mail
thread to help readers find all parts of the series.  To that end,
send them as replies to either an additional "cover letter" message
(see below), the first patch, or the respective preceding patch.

If your log message (including your name on the
Signed-off-by line) is not writable in ASCII, make sure that
you send off a message in the correct encoding.

WARNING: Be wary of your MUAs word-wrap
corrupting your patch.  Do not cut-n-paste your patch; you can
lose tabs that way if you are not careful.

It is a common convention to prefix your subject line with
[PATCH].  This lets people easily distinguish patches from other
e-mail discussions.  Use of additional markers after PATCH and
the closing bracket to mark the nature of the patch is also
encouraged.  E.g. [PATCH/RFC] is often used when the patch is
not ready to be applied but it is for discussion, [PATCH v2],
[PATCH v3] etc. are often seen when you are sending an update to
what you have previously sent.

"git format-patch" command follows the best current practice to
format the body of an e-mail message.  At the beginning of the
patch should come your commit message, ending with the
Signed-off-by: lines, and a line that consists of three dashes,
followed by the diffstat information and the patch itself.  If
you are forwarding a patch from somebody else, optionally, at
the beginning of the e-mail message just before the commit
message starts, you can put a "From: " line to name that person.

You often want to add additional explanation about the patch,
other than the commit message itself.  Place such "cover letter"
material between the three-dash line and the diffstat.  For
patches requiring multiple iterations of review and discussion,
an explanation of changes between each iteration can be kept in
Git-notes and inserted automatically following the three-dash
line via `git format-patch --notes`.

Do not attach the patch as a MIME attachment, compressed or not.
Do not let your e-mail client send quoted-printable.  Do not let
your e-mail client send format=flowed which would destroy
whitespaces in your patches. Many
popular e-mail applications will not always transmit a MIME
attachment as plain text, making it impossible to comment on
your code.  A MIME attachment also takes a bit more time to
process.  This does not decrease the likelihood of your
MIME-attached change being accepted, but it makes it more likely
that it will be postponed.

Exception:  If your mailer is mangling patches then someone may ask
you to re-send them using MIME, that is OK.

Do not PGP sign your patch. Most likely, your maintainer or other people on the
list would not have your PGP key and would not bother obtaining it anyway.
Your patch is not judged by who you are; a good patch from an unknown origin
has a far better chance of being accepted than a patch from a known, respected
origin that is done poorly or does incorrect things.

If you really really really really want to do a PGP signed
patch, format it as "multipart/signed", not a text/plain message
that starts with '-----BEGIN PGP SIGNED MESSAGE-----'.  That is
not a text/plain, it's something else.

Send your patch with "To:" set to the mailing list, with "cc:" listing
people who are involved in the area you are touching (the output from
"git blame $path" and "git shortlog --no-merges $path" would help to
identify them), to solicit comments and reviews.

After the list reached a consensus that it is a good idea to apply the
patch, re-send it with "To:" set to the maintainer [*1*] and "cc:" the
list [*2*] for inclusion.

Do not forget to add trailers such as "Acked-by:", "Reviewed-by:" and
"Tested-by:" lines as necessary to credit people who helped your
patch.

    [Addresses]
     *1* The current maintainer: gitster@pobox.com
     *2* The mailing list: git@vger.kernel.org


(5) Certify your work by adding your "Signed-off-by: " line

To improve tracking of who did what, we've borrowed the
"sign-off" procedure from the Linux kernel project on patches
that are being emailed around.  Although core Git is a lot
smaller project it is a good discipline to follow it.

The sign-off is a simple line at the end of the explanation for
the patch, which certifies that you wrote it or otherwise have
the right to pass it on as a open-source patch.  The rules are
pretty simple: if you can certify the below D-C-O:

        Developer's Certificate of Origin 1.1

        By making a contribution to this project, I certify that:

        (a) The contribution was created in whole or in part by me and I
            have the right to submit it under the open source license
            indicated in the file; or

        (b) The contribution is based upon previous work that, to the best
            of my knowledge, is covered under an appropriate open source
            license and I have the right under that license to submit that
            work with modifications, whether created in whole or in part
            by me, under the same open source license (unless I am
            permitted to submit under a different license), as indicated
            in the file; or

        (c) The contribution was provided directly to me by some other
            person who certified (a), (b) or (c) and I have not modified
            it.

        (d) I understand and agree that this project and the contribution
            are public and that a record of the contribution (including all
            personal information I submit with it, including my sign-off) is
            maintained indefinitely and may be redistributed consistent with
            this project or the open source license(s) involved.

then you just add a line saying

        Signed-off-by: Random J Developer <random@developer.example.org>

This line can be automatically added by Git if you run the git-commit
command with the -s option.

Notice that you can place your own Signed-off-by: line when
forwarding somebody else's patch with the above rules for
D-C-O.  Indeed you are encouraged to do so.  Do not forget to
place an in-body "From: " line at the beginning to properly attribute
the change to its true author (see (2) above).

Also notice that a real name is used in the Signed-off-by: line. Please
don't hide your real name.

If you like, you can put extra tags at the end:

1. "Reported-by:" is used to credit someone who found the bug that
   the patch attempts to fix.
2. "Acked-by:" says that the person who is more familiar with the area
   the patch attempts to modify liked the patch.
3. "Reviewed-by:", unlike the other tags, can only be offered by the
   reviewer and means that she is completely satisfied that the patch
   is ready for application.  It is usually offered only after a
   detailed review.
4. "Tested-by:" is used to indicate that the person applied the patch
   and found it to have the desired effect.

You can also create your own tag or use one that's in common usage
such as "Thanks-to:", "Based-on-patch-by:", or "Mentored-by:".

------------------------------------------------
Subsystems with dedicated maintainers

Some parts of the system have dedicated maintainers with their own
repositories.

 - git-gui/ comes from git-gui project, maintained by Pat Thoyts:

        git://repo.or.cz/git-gui.git

 - gitk-git/ comes from Paul Mackerras's gitk project:

        git://ozlabs.org/~paulus/gitk

 - po/ comes from the localization coordinator, Jiang Xin:

	https://github.com/git-l10n/git-po/

Patches to these parts should be based on their trees.

------------------------------------------------
An ideal patch flow

Here is an ideal patch flow for this project the current maintainer
suggests to the contributors:

 (0) You come up with an itch.  You code it up.

 (1) Send it to the list and cc people who may need to know about
     the change.

     The people who may need to know are the ones whose code you
     are butchering.  These people happen to be the ones who are
     most likely to be knowledgeable enough to help you, but
     they have no obligation to help you (i.e. you ask for help,
     don't demand).  "git log -p -- $area_you_are_modifying" would
     help you find out who they are.

 (2) You get comments and suggestions for improvements.  You may
     even get them in a "on top of your change" patch form.

 (3) Polish, refine, and re-send to the list and the people who
     spend their time to improve your patch.  Go back to step (2).

 (4) The list forms consensus that the last round of your patch is
     good.  Send it to the maintainer and cc the list.

 (5) A topic branch is created with the patch and is merged to 'next',
     and cooked further and eventually graduates to 'master'.

In any time between the (2)-(3) cycle, the maintainer may pick it up
from the list and queue it to 'pu', in order to make it easier for
people play with it without having to pick up and apply the patch to
their trees themselves.

------------------------------------------------
Know the status of your patch after submission

* You can use Git itself to find out when your patch is merged in
  master. 'git pull --rebase' will automatically skip already-applied
  patches, and will let you know. This works only if you rebase on top
  of the branch in which your patch has been merged (i.e. it will not
  tell you if your patch is merged in pu if you rebase on top of
  master).

* Read the Git mailing list, the maintainer regularly posts messages
  entitled "What's cooking in git.git" and "What's in git.git" giving
  the status of various proposed changes.

--------------------------------------------------
GitHub-Travis CI hints

With an account at GitHub (you can get one for free to work on open
source projects), you can use Travis CI to test your changes on Linux,
Mac (and hopefully soon Windows).  You can find a successful example
test build here: https://travis-ci.org/git/git/builds/120473209

Follow these steps for the initial setup:

 (1) Fork https://github.com/git/git to your GitHub account.
     You can find detailed instructions how to fork here:
     https://help.github.com/articles/fork-a-repo/

 (2) Open the Travis CI website: https://travis-ci.org

 (3) Press the "Sign in with GitHub" button.

 (4) Grant Travis CI permissions to access your GitHub account.
     You can find more information about the required permissions here:
     https://docs.travis-ci.com/user/github-oauth-scopes

 (5) Open your Travis CI profile page: https://travis-ci.org/profile

 (6) Enable Travis CI builds for your Git fork.

After the initial setup, Travis CI will run whenever you push new changes
to your fork of Git on GitHub.  You can monitor the test state of all your
branches here: https://travis-ci.org/<Your GitHub handle>/git/branches

If a branch did not pass all test cases then it is marked with a red
cross.  In that case you can click on the failing Travis CI job and
scroll all the way down in the log.  Find the line "<-- Click here to see
detailed test output!" and click on the triangle next to the log line
number to expand the detailed test output.  Here is such a failing
example: https://travis-ci.org/git/git/jobs/122676187

Fix the problem and push your fix to your Git fork.  This will trigger
a new Travis CI build to ensure all tests pass.


------------------------------------------------
MUA specific hints

Some of patches I receive or pick up from the list share common
patterns of breakage.  Please make sure your MUA is set up
properly not to corrupt whitespaces.

See the DISCUSSION section of git-format-patch(1) for hints on
checking your patch by mailing it to yourself and applying with
git-am(1).

While you are at it, check the resulting commit log message from
a trial run of applying the patch.  If what is in the resulting
commit is not exactly what you would want to see, it is very
likely that your maintainer would end up hand editing the log
message when he applies your patch.  Things like "Hi, this is my
first patch.\n", if you really want to put in the patch e-mail,
should come after the three-dash line that signals the end of the
commit message.


Pine
----

(Johannes Schindelin)

I don't know how many people still use pine, but for those poor
souls it may be good to mention that the quell-flowed-text is
needed for recent versions.

... the "no-strip-whitespace-before-send" option, too. AFAIK it
was introduced in 4.60.

(Linus Torvalds)

And 4.58 needs at least this.

---
diff-tree 8326dd8350be64ac7fc805f6563a1d61ad10d32c (from e886a61f76edf5410573e92e38ce22974f9c40f1)
Author: Linus Torvalds <torvalds@g5.osdl.org>
Date:   Mon Aug 15 17:23:51 2005 -0700

    Fix pine whitespace-corruption bug

    There's no excuse for unconditionally removing whitespace from
    the pico buffers on close.

diff --git a/pico/pico.c b/pico/pico.c
--- a/pico/pico.c
+++ b/pico/pico.c
@@ -219,7 +219,9 @@ PICO *pm;
	    switch(pico_all_done){	/* prepare for/handle final events */
	      case COMP_EXIT :		/* already confirmed */
		packheader();
+#if 0
		stripwhitespace();
+#endif
		c |= COMP_EXIT;
		break;


(Daniel Barkalow)

> A patch to SubmittingPatches, MUA specific help section for
> users of Pine 4.63 would be very much appreciated.

Ah, it looks like a recent version changed the default behavior to do the
right thing, and inverted the sense of the configuration option. (Either
that or Gentoo did it.) So you need to set the
"no-strip-whitespace-before-send" option, unless the option you have is
"strip-whitespace-before-send", in which case you should avoid checking
it.


Thunderbird, KMail, GMail
-------------------------

See the MUA-SPECIFIC HINTS section of git-format-patch(1).

Gnus
----

'|' in the *Summary* buffer can be used to pipe the current
message to an external program, and this is a handy way to drive
"git am".  However, if the message is MIME encoded, what is
piped into the program is the representation you see in your
*Article* buffer after unwrapping MIME.  This is often not what
you would want for two reasons.  It tends to screw up non ASCII
characters (most notably in people's names), and also
whitespaces (fatal in patches).  Running 'C-u g' to display the
message in raw form before using '|' to run the pipe can work
this problem around.
