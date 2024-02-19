#!/bin/node

function numRules() {
  return phrases1.length + phrases2.length + words1.length + words2.length + intraword1.length + intraword2.length + prefixes1.length + prefixes2.length + suffixes1.length + suffixes2.length + regex1.length + regex2.length + rev_regex1.length + rev_regex2.length + ordering1.length + ordering2.length;
}

var doneToken = "����}�";//Token put thorughout parts which are already translated (to avoid double translations)
var sentenceCount = 0;
var useWebWorker = false;
function translate(text, direction) {

  if(direction === "backward" && reverseIsDisabled) return english;

  // only use web worker if explicitly told to in custom code OR (functions aren't defined AND number of translator rules is huge)
  // couldn't use backward() definitition as indicator becaus eof default function defined by php when reverse is disabled.
  // what a ghastly mess
  if(useWebWorker || ((typeof forward !== "function") && numRules() > 1000)) {
    // TODO: disable web worker if they're using custom code to translate (i.e. forward() or backward() is defined)
    translateWithWebWorker(text, direction);
    return;
  }
	/*
		TEMPORARY FIX TO GET RANDOM TRANSLATES WORKING
		SPLIT TEXT INTO SENTENCES AND TRANSLATE EACH
		INDIVIDUALLY WHILE KEEPING TRACK OF A DUPLICATE
		COUNTER (which counts the number of sentences
		translated so far)
		words2[i][dupCount%words2[i].length]
	*/
	if(text == "") return "";

  var translatedText = "";

  //skip-to-function-only-if-all-arrays-are-empty
  if(!([].concat(phrases1, phrases2, words1, words2, intraword1, intraword2,  prefixes1,  prefixes2,  suffixes1,  suffixes2,  regex1,  regex2,  rev_regex1, rev_regex2,  ordering1,  ordering2).join("").length === 0)) {

    sentenceCount = 0;
    sentenceArray = text.split(/(\.)/g);
    sentenceArray = sentenceArray.filter(function(s) { return  s !== ""; })
    for(var i = 0; i < sentenceArray.length; i++) {
      text = sentenceArray[i];

	if(text === "."){ translatedText += "."; continue; }

      var startsWithSpace = false;
      if(text[0] === " ") { startsWithSpace = true; }

      var firstLetterIsCapital = false;
      if(text.trim()[0] === text.trim()[0].toUpperCase() ) { firstLetterIsCapital = true; }

      if(direction == "backward") {
        text = intrawordSwap(intraword2,intraword1,text);

        text = " "+text+" ";
        text = text.toLowerCase();
        //replace newline with special character:
        text = text.split("\n").join(" 985865568NEWLINETOKEN98758659 ");

        text = phraseSwap(phrases2,phrases1,text);
        text = wordSwap(words2,words1,text);
        text = prefixSwap(prefixes2,prefixes1,text);
        text = suffixSwap(suffixes2,suffixes1,text);
        text = removeDoneTokens(text);
        text = text.split( doneToken ).join(""); //who knows why this is needed as well as above....
        text = text.trim();
        text = regexReplace(rev_regex1,rev_regex2,text);
        text = wordOrdering(ordering2,ordering1,text);
      } else { //Else do normal translate
        text = intrawordSwap(intraword1,intraword2,text);

        text = " "+text+" ";
        text = text.toLowerCase();
        //replace newline with special character:
        text = text.split("\n").join(" 985865568NEWLINETOKEN98758659 ");

        text = phraseSwap(phrases1,phrases2,text);
        text = wordSwap(words1,words2,text);
        text = prefixSwap(prefixes1,prefixes2,text);
        text = suffixSwap(suffixes1,suffixes2,text);
        //Must remove tokens before regex
        text = removeDoneTokens(text);
        text = text.split( doneToken ).join(""); //who knows why this is needed as well as above....
        text = text.trim();
        text = regexReplace(regex1,regex2,text);
        text = wordOrdering(ordering1,ordering2,text);
      }

          // revert newline tokens back to new lines
      text = text.split(" 985865568NEWLINETOKEN98758659 ").join("\n");
      text = text.split(" 985865568NEWLINETOKEN98758659").join("\n");
      text = text.split("985865568NEWLINETOKEN98758659").join("\n");

      //undo double space between repeated words:
      text = text.replace(/(\b\S+\b)[ ]+\b\1\b/gi,"$1 $1");

      //if(i == 0) translatedText += text;
      /*else */

      if(firstLetterIsCapital) {
        text = text[0].toUpperCase()+text.substr(1);
      }

      if(startsWithSpace) {
        text = " "+text;
      }

      translatedText += text;
      sentenceCount++;
    }
    translatedText = translatedText.split('{{*DUPLICATE MARKER*}}').join(''); //temp since marker appears at start of

    //translatedText = translatedText.replace(/[ ]+/g," ");
    //translatedText = translatedText.trim();

    if(typeof doApplySentenceCase !== 'undefined') {
      if(doApplySentenceCase !== false) {
        translatedText = applySentenceCase(translatedText);
        translatedText = capitalizeFirstLetter(translatedText);
      }
    }
  } else {
    translatedText = text;
  }

	if (direction == "backward" && typeof backward === "function") {

		translatedText = backward(translatedText);

	} else if (typeof forward === "function") {

		translatedText = forward(translatedText);

	}

	return translatedText;
}


