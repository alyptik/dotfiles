require "fileinto";
require "mailbox";

#require [ "vnd.dovecot.filter" ];
#filter "spamc" [ "--no-safe-fallback" ];

# Filter on Subject: Undelivered...
if header :contains "Subject" "Undelivered Mail"
{
    fileinto :create "Spam";
} 

# Filter on SpamAssassin
if header :contains "X-Spam-Level" "*****"
{
    fileinto :create "Spam";
} 
