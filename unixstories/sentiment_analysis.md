# Sentiment Analysis Algorithms

--------------------------------------------------------------------

There are many methods and algorithms to implement sentiment analysis
systems, which can be classified as:

Rule-based systems that perform sentiment analysis based on a set of
manually crafted rules.
Automatic systems that rely on machine learning techniques to learn
from data.
Hybrid systems that combine both rule based and automatic approaches.

Rule-based Approaches
Usually, rule-based approaches define a set of rules in some kind of
scripting language that identify subjectivity, polarity, or the subject
of an opinion.

The rules may use a variety of inputs, such as the following:

Classic NLP techniques like stemming, tokenization, part of speech
tagging and parsing.
Other resources, such as lexicons (i.e. lists of words and expressions).

A basic example of a rule-based implementation would be the following:

Define two lists of polarized words (e.g. negative words such as bad,
worst, ugly, etc and positive words such as good, best, beautiful,
etc).
Given a text:
Count the number of positive words that appear in the text.
Count the number of negative words that appear in the text.
If the number of positive word appearances is greater than the number
of negative word appearances return a positive sentiment, conversely,
return a negative sentiment. Otherwise, return neutral.
This system is very naïve since it doesn't take into account how words
are combined in a sequence. A more advanced processing can be made,
but these systems get very complex quickly. They can be very hard to
maintain as new rules may be needed to add support for new expressions
and vocabulary. Besides, adding new rules may have undesired outcomes
as a result of the interaction with previous rules. As a result, these
systems require important investments in manually tuning and maintaining
the rules.

Automatic Approaches
Automatic methods, contrary to rule-based systems, don't rely on manually
crafted rules, but on machine learning techniques. The sentiment analysis
task is usually modeled as a classification problem where a classifier
is fed with a text and returns the corresponding category, e.g. positive,
negative, or neutral (in case polarity analysis is being performed).


Said machine learning classifier can usually be implemented with the
following steps and components:

Automatic Approaches for Sentiment analysis

The Training and Prediction Processes
In the training process (a), our model learns to associate a particular
input (i.e. a text) to the corresponding output (tag) based on the
test samples used for training. The feature extractor transfers the
text input into a feature vector. Pairs of feature vectors and tags
(e.g. positive, negative, or neutral) are fed into the machine learning
algorithm to generate a model.

In the prediction process (b), the feature extractor is used to transform
unseen text inputs into feature vectors. These feature vectors are
then fed into the model, which generates predicted tags (again, positive,
negative, or neutral).

Feature Extraction from Text
The first step in a machine learning text classifier is to transform
the text into a numerical representation, usually a vector. Usually,
each component of the vector represents the frequency of a word or
expression in a predefined dictionary (e.g. a lexicon of polarized
words). This process is known as feature extraction or text vectorization
and the classical approach has been bag-of-words or bag-of-ngrams with
their frequency.

More recently, new feature extraction techniques have been applied
based on word embeddings (also known as word vectors). This kind of
representations makes it possible for words with similar meaning to
have a similar representation, which can improve the performance of
classifiers.

Classification Algorithms
The classification step usually involves a statistical model like Naïve
Bayes, Logistic Regression, Support Vector Machines, or Neural Networks:


Naïve Bayes: a family of probabilistic algorithms that uses Bayes’s
Theorem to predict the category of a text.

Linear Regression: a very well-known algorithms in statistics used
to predict some value (Y) given a set of features (X).

Support Vector Machines: a non-probabilistic model which uses a representation
of text examples as points in a multidimensional space. These examples
are mapped so that the examples of the different categories (sentiments)
belong to distinct regions of that space.. Then, new texts are mapped
onto that same space and predicted to belong to a category based on
which region they fall into.

Deep Learning: a diverse set of algorithms that attempts to imitate
how the human brain works by employing artificial neural networks to
process data.

Sentiment Analysis Metrics and Evaluation
There are many ways in which you can obtain performance metrics for
evaluating a classifier and to understand how accurate a sentiment
analysis model is. One of the most frequently used is known as cross-validation.


What cross-validation does is splitting the training data into a certain
number of training folds (with 75% of the training data) and a the
same number of testing folds (with 25% of the training data), use the
training folds to train the classifier, and test it against the testing
folds to obtain performance metrics (see below). The process is repeated
multiple times and an average for each of the metrics is calculated.


If your testing set is always the same, you might be overfitting to
that testing set, which means you might be adjusting your analysis
to a given set of data so much that you might fail to analyze a different
set. Cross-validation helps prevent that. The more data you have, the
more folds you will be able to use.

Precision, Recall, and Accuracy
Precision, recall, and accuracy are standard metrics used to evaluate
the performance of a classifier.

Precision measures how many texts were predicted correctly as belonging
to a given category out of all of the texts that were predicted (correctly
and incorrectly) as belonging to the category.

Recall measures how many texts were predicted correctly as belonging
to a given category out of all the texts that should have been predicted
as belonging to the category. We also know that the more data we feed
our classifiers with, the better recall will be.

Accuracy measures how many texts were predicted correctly (both as
belonging to a category and not belonging to the category) out of all
of the texts in the corpus.

Most frequently, precision and recall are used to measure performance
since accuracy alone does not say much about how good or bad a classifier
is.

For a difficult task like analyzing sentiment, precision and recall
levels are likely to be low at first. As you feed the classifier with
more data, performance will improve. However, as we will see below,
since annotated data is not likely to be accurate, the chances are
that precision levels won’t get too high. However, if you feed the
classifier consistently tagged data, results are going to be as good
as results can be for any other classification problem.

Inter-annotator agreement
When it comes to inter-annotator agreement (i.e. agreement by humans
on a given annotation task), one of the most frequently used metrics
is Krippendorff’s Alpha. According to Saif et al., best inter-annotator
agreement for Twitter sentiment analysis reaches a 0.655 value of Krippendorff’s
Alpha. This means there is a good deal of agreement (since alpha is
greater than zero), but we believe it’s still far from great (e.g.:
around 0.8, which is the minimum reliability threshold social scientists
use in order to say data is reliable, see here). This said, only tentative
conclusions about the sentiment of tweets can be drawn from the results
of the annotation tasks described in the paper cited above.

All in all, what this 0.655 is an indicator of the difficulty of sentiment
analysis detection for humans as well. Taking into consideration that
machines learn from the data they are fed with, automatic predictions
are likely to mirror the human disagreement embedded in the data.

