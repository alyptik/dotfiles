# Some default enhancements/settings for IRB, based on
# http://wiki.rubygarden.org/Ruby/page/show/Irb/TipsAndTricks

unless defined? ETC_IRBRC_LOADED
  # Require RubyGems by default.
  require 'rubygems'

  # Activate auto-completion.
  require 'irb/ext/save-history'
  require 'irb/completion'

  # Use the simple prompt if possible.
  ARGV.concat [ "--readline", "--prompt-mode", "simple" ]
  # IRB.conf[:PROMPT_MODE] = :SIMPLE if IRB.conf[:PROMPT_MODE] == :DEFAULT
  IRB.conf[:AUTO_INDENT]=true

  # Setup permanent history.
  HISTFILE = "~/.irb_history"
  MAXHISTSIZE = 100
  begin
    histfile = File::expand_path(HISTFILE)
    if File::exists?(histfile)
      lines = IO::readlines(histfile).collect { |line| line.chomp }
      puts "Read #{lines.nitems} saved history commands from '#{histfile}'." if $VERBOSE
      Readline::HISTORY.push(*lines)
    else
      puts "History file '#{histfile}' was empty or non-existant." if $VERBOSE
    end
    Kernel::at_exit do
      # IRB::HistorySavingAbility.create_finalizer.call(IRB.CurrentContext.instance_variable_get(:@io).send(:binding))
      lines = Readline::HISTORY.to_a.reverse.uniq.reverse
      lines = lines[-MAXHISTSIZE, MAXHISTSIZE] if lines.count > MAXHISTSIZE
      puts "Saving #{lines.length} history lines to '#{histfile}'." if $VERBOSE
      File::open(histfile, File::WRONLY|File::CREAT|File::TRUNC) { |io| io.puts lines.join("\n") }
    end
  rescue => e
    puts "Error when configuring permanent history: #{e}" if $VERBOSE
  end

  ETC_IRBRC_LOADED=true
end