var worker;
var workerStarted = false;
var waitingForTypingToFinish = false;
var translationInQueue = false;
var queuedTranslationDirection = false;
var translationInProgress = false;
var workerInitStarted = false;
var ghettoPlaceholderText = "​";
var englishPlaceholderText = "​";
function translateWithWebWorker(text, direction) {

  if(direction === "backward") {
    $("#english-text").css('background-image',"url(/img/loading_nice.gif)");
    $("#english-text").attr("placeholder", "");
  }
  else {
    $("#ghetto-text").css('background-image',"url(/img/loading_nice.gif)");
    $("#ghetto-text").attr("placeholder","");
  }

  if(workerStarted) {
    if(translationInProgress) { translationInQueue = true; queuedTranslationDirection = direction; return; }
    // wait a second in case they're typing:
    if(waitingForTypingToFinish) clearTimeout(waitingForTypingToFinish);
    waitingForTypingToFinish = setTimeout(function() {
    translationInProgress = true;
    waitingForType = false;
    worker.postMessage({text:text, direction:direction}); // send text to our worker to be translated
    },350)
  } else {
    translationInQueue = true;
    queuedTranslationDirection = direction;
    startWorker();
  }
}

function startWorker() {
  if(workerInitStarted) { return false; }
  workerInitStarted = true;
  worker = new Worker("/js/translate_worker.js"); //create worker
  worker.postMessage({startEvent:true,phrases1:phrases1,phrases2:phrases2,words1:words1,words2:words2,intraword1:intraword1,intraword2:intraword2,prefixes1:prefixes1,prefixes2:prefixes2,suffixes1:suffixes1,suffixes2:suffixes2,regex1:regex1,regex2:regex2,rev_regex1:rev_regex1,rev_regex2:rev_regex2,ordering1:ordering1,ordering2:ordering2}); // start worker
  worker.addEventListener('message', function(e) { //listen to worker
    if(!workerStarted) workerStarted = true;

    if(!e.data.startEvent) {
      if(e.data.direction === "backward") $("#english-text").val(e.data.text);
      else $("#ghetto-text").val(e.data.text);
    }

    translationInProgress = false;

    if(e.data.direction === "backward") {
      $("#english-text").css('background-image',"none");
      $("#english-text").attr("placeholder",englishPlaceholderText);
    }
    else {
      $("#ghetto-text").css('background-image',"none");
      $("#ghetto-text").attr("placeholder",ghettoPlaceholderText);
    }

    if(translationInQueue) {
      translateWithWebWorker( $("#english-text").val(), queuedTranslationDirection);
      queuedTranslationDirection = false;
      translationInQueue = false;
    }
  }, false);
}

function applySentenceCase(str) {
    return str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        if(txt.charAt(0).match(/[a-z]/g) !== null) return txt.charAt(0).toUpperCase() + txt.substr(1)/*.toLowerCase()*/;
		else return txt;
    });
}
function capitalizeFirstLetter(string) {
    if(string.charAt(0).match(/[a-z]/g) !== null) return string.charAt(0).toUpperCase() + string.slice(1);
	else return string;
}