Hybrid Approaches
The concept of hybrid methods is very intuitive: just combine the best
of both worlds, the rule-based and the automatic ones. Usually, by
combining both approaches, the methods can improve accuracy and precision.


Sentiment Analysis Challenges
Most of the work in sentiment analysis in recent years has been around
developing more accurate sentiment classifiers by dealing with some
of the main challenges and limitations in the field.

Subjectivity and Tone
The detection of subjective and objective texts is just as important
as analyzing their tone. In fact, so called objective texts do not
contain explicit sentiments. Say, for example, you intend to analyze
the sentiment of the following two texts:

The package is nice.

The package is red.

Most people would say that sentiment is positive for the first one
and neutral for the second one, right? All predicates (adjectives,
verbs, and some nouns) should not be treated the same with respect
to how they create sentiment. In the examples above, nice is more subjective
than red.

Context and Polarity
All utterances are uttered at some point in time, in some place, by
and to some people, you get the point. All utterances are uttered in
context. Analyzing sentiment without context gets pretty difficult.
However, machines cannot learn about contexts if they are not mentioned
explicitly. One of the problems that arise from context is changes
in polarity. Look at the following responses to a survey:

Everything of it.

Absolutely nothing!

Imagine the responses above come from answers to the question What
did you like about the event? The first response would be positive
and the second one would be negative, right? Now, imagine the responses
come from answers to the question What did you DISlike about the event?
The negative in the question will make sentiment analysis change altogether.


A good deal of preprocessing or postprocessing will be needed if we
are to take into account at least part of the context in which texts
were produced. However, how to preprocess or postprocess data in order
to capture the bits of context that will help analyze sentiment is
not straightforward.

Irony and Sarcasm
Differences between literal and intended meaning (i.e. irony) and the
more insulting or ridiculizing version of irony (i.e. sarcasm) usually
change positive sentiment into negative whereas negative or neutral
sentiment might be changed to positive. However, detecting irony or
sarcasm takes a good deal of analysis of the context in which the texts
are produced and, therefore, are really difficult to detect automatically.


For example, look at some possible answers to the question Have you
had a nice customer experience with us? below.

Yeah. Sure.

Not one, but many!

What sentiment would you assign to the responses above? Probably, you
have listened to the first response so many times, you would have said
negative, right? The problem is there is no textual cue that will make
a machine learn that negative sentiment since most often, yeah and
sure belong to positive or neutral texts.

How about the second response? In this context, sentiment is positive,
but we’re sure you can come up with many different contexts in which
the same response can express negative sentiment.

Comparisons
How to treat comparisons in sentiment analysis is another challenge
worth tackling. Look at the texts below:

This product is second to none.

This is better than old tools.

This is better than nothing.

There are some comparisons like the first one above that do not need
any contextual clues in order to be classified correctly.

The second and third texts are a little more difficult to classify,
though. Would you classify them as neutral or positive? Probably, you
are more likely to choose positive for the second one and neutral for
the third, right? Once again, context can make a difference. For example,
if the old tools the second text talks about were considered useless
in context, then the second text turns out to be pretty similar to
the third text. However, if no context is provided, these texts feel
different.

Emojis
There are two types of emojis according to Guibon et al.. Western emojis
(e.g. :D) are encoded in only one character or in a combination of
a couple of them whereas Eastern emojis (e.g. ¯ \ _ (ツ) _ / ¯) are
a longer combination of characters of a vertical nature. Particularly
in tweets, emojis play a role in the sentiment of texts.

Sentiment analysis performed over tweets requires special attention
to character-level as well as word-level. However, no matter how much
attention you pay to each of them, a lot of preprocessing might be
needed. For example, you might want to preprocess social media content
and transform both Western and Eastern emojis into tokens and whitelist
them (i.e. always take them as a feature for classification purposes)
in order to help improve sentiment analysis performance.

Here’s a quite comprehensive list of emojis and their unicode characters
that may come in handy when preprocessing.

Defining Neutral
Defining what we mean by neutral is another challenge to tackle in
order to perform accurate sentiment analysis. As in all classification
problems, defining your categories -and, in this case, the neutral
tag- is one of the most important parts of the problem. What you mean
by neutral, positive, or negative does matter when you train sentiment
analysis models. Since tagging data requires that tagging criteria
be consistent, a good definition of the problem is a must.

Here’s some ideas on what a neutral tag might contain:

Objective texts. As we say here, so called objective texts do not contain
explicit sentiments, so you should include those texts into the neutral
category.
Irrelevant information. If you haven’t preprocessed your data to filter
out irrelevant information, you can tag it neutral. However, be careful!
Only do this if you know how this could affect overall performance.
Sometimes, you will be adding noise to your classifier and performance
could get worse.
Texts containing wishes. Some wishes like I wish the product had more
integrations are generally neutral. However, those including comparisons,
like I wish the product were better are pretty difficult to categorize

How Accurate Is Sentiment Analysis?
Here’s what sentiment analysis is: it’s a tremendously difficult task
even for human beings. That said, sentiment analysis classifiers might
not be as precise as other types of classifiers. Remember that inter-annotator
agreement is pretty low and that machines learn from the data they
are fed with (see above).

That said, you might be saying, is it worth the effort? The answer
is simple: it sure is worth it! Chances are that sentiment analysis
predictions will be wrong from time to time, but by using sentiment
analysis you will get the opportunity to get it right about 70-80%
of the times you submit your texts for classification.

If you or your company have not used sentiment analysis before, then
you’ll see some improvement really quickly. For typical use cases,
such as ticket routing, brand monitoring, and VoC analysis (see below),
this means you will save a lot of time and money -which you are likely
to be investing in in-house manual work nowadays,- save your teams
some frustration, and increase your (or your company’s) productivity.


Sentiment Analysis Use Cases & Applications
Sentiment Analysis Use Cases & Applications
In this section, we’ll take a dive into real life use cases, applications,
and examples of the impact of all this can have on businesses, cities,
and society – sentiment analysis in the wild, if you will.

Specifically, we’ll examine the use of sentiment analysis in the following:


Social media monitoring
Brand monitoring
Voice of customer (VoC)
Customer service
Workforce analytics and voice of employee
Product analytics
Market research and analysis
Sentiment Analysis in Social Media Monitoring
On the fateful evening of April 9th, 2017, United Airlines forcibly
removed a passenger from an overbooked flight. The nightmare-ish incident
was filmed by other passengers on their smartphones and posted immediately.
One such video, posted to Facebook, was shared more than 87,000 times
and viewed 6.8 million times by 6pm on Monday, just 24 hours later.


The fiasco was magnified horrifically by the company’s dismissive response.
On Monday afternoon, they tweeted a statement from the CEO apologizing
for “having to re-accommodate customers.” Cue public outrage –you can
imagine the field day on Twitter.

This is exactly the kind of PR catastrophe we’d all like to do happily
without. This is also an excellent example of why we care not only
about if people are talking about our brand, but how they’re talking
about it. More mentions does not equal positive mentions.

In today’s day and age, brands of all shapes and sizes have meaningful
interactions with customers, leads, and even competition on social
networks like Facebook, Twitter, and Instagram. Most marketing departments
are already tuned into to online mentions as far as volume –they measure
more chatter as more brand awareness. Nowadays, however, we can take
a step deeper. By using sentiment analysis on social media, we can
get incredible insights into the quality of conversation that’s happening
around a brand.

How Sentiment Analysis Can Be Used
Analyze tweets and/or facebook posts over a period of time to see sentiment
of a particular audience.
Run sentiment analysis on all social media mentions to your brand and
automatically categorize by urgency.
Automatically route social media mentions to team members best fit
to respond.
Automate any or all of these processes.
Use analytics to gain deep insight into what’s happening across your
social media channels.
Top Benefits
Sentiment analysis is useful in social media monitoring because it
helps you do all of the following:

Prioritize action. Which is more urgent: a fuming customer or a subtle
“thanks!” shout-out? Obviously the fumer. Sentiment analysis lets you
easily filter unread mentions by positivity and negativity, showing
you which blazing fires to put on the “extinguish immediately” list
and which slow smolders can wait a bit.
Track trends over time.
Tune into a specific point in time –i.e. the lead-up to a new product
launch or the day a particular piece of bad press dropped.
Keep a finger on the competition. Why not monitor your competitors’
social media the same way you monitor your own? If you tune in closely,
maybe you notice there’s been a negative response to a particular feature
of their new product, and you respond by designing a lead generation
campaign targeting exactly that gap. They won’t even know what hit
them.
Example: Trump vs Clinton, according to Twitter

Over the course of a few months during the 2016 US Presidential Elections,
we collected and analyzed millions of tweets mentioning Clinton or
Trump posted by users from around the world. We classified each of
those tweets with a sentiment of either positive, neutral, or negative.


For example:

Negative: “Racial discord was conceived, nurtured, refined & perpetuated
by Americans incl @realDonaldTrump’s father. Get real!”
Neutral: “@HillaryClinton will receive the first question at tonight’s
presidential debate, according to @CBSNews #ClintonVsTrump”.
Positive: “Americans trust @realDonaldTrump to Make our Economy Great
Again!”
Positive: “@wcve it’s amazing how our city loves him and he really
loves our city. @HillaryClinton made a great choice for Vice President.
@timkaine”.
From this simple, easy analysis, we found interesting insights:

More tweets mentioned @realDonaldTrump (~450k/day) than @HillaryClinton
(~250k/day). Again, this does not equal positivity, but does imply
brand awareness (and in the case of something like elections, awareness
is key).
For both candidates, there were more negative than positive tweets.
Given that it’s Twitter and politics, this was not much of a surprise.

Trump had a better positive to negative Tweet ratio than Clinton.
To sum up, more people were tweeting about Trump, and a higher percentage
of the people tweeting about Trump were doing so more positively than
were the people tweeting about Clinton.

Sentiment Analysis in Brand Monitoring
Not only do brands have a wealth of information available on social
media, but they also can look more broadly across the internet to see
how people are talking about them online. Instead of focusing on specific
social media platforms such as Facebook and Twitter, we can target
mentions in places like news, blogs, and forums –again, looking at
not just the volume of mentions, but also the quality of those mentions.


In our United Airlines example, for instance, the flare-up started
on the social media platforms of a few passengers. Within hours, it
was picked up by news sites and spread like wildfire across the US.
News then spread to China and Vietnam, as the passenger was reported
to be an American of Chinese-Vietnamese descent and people accused
the perpetrators of racial profiling. In China, the incident became
the number one trending topic on Weibo, a microblogging site with almost
500 million users.

And again, this is all happening within mere hours and days of when
the incident took place.

How Sentiment Analysis Can Be Used
Analyze news articles, blog posts, forum discussions, and other texts
on the internet over a period of time to see sentiment of a particular
audience.
Automatically categorize urgency of all online mentions to your brand
via sentiment analysis.
Automatically alert designated team members of online mentions that
concern their area of work.
Automate any or all of these processes.
Better understand a brand online presence by getting all kinds of interesting
insights and analytics.
Top Benefits
Sentiment analysis is useful in brand monitoring because it helps you
do all of this:

Understand how your brand reputation evolves over time.
Research your competition and understand how their reputation also
evolves over time.
Identify potential PR crises and know to take immediate action. Again,
prioritize what fires need to be put out immediately and what mentions
can wait.
Tune into a specific point in time. Again, maybe you want to look at
just press mentions on the day of your IPO filing, or a new product
launch. Sentiment analysis lets you do that.
Example: Expedia Canada

Around Christmastime, Expedia Canada ran a classic “escape winter”
marketing campaign. All was well, except for their choice of screeching
violin as background music. Understandably, people took to social media,
blogs, and forums. Expedia noticed that and removed the ad. Then, they
created a series of follow-up spin-off videos: one showed the original
actor smashing the violin, and in another one, they invited a real
follower who had complained on Twitter to come in and rip the violin
away. Though their original product was far from flawless, they were
able to redeem themselves by incorporating real customer feedback into
continued iterations.

Using sentiment analysis (and machine learning), you can automatically
monitor all chatter around your brand and detect this type of potentially-explosive
scenario while you still have time to defuse it.

Sentiment Analysis in Customer Feedback
Social media and brand monitoring offer us immediate, unfiltered, invaluable
information on customer sentiment. In a parallel vein run two other
troves of insight –surveys and customer support interactions. Teams
often look at their Net Promoter Score (NPS), but we can also apply
this analyses to any type of survey or communication channel that yields
textual customer feedback.

NPS surveys ask a few simple questions – namely, Would you recommend
this company, product, and/or service to a friend or family member?
and why? –and use that to identify customers as promoters, passives,
or detractors. The goal is to identify overall customer experience,
and find ways to elevate all customers to “promoter” level, where they
theoretically will buy more, stay longer, and refer other customers.