function phraseSwap(phrases1,phrases2,text) {
	var wordSeps = new Array(" ", ",", ".", "'",  "!", ":", "?","\"", ";", "/", "<", ">", ")", "(", "%", "$");

	//tokenate all phrases2 so they don't get retranslated later:
	var phrases2 = makeArrayClone(phrases2); //create fresh copy so it doesn't save tokens (and retokenise again later!)
	for(var i=0;i<phrases2.length;i++) {
		phrases2[i] = tokenate(phrases2[i]);
	}

	for(var i=0;i<phrases1.length;i++) {
		for(var j = 0; j < wordSeps.length; j++) {
			if(phrases2[i] !== "") text = text.split( " "+phrases1[i].toLowerCase()+wordSeps[j]).join( " "+phrases2[i]+wordSeps[j] );
			else text = text.split( " "+phrases1[i].toLowerCase()+wordSeps[j]).join( " " );
		}
	}

	return text;
}


function wordSwap(words1,words2,text) {
	var wordSeps = new Array(" ", ",", ".", "'",  "!", ":", "?","\"", ";", "/", "<", ">", ")", "(", "%", "$");

    //if there are duplicate adjacent words, add an extra space between them (otherwise they wont both translate)
	text = text.replace(/(\b\S+\b)\s+\b\1\b/i,"$1  $1");

	//tokenate all words2 so they don't get retranslated later:
	var words2 = makeArrayClone(words2); //create fresh copy so it doesn't save tokens (and retokenise again later!)
	for(var i=0;i<words2.length;i++) {
		words2[i] = tokenate(words2[i]);
	}

	var words1_notags = [];
	for(var i=0;i<words1.length;i++) {
		//words1 can contain arrays for multiple words having the same translation
		if(words1[i] /*words1_notags[i]*/ instanceof Array) {
			words1_notags[i] = [];
			for(var j=0;j<words1[i].length;j++) {
				words1_notags[i][j] = words1[i][j].replace(/\{\{.*\}\}/g,"");
			}
		} else {
			words1_notags[i] = words1[i].replace(/\{\{.*\}\}/g,"");
		}
	}

	//Loop thought all words to be found and swapped (for the corresponding words2 word).
	for(var i=0;i<words1_notags.length;i++) {
		if(words2[i] instanceof Array) {
			var l = words2[i].length;
			//var swapWithThis = words2[i][sentenceCount%(l-1)];
			var swapWithThis = words2[i][Math.floor(Math.random() * words2[i].length)];
		} else {
			//no duplicates, just a single word
			var swapWithThis = words2[i];
		}
		for(var j = 0; j < wordSeps.length; j++) {
			if(words1_notags[i] instanceof Array) {
				//Remember, we bunched words in 'words1' into groups, so it could be an array of words, and
				//if it is, we need to replace ALL words in that array with the corresponding words2 words.
				for(var k = 0; k < words1_notags[i].length; k++) {
					//if swapWithThis is an empty string, don't place it in with a space on either side
					if(swapWithThis.length > 0) text = text.split( " "+words1_notags[i][k].toLowerCase()+wordSeps[j]).join( " "+swapWithThis+wordSeps[j] );
					else text = text.split( " "+words1_notags[i][k].toLowerCase()+wordSeps[j]).join( " " );
				}
			} else {
				//another hack: if it's a word surrounded by quotes, just remove space from start
				if(words1_notags[i][0]+words1_notags[i].slice(-1) == "''" || words1_notags[i][0]+words1_notags[i].slice(-1) == "\"\"") {
					text = text.split( words1_notags[i].toLowerCase()+wordSeps[j]).join( swapWithThis+wordSeps[j] );
				}
				else if(swapWithThis.length > 0) text = text.split( " "+words1_notags[i].toLowerCase()+wordSeps[j]).join( " "+swapWithThis+wordSeps[j] );
				else text = text.split( " "+words1[i].toLowerCase()+wordSeps[j]).join( " " );
			}
		}
	}

	return text;
}

/*function wordSwap(words1,words2,text) {
	var wordSeps = new Array(" ", ",", ".", "'",  "!", ":", "?","\"", ";", "/", "<", ">", ")", "(", "%", "$");
    textArray = text.split(" ");
	//Looop through the word list
	for(var i=0;i<words1.length;i++) {
		//(and with each word sep appended)
        for(var j = 0; j < wordSeps.length; j++) {
			//and look for
		     for(var j = 0; j < wordSeps.length; j++) {
			     text = text.split( " "+words1[i].toLowerCase()+wordSeps[j]).join( " "+words2[i]+wordSeps[j] );
		     }
        }
	}

	return text;
}*/


function intrawordSwap(intraword1,intraword2,text) {

	//scan along string and build final translated string to prevent retranslation
	var start = 0;
	var str = "";
	var finalText = "";
	for(var end = 0; end < text.length+1; end++) {
		str = text.substring(start, end);

		for(var i=0; i<intraword1.length; i++) {

			if( str.indexOf(intraword1[i]) !== -1 ) {
				finalText += str.replace(intraword1[i], intraword2[i]);
				start = end;
				break;
			}

		}
	}
	finalText += text.substring(start, end);

	text = finalText;
	//for(var i=0;i<intraword1.length;i++) {

	//text = text.split( intraword1[i] ).join( doneToken+intraword2[i]+doneToken );

		// if(typeof intraword1[i] === 'undefined') intraword1[i] = " ";
		// if(typeof intraword2[i] === 'undefined') intraword2[i] = " ";

		//// Must escape the item ready for regex:
		// var intraword1Escaped = escapeRegex(intraword1[i]);
		// var intraword2Escaped = escapeRegex(intraword2[i]);

		//// replace anything that isn't surrounded by 'done tokens'
		// var regex1 = new RegExp("("+doneToken+intraword1Escaped+")(?="+doneToken+")|"+intraword1Escaped+"(?=.*("+intraword2Escaped+"))","g");
		// var regex2 = new RegExp(intraword2Escaped+"$","g");

		// text = text.replace(/$/, intraword2[i])
			// .replace(regex1, "$1$2")
			// .replace(regex2, "");

		// var regex3 = new RegExp(escapeRegex(intraword2[i]),"g");
		// text = text.replace(regex3,tokenate(intraword2[i]));

	//}
	return text;
}

function escapeRegex(regex) {
  return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}

function prefixSwap(prefixes1,prefixes2,text) {
	//tokenate all words2 so they don't get retranslated later:
	var prefixes2 = makeArrayClone(prefixes2); //create fresh copy so it doesn't save tokens (and retokenise again later!)
	for(var i=0;i<prefixes2.length;i++) {
		prefixes2[i] = tokenate(prefixes2[i]);
	}

	// for(var i=0;i<prefixes1.length;i++) {
		// text = text.split( " " + prefixes1[i] ).join( " " + prefixes2[i] );
	// }

	for(var i=0;i<prefixes1.length;i++) {
		text = text.replace( new RegExp("\\s"+escapeRegex(prefixes1[i])+"([^\\s])",'g'), " " + prefixes2[i] + "$1" );
	}

	return text;
}

function suffixSwap(suffixes1,suffixes2,text) {
	//tokenate all suffixes2 so they don't get retranslated later:
	var suffixes2 = makeArrayClone(suffixes2); //create fresh copy so it doesn't save tokens (and retokenise again later!)
	for(var i=0;i<suffixes2.length;i++) {
		suffixes2[i] = tokenate(suffixes2[i]);
	}

	// for(var i=0;i<suffixes1.length;i++) {
		// text = text.split( suffixes1[i] + " " ).join( suffixes2[i] + " " );
	// }

	for(var i=0;i<suffixes1.length;i++) {
		text = text.replace( new RegExp("([^\\s])"+escapeRegex(suffixes1[i])+"\\s",'g'), "$1" + suffixes2[i] + " " );
	}

	return text;
}

function regexReplace(regex1,regex2,text) {
	/* ONLY DOES ONE DIRECTION*/
	for(var i=0;i<regex1.length;i++) {
		/* only replace the ones that are mean to be for this direction */
		if(typeof regex2[0] == 'string' || regex2[0] instanceof String) {
			var match = regex1[i].match(new RegExp('^/(.*?)/([gimy]*)$'));
			// sanity check here
			if(match) {
				var properRegEx = new RegExp(match[1], match[2]);
				text = text.replace(properRegEx,regex2[i]);
			}
		}
	}

	return text;
}