Numerical survey data is easily aggregated and assessed, but we want
that same ease with the “why” answers as well. A regular NPS score
simply gives you a number, without the additional context of what it’s
about and why the score landed there. Sentiment analysis takes it that
step further.

How Sentiment Analysis Can Be Used:
Analyze aggregated NPS or other survey responses.
Analyze aggregated customer support interactions.
Track customer sentiment about specific aspects of the business over
time. This adds depth to explain why the overall NPS score might have
changed, or if specific aspects have shifted independently.
Target individuals to improve their service. By automating sentiment
analysis on incoming surveys, you can be alerted to customers who feel
strongly negatively towards your product or service, and can deal with
them specifically.
Determine if particular customer segments feel more strongly about
your company. You can zero in on sentiment by certain demographics,
interests, personas, etc.
Top Benefits:
Sentiment analysis is useful in understanding Voice of Customer (VoC)
because it helps you do all of the following:

Use results of sentiment analysis to design better informed questions
to ask on future surveys.
Understand the nuances of customer experience over time, along with
why and how shifts are happening.
Empower your internal teams by giving them a deeper view of the customer
experience, by segment and by specific aspects of the business.
Respond more quickly to signals and shifts from customers.
Example: McKinsey City Voices project

In Brazil, federal public spending rose by 156% from 2007 to 2015 while
people’s satisfaction with public services steadily decreased. Unhappy
with this counterproductive progress, the Urban-planning Department
recruited McKinsey to help them work on a series of new projects that
would focus first on user experience, or citizen journeys, when delivering
services. This citizen-centric style of governance has led to the rise
of what we call Smart Cities.

McKinsey developed a tool called City Voices, which conducts citizen
(customer) surveys across more than 150 different metrics, and then
runs sentiment analysis to help leaders understand how constituents
live and what they need, in order to better inform public policy. By
using this tool, the Brazilian government was able to surface urgent
needs –a safer bus system, for instance– and improve them first.

If even whole cities and countries, famous for their red tape and slow
pace, are incorporating customer journeys and sentiment analysis into
their decision making processes, then innovative companies better be
far ahead.

Sentiment Analysis in Customer Support
We all know the drill: stellar customer experiences = more probable
returning customers. Particularly in recent years, there’s been a lot
of talk (rightfully so) around customer experience and customer journeys.
Leading companies have begun to realize that oftentimes how they deliver
is just as (if not more) important as what they deliver. Nowadays,
more than ever, customers expect their experience with companies to
be immediate, intuitive, personal, and hassle-free. In fact, research
shows that 25% of customers will switch to a competitor after just
one negative interaction.

We already looked at how we can use sentiment analysis in looking at
the broader VoC, but now we’ll dial in on specifically customer service
teams.

How Sentiment Analysis Can Be Used:
Automate systems to run sentiment analysis on all incoming customer
support queries.
Rapidly detect disgruntled customers and surface those tickets to the
top.
Route queries to specific team members best suited to respond.
Use analytics to gain deep insight into what’s happening across your
customer support.
Top Benefits
Sentiment analysis is useful in customer support because it helps you
do all of this:

Prioritize order for responding to tickets, being sure to address the
most urgent needs first.
Increase efficiency by automatically assigning tickets to a particular
category or team member.
Example: Analyzing customer support interactions on Twitter

Just for kicks, we decided to do some analysis on how the four biggest
US phone carriers (AT&T, Verizon, Sprint, and T-Mobile) handled customer
support interactions on Twitter. We downloaded tens of thousands of
tweets mentioning the companies (by name or by handle), and ran them
through a MonkeyLearn sentiment model to categorize each tweet as positive,
neutral, or negative. We then used our new Insight Extractor, which
reads all text as one unit, extracts the most relevant keywords, and
returns the most relevant sentences including each keyword.

Here’s some insights:

T-Mobile had far and away the highest percentage of positive tweets.

Verizon was the only company with more negative tweets than positive
ones.
Top keywords for positive tweets at Verizon included typical terms
such as “new phone,” “thanks,” and “quality customer service.” Key
sentences were typical, formal, somewhat dry interactions between the
team and followers.
Top keywords for positive tweets at T-Mobile included names of people
on their customer support team, because their team runs higher engagement,
back-and-forth about anything type conversations with followers.
To sum up, this could imply that a more personal, engaging take on
social media elicits more positive responses and higher customer satisfaction.




Sentiment Analysis in Workforce Analytics & Voice of the Employee
In the same way we measure VoC via customer surveys, we can solicit
and act on feedback from our own employees. Chances are they are wildly
more invested in giving actionable ideas on how to improve the workplace.
And chances are that you, as the employer, are wildly more interested
in keeping them engaged and empowered to do their best.

How Sentiment Analysis Can Be Used:
Analyze employee surveys, extract keywords, and view by segment.
Track changes in employee sentiment over time.
Surface urgent concerns immediately.
Top Benefits:
Sentiment analysis is useful in workplace analytics and VoE because
it helps you do the following:

Discover and address employee concerns, ensuring they feel heard and
valued.
Understand VoE in real-time, rather than annual surveys or performance
reviews.
Example:

Let’s say you conduct an internal survey asking employees to rate various
aspects of their workplace experience and explain why they feel that
way. On a scale of 1 to 10, a top-performing employee may say she rates
her engagement at work as a 5 –not ideal. However, if we look closer,
we see she added “I love the work I do and my training opportunities
have been excellent, but my boss makes occasional inappropriate remarks
towards me that make me feel uncomfortable.”

A response like this should raise red flags of potential sexual harassment
and be brought immediately to HR’s attention in order to address the
situation. If you simply slop it together with the other aggregated
scores and don’t read through them for another two months, you risk
losing a valuable employee or heightening an already tense situation.


Sentiment Analysis in Product Analytics
In our agile world, we’ve learned that products are best built by prototyping
early, soliciting feedback frequently, and continuing to iterate and
improve. But for many product teams, soliciting frequent feedback can
be the trickiest part. How do you narrow down which customer segment
to ask? How do you sort through and weigh all their feedback? This
is exactly where sentiment analysis can change the game. Whether by
analyzing surveys, customer support interactions, or social media,
machine learning enables you to assess huge amounts of product feedback
at once.

How Sentiment Analysis Can Be Used:
Analyze large quantities of product feedback surveys
Analyze all social media and online mentions about a product
Filter comments by aspect and by sentiment, in order to see what to
tweak and what to keep.
Automatically route relevant comments to product teams.
Top Benefits:
Sentiment analysis is useful to product analytics because it helps
you do all of the following:

Keep constant tabs on what people like and don’t like about your product.

Zero in on which segments like which things, and how to appeal to those
audiences.
Empower your product development team with incredible insight into
specifics of product performance.
Example: MonkeyLearn

Our team runs sentiment analysis on customer support interactions and
uses those insights to empower everyone in our company –not just our
support agents. So when a customer mentions that they’re having difficulty
with X or that they’d like to see Y, we feed that information directly
to the people who make and manage our products. We had real feedback
from real customers, directly reaching the ears of the people to whom
it mattered most. As any great product team does, we listen to the
customers and meet their needs. All too often, all it takes is simply
equipping your team with the right insight.

Sentiment Analysis in Market Research and Analysis
And as a final use case, sentiment analysis empowers all kinds of market
research and competitive analysis. Whether you’re exploring a new market,
anticipating future trends, or keeping an edge on the competition,
sentiment analysis can make all the difference.

How Sentiment Analysis Can Be Used:
Analyze product reviews of your brand and compare those with the competition

Generate weekly, monthly, or daily reports –a sort of early-warning
system
Compare sentiment across international markets
Analyze formal market reports or business journals for long-term, broader
trends
Analyze tweets and social media posts for real-time happenings
Analyze reviews for unfiltered customer feedback
Use aspect-based sentiment analysis to gain rich insight into the details
and the reason for otherwise opaque market trends
Top Benefits
Sentiment analysis is useful in market research and analysis because
it helps you:

Tap into new sources of information.
Quantify otherwise qualitative information.
Add that qualitative dimension to already-gathered quantitative insights.

Provide information in real-time rather than in retrospect.
Automated for regular (perhaps weekly) reports.
Fill in gaps where public data is scarce –in emerging markets, for
instance.
Examples: Hotel reviews on TripAdvisor

Our team was curious about how people feel about hotels in several
major cities around the world, so we scraped and analyzed more than
one million reviews from TripAdvisor. We looked at hotels in London,
Paris, New York, Bangkok, Madrid, Beijing, and Rio de Janeiro.

Here’s some insights:

Reviews were mostly positive –on average, 82% of the things people
wrote were tagged with a positive sentiment:
London hotels got the worst reviews.
London was reviewed as dirtier than New York and with the worst food
overall.
We used the keyword extraction module to analyze the actual content
of the positive/negative reviews, and found a few more interesting
insights:

“Cockroaches” appears only in Bangkok –watch out!
“Croissants” appears only in Paris (as we might expect). Shockingly,
though, they appear to be a letdown –reviewed almost exclusively in
a negative context. With a closer dive, we saw that was more a reflection
on the subpar hotel breakfast food than on the city itself (phew!).

Sentiment Analysis Resources
Sentiment Analysis Resources
Where to Start with Sentiment Analysis
Let’s say that you recently heard about sentiment analysis and it sounded
like magic: automatically understanding if a particular message is
speaking good or bad about something. You feel inspired thinking about
the different applications of this technology.

Now, you want to know more about sentiment analysis, go deeper and
explore the different ideas that you may have. But, the thing is you
don’t really know where to start or what to do next.

Sentiment analysis is a really vast topic and sometimes beginners can
feel overwhelmed on how to get started. There is a very large number
of resources out there, from super useful tutorials to all kinds of
courses, articles, and papers specialized on this topic.

In this section, our goal is to give a brief overview on different
materials and resources to get you started with sentiment analysis.


1) Read the basics

Before diving into the sentiment analysis literature and tutorials,
make sure you understand the very basics of sentiment analysis:

What it is?
Different types of sentiment analysis.
Why it is important?
How it works?
Later on, if you feel courageous, you can explore more advanced sentiment
analysis literature.

2) Try out an online demo

A good next step in your journey to learn more about sentiment analysis
is to play and experiment with an online demo, a place where you can
simply type a message and test the results of the analysis for different
expressions.

This is useful for having a first-hand experience on the good, the
bad, and the ugly of sentiment analysis. By playing with practical
examples, you can quickly understand on what type of expressions sentiment
analysis shines and works like a charm. You will also rapidly grasp
what the challenges and caveats of this technology are.

3) Start experimenting with a tutorial of your choice

Once you have the basics in place, it's time to get your hands dirty
and experiment on the domain you are interested in. To do so, we recommend
that you browse through the myriad of tutorials available and pick
one within your domain and interests.

Sentiment Analysis Demo
In this section, you can try out different models that were trained
using MonkeyLearn for a diverse set of sentiment analysis tasks. Feel
free to experiment with different expressions and see how different
models behave and make their predictions.

If you get an odd result, it could be because the expression you've
used hasn’t been correctly learned by the model (yet). Try entering
more words to see how this affects the results.

Additionally, you can use MonkeyLearn to create a custom model for
sentiment analysis to get specific results that are tailored to your
domain and interest.

Generic Sentiment Analysis
This is a generic sentiment analysis classifier for texts in English.
It works well on any kind of texts. If you are not sure about which
sentiment analysis model to use, you can use this one.

Test with your own text

This is the best sentiment analysis tool ever!!!
Classify Text
Results
TAGCONFIDENCE
Positive100%
Tweet Sentiment
This model can be used for classifying tweets in English according
to their sentiment (i.e. positive, neutral or negative).

Test with your own text

it’s safe to say that @elonmusk and @TeslaMotors’ ambition to accelerate
the advent of sustainable transport is a #success :-)
Classify Text
Results
TAGCONFIDENCE
Positive36%
Product Sentiment
This model classifies product reviews and opinions in English as positive
or negative according to their sentiment.

Test with your own text

High quality pants. Very comfortable and great for sport activities.
Good price for nice quality! I recommend to all fans of sports
Classify Text
Results
TAGCONFIDENCE
Positive99.1%
Hotel Sentiment
This sentiment analysis classifier was trained with data from different
hotel review sites to distinguish between good and bad reviews.

Test with your own text

My family and I stayed at Best Western Sandcastle, and we absolutely
loved it. The rooms were very clean, with an amazing view of the ocean.
We will most certainly be back at this hotel very soon.
Classify Text
Results
TAGCONFIDENCE
Positive95.8%
Restaurant Sentiment
This sentiment analysis classifier was trained with data from different
restaurant review sites to distinguish between good and bad reviews.


Test with your own text

Great Sushi! Fresh and delicious. I have been looking for a good sushi
restaurant since I moved to Milwaukee. Thursday Sushi madness is a
great value. I would definitely go again.
Classify Text
Results
TAGCONFIDENCE
Good100%
Movies Sentiment
This sentiment analysis model was trained with data from different
movie review sites to distinguish between good and bad reviews.

Test with your own text

This film makes American Pie a sophisticated movie! Humor is cheap,
dialogues are stupid and the cast is awkward. Every cliché is used
several times without any original twist. It's so sad.
Classify Text
Results
TAGCONFIDENCE
Bad92.1%
Airlines Sentiment
This model was trained with tweets about airlines to identify between
positive, neutral, and negative tweets.

Test with your own text

@AmericanAir just landed - 3 hours late flight - and now we need to
wait TWENTY MORE MINUTES for a gate! I have patience but none for incompetence.

Classify Text
Results
TAGCONFIDENCE
negative84.4%
Sentiment Analysis Tutorials
There is a sentiment analysis tutorial for almost everyone: coders,
non-coders, marketers, data analysts, support agents, salespeople,
you name it. In this section, we’ll share a varied selection of tutorials
so you can find something right up your alley and get your feet wet
with sentiment analysis.

Sentiment Analysis Tutorials for Coders
For those that feel comfortable around code and APIs, you can quickly
find all kinds of step-by-step guides and resources. Python is the
most common programming language for tutorials about data analysis,
machine learning, and NLP (including sentiment analysis) but R is quickly
catching up, especially with tutorials that aim at data scientists
and statisticians.

Sentiment Analysis of Top 100 Subreddits with Python
This video tutorial provides a step-by-step guide on how to use Python
to analyze the top 100 subreddits by the sentiment of their comments.


It starts by explaining how to use Beautiful Soup, one of the most
popular Python libraries for web scraping, in order to pull data out
of web pages. The author uses this library to scrape this web page
to get the names of the top 100 subreddits (subreddits like /r/funny,
/r/AskReddit and /r/todayilearned).

Once he gets the names of the subreddits, he uses the Praw library
to interact with the Reddit API and extract the comments from these
subreddits.

Finally, the author explains how to use TextBlob to perform sentiment
analysis on the extracted comments.

Code: https://github.com/jg-fisher/redditSentiment

Sentiment analysis of Slack reviews using R
Let’s imagine that we're the Slack team and we're looking for an easy,
reliable way to get data about users’ feelings about our product. We
can turn to online reviews in order to answer some top-of-mind questions.


But, when there are thousands of reviews out there, it can be tough
to sort through all this feedback and get the insights we're looking
for. There is simply too much feedback to process manually.

With this in mind, this step-by-step guide provides an example of how
you might use the MonkeyLearn to conduct a seamless sentiment analysis
using R of product reviews.

It analyzes a few thousand reviews of Slack on the product review site
Capterra and get some great insights from the data.

Sentiment Analysis of the State of the Union with R
Kaggle is a great resource for all kinds of tutorials related to data
science. On this useful tutorial by Rachael Tatman, you can learn how
to use R for doing sentiment analysis.

The goal is to analyze the State of the Union, the annual message by
the President of the United States to the Congress. This message is
an opportunity for the president to inform the US citizens (and the
world) on how the government is doing regarding issues that are important
to the US.

By analyzing the different messages from these State of the Union speeches,
it’s possible to get a lot of interesting insights like how the sentiment
has changed over time or what presidents tend to have a more negative
or positive speech.

The weapons of choice on this tutorial are the Tidytext package for
using a sentiment lexicon and ggplot2 package for creating the different
visualizations of our analysis.

As a first step, the author proceeds to tokenize the data, which basically
means taking the text from the speeches and breaking it up into its
individual words. Then, he compares these tokens against a list of
words with associated positive or negative sentiments (a sentiment
lexicon) and creates some visualizations using the ggplot package.


At the end of the tutorial, the author provides some exercises that
are useful to get some additional practice and a deeper understanding
of sentiment analysis.

Sentiment Analysis of Tweets Using NLTK
If you are a Python coder and you want to learn how to train your first
text classifier for sentiment analysis, this is a great step-by-step
guide. The author uses Natural Language Toolkit NLTK to train a classifier
that is able to predict the sentiment of a new tweet.

To get started, the author explains how to extract a list of features
from a predefined set of positive and negative tweets. These features
are a set of distinctive words that can be used to represent each tweet
and are a key part of training a classifier.

Then, you’ll learn how to prepare the training data that contains the
labeled feature sets. Finally, he proceeds to train a Naive Bayes classifier,
a simple but powerful algorithm that works particularly well with natural
language processing problems.

Once it has trained a classifier, the author proceeds to explain how
to use this model to classify a new incoming tweet.

Sentiment Analysis on Songs Using R
If you are looking for a more advanced tutorial on sentiment analysis
using R, then this tutorial is for you. It’s super fun since it explains
how to use the Tidytext package to perform sentiment analysis on Prince’s
songs.

The author starts by analyzing basic information such as the lexical
diversity of Prince lyrics. Then, it explores different sentiment lexicons
(including AFINN, Bing, and NRC) and how well they fit to analyse Prince’s
lyrics. Afterwards, it proceeds to explain how to effectively perform
sentiment analysis on all of Prince’s songs. Once it has the sentiment,
it explores the lyrics sentiment over the years and provides a practical
explanation on how bigrams affect sentiment.

This tutorial requires some basic understanding of tidy data since
it uses dplyr for data transformation and ggplot2 for visualizations.


Sentiment Analysis of Tweets Using Scikit-learn and Jupyter Notebook

Scikit-learn is a simple and efficient tool for data analysis most
often used for data classification, regression, and clustering. It’s
one of the most frequently used libraries in machine learning since
it’s powerful but accessible to everybody. If you are serious about
learning about data analysis and machine learning, this tutorial will
help you get started with scikit-learn.

It explain how to train a logistic regression model for sentiment analysis.
It starts by showing how to properly set up our environment, including
jupyter notebook, an application that allows rapid prototyping and
sharing of data-related projects.

Afterwards, the author proceeds to explain how to prepare and vectorize
our data with scikit-learn. Finally, it trains a linear classifier
and shows how to evaluate the model and calculate the accuracy of the
model.

Sentiment Analysis Tutorials for Non-technical People
Until recently, sentiment analysis was a niche technology only accessible
to technical people with coding skills and background in machine learning.
This is no longer the case thanks to the rise of a variety of tools
that can be leveraged to get the data and run sentiment analysis models.


The following are some tutorials that can help you get started with
sentiment analysis without a single line of code.