function wordOrdering(ordering1,ordering2,text) {
	for(var i=0;i<ordering1.length;i++) {
		var regex = new RegExp('([^\\s]+){{' + ordering1[i].trim().replace(/[\s]+/g," ").split(" ").join('}}[\\s]+([^\\s]+){{') + '}}','g');
		var orderString = getRelativeOrder(ordering1[i].replace(/[\s]+/g," ").split(" "), ordering2[i].replace(/[\s]+/g," ").split(" "));
		text = text.replace( regex, "$"+orderString.split(',').join(" $") );
	}
	//remove stray word tags
	var alreadyRemovedTags = [];
	for(var i=0;i<ordering1.length;i++) {
		var tags = ordering1[i].trim().replace(/[\s]+/g," ").split(" "); //tags in one ordering rule
		for(var j=0;j<tags.length;j++) {
			if(alreadyRemovedTags.indexOf(tags[j]) === -1) {
				text = text.replace("{{"+tags[j]+"}}","");
				alreadyRemovedTags.push(tags[j]);
			}
		}
	}
	return text;
}

//returns a string like "1,3,2" or "2,5,3,1,4" which denotes the order
//of the 'jumbled' elements wrt their truth position
//i.e. labels the jumbled elements by their position in truth
//NOTE: starts at 1, not zero
function getRelativeOrder(truth, jumbled) {
	var order = [];
	for(var i = 0; i < jumbled.length; i++) {
		if(truth.indexOf(jumbled[i]) !== -1) {
			order.push( truth.indexOf(jumbled[i])+1 );
		} else {
			//do nothing (an element in jumbled didn't exist in truth)
		}
	}
	return order.join(",");
}


function removeDoneTokens(text) {
	text = text.split( doneToken ).join("");
	return text;
}

function tokenate(s) {
	//if it's an array tokenate individual elements and return array
	if( Object.prototype.toString.call( s ) === '[object Array]' ) {
		for(var i = 0; i < s.length; i++) {
			s[i] = doneToken + s[i].toString().split("").join(doneToken) + doneToken;
		}
		return s;
	} else { //else it's string, so tokenate and return
		return doneToken + s.toString().split("").join(doneToken) + doneToken;
	}
}


function handleDuplicates(words1, words2) {
	//Finds all duplicate entries on the 'english' list and
	//and put all their eqivalent 'ghetto' entries into an array.
	//Then delete the previous entries and add the english word to the
	//words1 array and add the array of ghetto words to the ghetto word list.
	var words1InitialLength = words1.length;

	for(var i = 0; i < words1InitialLength; i++) {
		var findDupsOf = words1[i];
		var dupArray = new Array(); //array containing duplicates: "Gawd", "Holy Ghetto Father", etc.
		//Loop through the word list for word and compare
		//to find duplicates
		var foundDups = false;
		//Skip it if the current 'findDupsOf' has already been added to a dup array things sortof
		if(!(findDupsOf.substring(0, "{{*DUPLICATE MARKER*}}".length) == "{{*DUPLICATE MARKER*}}")) {
			for(var j = 0; j < words1InitialLength; j++) {
				if((findDupsOf == words1[j]) && (i != j)) {
					//console.log("duplicate found: "+findDupsOf+" AND "+words1[j]);
					//console.log("at: ["+i+"] AND ["+j+"]");
					dupArray.push(words2[j]);//Found dup, add WORD2 to dups array
					//console.log("dup array:"+dupArray)
					words1[i] = "{{*DUPLICATE MARKER*}}"+words1[i]; //MULTIPLE of these markers may be added if there are multiple duplicates of this word - that's fine.
					words1[j] = "{{*DUPLICATE MARKER*}}"+words1[j];
					foundDups = true;
				}
			}
		}
		//We now have all the duplicates of findDupsOf in dupArray
		//So we'll add them to the end of the words1 and words2 array respectively
		if(foundDups) {
			dupArray.push(words2[i]); //Since the 'ghetto' verson of the current word is one of the dupes

			words1.push(findDupsOf);
			words2.push(dupArray);
			//console.log("added:"+findDupsOf)
			//console.log("and:"+dupArray[0]+", "+dupArray[1]+", ...")
		}
	}

	//Now we delete all the word1's with duplicate markers AND their corresponding
	//words in words2
	for(var i = 0; i < words1.length; i++) {
		//console.log(i)
		//console.log(words1[i].substring(0, "{{*DUPLICATE MARKER*}}".length))
		//console.log("{{*DUPLICATE MARKER*}}");
		//console.log(words1[i].substring(0, "{{*DUPLICATE MARKER*}}".length) === "{{*DUPLICATE MARKER*}}");
		if(words1[i].substring(0, "{{*DUPLICATE MARKER*}}".length) === "{{*DUPLICATE MARKER*}}") {
			if(i == 0) {
				words1.shift();
				words2.shift();
				i--;
			} else {
				words1.splice(i,1);
				words2.splice(i,1);
			}
			//(will never be any duplicate markers at end of words1 array because duplicates would be added on at end)
		}
	}

	var result = new Array(words1, words2);
	return result;
}