Sentiment Analysis with Excel
While we all know how to crunch numbers with Excel functions, analyzing
text in spreadsheets is still a hard and manual process. It takes a
lot of time to make sense of the text data to create reports and analyze
trends. But luckily, there's a better way. Instead of spending hours
going through each row, analyzing each text manually, you can use sentiment
analysis with Excel to save time and get more done.

MonkeyLearn’s got your back providing a fast and simple way to achieve
this. In just 2 simple steps you can incorporate sentiment analysis
right into your Excel spreadsheets.

First, you need to select a sentiment analysis model. You can either
use a pre-trained model for sentiment analysis or create your own model
with your own data and criteria.

Then, you just need to upload your Excel file to run the sentiment
analysis with the selected model. And voilà! MonkeyLearn will return
a new Excel file with the original data plus two new columns: one with
the sentiment analysis result and another one with the confidence of
the result.

Sentiment Analysis with Zapier
Are you interested in doing sentiment analysis of tweets? Getting the
sentiment of your emails? Or want to automatically understand if answers
from a survey on Typeform are positive or negative? No worries, you
can use a tool like Zapier to connect with more than 1,000 apps, get
the data that you need, and run your sentiment analysis.

After creating a Zap, you will need to set up the first step (trigger)
to get the data for doing the analysis. Zapier provides a vast number
of choices you could use to import data from, such as Office 365, Google
Sheets, Gmail, Slack, Twitter, Typeform, Evernote, Airtable, Salesforce,
and others.

Now that you have the data, you will need to set up the second step
of your zap to run the sentiment analysis with MonkeyLearn, an AI platform
that allows you to analyze text with machine learning. You can either
use pre-trained sentiment analysis models or you can build your own
model from scratch using your own data and criteria.

Third, filter out samples by confidence so you eliminate those samples
that are likely to lead to inaccurate predictions.

Finally, you should add a third step on the zap to save the results
(for example, on a spreadsheet on Google Sheets or Excel) and create
all kinds of data visualizations!

Sentiment Analysis in Google Sheets
Sentiment analysis with Google Sheets and MonkeyLearn’s add-on is pretty
straightforward and simple. You can analyze the sentiment in almost
every type of text by following 5 easy steps.

First, you must install MonkeyLearn’s add-on. To do so, go to Add-ons/Get
add-ons, search for MonkeyLearn, and add it to your list.

Second, copy your MonkeyLearn’s API Token and paste it in the add-on
Set token textbox: Go to Add-ons/MonkeyLearn and click Set token.

Third, start the add-on. Go to Add-ons/MonkeyLearn and click Start.
A pop up will appear. You will be able to choose what model to use
(e.g. Sentiment Analysis or Tweet Sentiment) and select the data you
want to analyze.

Fourth, choose the data you want to analyze. Type the cell range that
contains your texts into the Column or range textbox or select your
data and choose Active Range to analyze it.

Finally, click Run and perform any kind of analysis or visualization
you can think of.

On this step-by-step guide, we explain how to make the most out of
our Google Sheets add-on to help you get started with sentiment analysis.
We also explain some best practices and provide examples of interesting
things you can do with your data.

Sentiment Analysis with RapidMiner
RapidMiner is a platform where you can create data mining processes
without being an experienced data scientist. It provides a friendly
user interface where you can create complete data analysis workflows,
including loading your data, running machine learning models, and create
visualizations. It’s simple to use and someone with no coding skills
can quickly create automated processes and analyses of data.

Doing sentiment analysis with RapidMiner is pretty straight-forward
with the MonkeyLearn extension.

First, you have to add the data (i.e. a source) from your computer
to RapidMiner. You can upload data from a CSV file, a database, or
use other data sources available on RapidMiner marketplace to import
data from sources like Facebook, SAS, Tableau, and others.

As a second step, you have to add the MonkeyLearn classify operator
and connect it to the input (your data). This operator allows using
text classifiers available on MonkeyLearn including those trained specifically
for sentiment analysis. During this step, you have to specify your
MonkeyLearn API token, specify which sentiment analysis model you want
to use (Module ID), and select the input attribute (this would be the
text sent to MonkeyLearn to perform the sentiment analysis).

Finally, you have to connect the output of the MonkeyLearn classify
operator to the results port, click on ‘run’ and voilà! You will get
the results of running sentiment analysis on your data with zero lines
of code!

Next Steps: Research Literature
So far, we’ve read about the basics of sentiment analysis, we’ve had
a first-hand experience with a sentiment analysis model using an online
demo, and we’ve gotten our hands dirty by experimenting with a tutorial
in our domain.

By now, you are eager to level up your skills, want to learn more about
sentiment analysis in detail, and experiment with more advanced stuff.
In that case, a sound next step would be to dig into research and scientific
literature.

Papers about Sentiment Analysis
The literature around sentiment analysis is massive; there are more
than 55,700 scholarly articles, papers, theses, books, and abstracts
out there.

The following are the most frequently cited and read papers in the
sentiment analysis community in general:

Opinion mining and sentiment analysis (Pang and Lee, 2008)
Recognizing contextual polarity in phrase-level sentiment analysis
(Wilson, Wiebe and Hoffmann, 2005).
Sentiment analysis and subjectivity (Liu, 2010)
A survey of opinion mining and sentiment analysis (Liu and Zhang, 2012)

Sentiment analysis and opinion mining (Liu, 2012)
Books about Sentiment Analysis
Bing Liu is an eminence in the field and has written a sound book that’s
super useful for those starting research on sentiment analysis. Liu
does a wonderful job explaining sentiment analysis in a way that is
highly technical, yet understandable. Liu covers different aspects
of sentiment analysis including applications, research, sentiment classification
using supervised and unsupervised learning, sentence subjectivity,
aspect-based sentiment analysis, and more.

Courses and Lectures
Another good way to go deeper with sentiment analysis is mastering
your knowledge and skills in natural language processing (NLP), the
computer science field that focuses on understanding ‘human’ language.


By combining machine learning, computational linguistics, and computer
science, NLP allows a machine to understand natural language including
people's sentiments, evaluations, attitudes, and emotions from written
language.

There are a large number of courses, lectures, and resources available
online, but the essential NLP course is the Stanford Coursera course
by Dan Jurafsky and Christopher Manning. By taking this course, you
will get a step-by-step introduction to the field by two of the most
reputable names in the NLP community.

If you want a more hands-on course, you should enroll in the Data Science:
Natural Language Processing (NLP) in Python on Udemy. This course gives
you a good introduction to NLP and what it can do, but it will also
make you build different projects in Python, including a spam detector,
a sentiment analyzer, and an article spinner. Most of the lectures
are really short (~5 minutes) and the course strikes the right balance
between practical and theoretical content.

Sentiment Analysis Datasets
The key part for mastering sentiment analysis is working on different
datasets and experiment different approaches. To do so, you first need
to get your hands on data and procure a dataset over which you will
do your experiments on based on your domain and interests.

The following are some of our favorite sentiment analysis datasets
for experimenting with sentiment analysis and a machine learning approach.
They’re open and free to download:

Product reviews: this dataset consists of a few million Amazon customer
reviews with star ratings, super useful for training a sentiment analysis
model.
Restaurant reviews: this dataset consists of 5,2 million Yelp reviews
with star ratings.
Movie reviews: this dataset consists of 1,000 positive and 1,000 negative
processed reviews. It also provides 5,331 positive and 5,331 negative
processed sentences / snippets.
Fine food reviews: this dataset consists of ~500,000 food reviews from
Amazon. It includes product and user information, ratings, and a plain
text version of every review.
Twitter airline sentiment on Kaggle: this dataset consists of ~15,000
labeled tweets (positive, neutral, and negative) about airlines.
First GOP Debate Twitter Sentiment: this dataset consists of ~14,000
labeled tweets (positive, neutral, and negative) about the first GOP
debate in 2016.
If you are interested in rule-based approach, the following is a varied
list of sentiment analysis lexicons that will come in handy. These
lexicons provide a set of dictionaries of words with labels specifying
their sentiments across different domains. The following lexicons are
really useful to identify the sentiment of texts:

Sentiment Lexicons for 81 Languages: this dataset contains both positive
and negative sentiment lexicons for 81 languages.
SentiWordNet: this dataset contains about 29,000 words with a sentiment
score between 0 and 1.
Opinion Lexicon for Sentiment Analysis: this dataset provides a list
of 4,782 negative words and 2,005 positive words in English.
Wordstat Sentiment Dictionary: this dataset includes ~4800 positive
and ~9000 negative words.
Emoticon Sentiment Lexicon: this dataset contains a list of 477 emoticons
labeled as positive, neutral, or negative.
Sentiment Analysis APIs
There are multiple options on Sentiment Analysis systems that can be
consumed through an API. Broadly speaking, they can be classified into
two different categories:

Open Source libraries
SaaS APIs
Open Source Libraries
Within open source libraries, there are programming languages such
as Python or Java that are particularly well positioned since they
have a strong data science community and, as a result, open source
libraries for data science, including natural language processing.
In all of these cases, you must have a strong knowledge of machine
learning and programming in order to use the libraries successfully.


Sentiment Analysis APIs for Python
Python is one of the top programming languages for data science and
it has a strong community and a large set of options to implement NLP
models.

The following are remarkable examples:

Scikit-learn is the go-to library for Machine Learning and has useful
tools for text vectorization. Training a classifier on top of vectorizations
like frequency or tf-idf text vectorizers is very straightforward.
Scikit-learn has implementations for Support Vector Machines, Naïve
Bayes, and Logistic Regression, among others.

NLTK has been the traditional NLP library for Python. It has an active
community and, besides providing low level functions for NLP, it also
provides the possibility to train machine learning classifiers.

SpaCy is another recent NLP library with a growing community. Like
NLTK, it provides a strong set of low-level functions for NLP and support
for training text classifiers.

With the Deep Learning trend, in the last few years, a new set of data
science libraries have been developed that have support for NLP applications.
Some of the most remarkable:

TensorFlow. Developed by Google, it provides a low-level set of tools
to build and train neural networks. There's also support for text vectorization,
both on traditional word frequency and on more advanced through word
embeddings.

Keras provides useful abstractions to work with multiple neural network
types like recurrent neural networks (RNNs) and convolutional neural
networks (CNNs) and easily stack layers of neurons. Keras can be run
on top of Tensorflow or Theano. It also provides useful tools for text
classification.

PyTorch is a recent Deep Learning framework backed by some prestigious
organizations like Facebook, Twitter, Nvidia, Salesforce, Stanford
University, University of Oxford, and Uber. It has quickly developed
a strong community.

Sentiment Analysis APIs in Java
Java is another programming language with a strong community around
data science with remarkable data science libraries for NLP.

OpenNLP: a toolkit that supports the most common NLP tasks, such as
tokenization, sentence segmentation, part-of-speech tagging, named
entity extraction, chunking, parsing, language detection and coreference
resolution.
Stanford CoreNLP: a Java suite of core NLP tools provided by The Stanford
NLP Group.
Lingpipe: a Java toolkit for processing text using computational linguistics.
LingPipe is often used for text classification and entity extraction.

Weka: a set of tools created by The University of Waikato for data
pre-processing, classification, regression, clustering, association
rules, and visualization.
Sentiment Analysis SaaS APIs
Implementing a sentiment analysis system from scratch is not an easy
task. Usually, companies need to spend a lot of time, money, and resources
in the following:

Having a data science team. Having a development team. Deploying and
scaling the infrastructure to train and run the models. Implementing
and deploying an API to consume the models. Implementing tools to tag
training examples. Adjusting the model hyperparameters.

If you want to avoid these hassles a great shortcut is to use sentiment
analysis SaaS APIs which usually solve most of the problems mentioned
above. Another important advantage of SaaS APIs is the possibility
to easily use them from any system, that is, any programming language.
There are lot of programming languages where software is built, but
few of them have strong libraries for data science.

The following is a list of sentiment analysis SaaS APIs worth taking
a look:

MonkeyLearn
Google Butt NLP
IBM Watson
Amazon Comprehend
Lexalytics
Aylien
MeaningButt
Rosette

Parting words
Sentiment analysis can be applied to countless aspects of business,
from brand monitoring to product analytics, from customer service to
market research. By incorporating it into their existing systems and
analytics, leading brands (not to mention entire cities) are able to
work faster, with more accuracy, toward more useful ends.

Sentiment analysis has moved beyond merely an interesting, high-tech
whim, and will soon become an indispensable tool for all companies
of the modern age. Ultimately, sentiment analysis enables us to glean
new insights, better understand our customers, and empower our own
teams more effectively so that they do better and more productive work.


MonkeyLearn is an online platform that makes it easy to analyze text
with Machine Learning.

If you need help building a sentiment analysis system for your business,
reach out and we’ll help you get started.