//* helper *//
function makeArrayClone(existingArray) {
   var newObj = (existingArray instanceof Array) ? [] : {};
   for (i in existingArray) {
      if (i == 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
         newObj[i] = makeArrayClone(existingArray[i]);
      } else {
         newObj[i] = existingArray[i]
      }
   }
   return newObj;
}
var line = "";
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {

	var jsonData = {"phrases1":"What the hell\nwhat the hell\nStop!\nHoly shit\nholy shit\nOh my god\nOh my God\noh my god\noh my Go","phrases2":"What the herr\nwhat the herr\nYAAAAMETEEEE!\nHORRY SHEEET\nHORRY SHEEET\nOH MAI GOOOD\nOH MAI GOOOD\nOH MAI GOOOD\nOH MAI GOOOD","words1":"ever\ncrystal\naway\nbitch\ncrazy\ndriving\neach\nfuck\nfucker\nfucking\nguest\nmind\nmust\nmy\nno\nshit\nso\nthank\nthrough\ntime\nto\nunited\nwhat\nwho\nwrite","words2":"ever\nkurr\u012bstar\nawey\nbeetchu\nkurraisy\ndurraiving\neech\nfahk\nfakker\nfakking\ngest\nmaind\nmast\nmai\nno\nsheet\nso\nthenk\nthr\u016b\ntaim\nt\u016b\nunaited\nnani\nwho\nwraite","intraword1":"tu\nwy\nbl\ncky\nls\nhigh\nsun\nful\ngr\ndr\nl","intraword2":"tsu\nwai\nburr\nkky\nrs\nhaigh\nsan\nfurr\ngur\ndur\nr","prefixes1":"spl\nwy\nuni\nun\nl\ndr\ntr","prefixes2":"suppur\nwai\nuni\nunnu\nr\ndurr\nturr","suffixes1":"ool\nr\nrt\nls\nll\nt's\nts\nck\nrit\nk\noo\nl\no","suffixes2":"ooru\nru\nrto\nrs\nrr\ntsu\ntsu\nkku\nrittu\nku\n\u016b\nr\n\u00f3","regex1":"","regex2":"","rev_regex1":"","rev_regex2":"","ordering1":"","ordering2":""};
			phrases1 = jsonData.phrases1.split("\n");
			phrases2 = jsonData.phrases2.split("\n");
			words1 = jsonData.words1.split("\n");
			words2 = jsonData.words2.split("\n");
			intraword1 = jsonData.intraword1.split("\n");
			intraword2 = jsonData.intraword2.split("\n");
			prefixes1 = jsonData.prefixes1.split("\n");
			prefixes2 = jsonData.prefixes2.split("\n");
			suffixes1 = jsonData.suffixes1.split("\n");
			suffixes2 = jsonData.suffixes2.split("\n");
			regex1 = jsonData.regex1.split("\n");
			regex2 = jsonData.regex2.split("\n");
			rev_regex1 = jsonData.rev_regex1.split("\n");
			rev_regex2 = jsonData.rev_regex2.split("\n");
            ordering1 = jsonData.ordering1.split("\n");
            ordering2 = jsonData.ordering2.split("\n");

			evenUpSizes(phrases1,phrases2);
			evenUpSizes(words1,words2);
			evenUpSizes(intraword1,intraword2);
			evenUpSizes(prefixes1,prefixes2);
			evenUpSizes(suffixes1,suffixes2);

			//fix for mysql trailing newline deletion problem
			function evenUpSizes(a,b) {
				if(a.length > b.length) {
					while(a.length > b.length) b.push("");
				} else if(b.length > a.length) {
					while(b.length > a.length) a.push("");
				}
			}

			handleDuplicates(words1, words2);
			console.log(translate(line));
});

