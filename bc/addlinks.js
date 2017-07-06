function addLinks() { with (document) {
  var dtArray, dt, anchorArray, anchor, newSpan, newAnchor, dd, dl;
  dtArray = getElementsByTagName("dt");
  for (var i=0;i<dtArray.length;i++) {
    dt = dtArray[i];
    if (dt.className == "filename") {
      // warning! relies on HTML following set pattern.
      anchor = (dt.getElementsByTagName("a"))[0];
      newSpan = createElement("span");
      newSpan.setAttribute("class", "toggleFunctions");
      newSpan.appendChild(createTextNode(" \xB7 ("));
        newAnchor = createElement("a");
        newAnchor.setAttribute("href","#");
        newAnchor.setAttribute("onClick",    "return toggleFunctions('"+anchor.name+"',0);");
        newAnchor.setAttribute("onDblClick", "return toggleFunctions('"+anchor.name+"',1);");
        newAnchor.setAttribute("title", "double-click to show all");
        newAnchor.style.display = "inline";
        newAnchor.appendChild(createTextNode("toggle"));
      newSpan.appendChild(newAnchor);
      newSpan.appendChild(createTextNode(" function info)"));
      dt.appendChild(newSpan);
      dd = dt.nextSibling;
      dl = (dd.getElementsByTagName("dl"))[0];
      dl.style.display = "none";
      dl.originalMaxHeight = dl.style.maxHeight; // add a new property to store copy of style
    }//end if
  }//end for
}}//end function

/* Behaviour:
         Closed +        Click = Partially Open
         Closed + Double-click =     Fully Open
 Partially Open +        Click =         Closed
 Partially Open + Double-click =     Fully Open
     Fully Open +        Click =         Closed
     Fully Open + Double-click =         Closed
*/

var dlRef, toggleTimeout = null;
function singleClick() {
   toggleTimeout = null;
   if(dlRef.style.display == "none") {
     dlRef.style.display = "block";
     dlRef.style.maxHeight = dlRef.originalMaxHeight;
     dlRef.style.overflowY = "scroll";
   } else {
     dlRef.style.display = "none";
   }
}

function toggleFunctions(section,double) { with (document) {
  var dtArray, dt, dd, dl, anchor;
  if(double){
    clearTimeout(toggleTimeout);
    toggleTimeout = null;
  }
  dtArray = getElementsByTagName("dt");
  for (var i=0;i<dtArray.length;i++) {
    dt = dtArray[i];
    if (dt.className == "filename") {
      anchor = (dt.getElementsByTagName("a"))[0];
      if(anchor.name == section) {
        dd = dt.nextSibling;
        dl = (dd.getElementsByTagName("dl"))[0];
        if(double){
          if(dl.style.maxHeight != "none"){
            dl.style.display = "block";
            dl.style.maxHeight = "none";
            dl.style.overflowY = "hidden";
          } else {
            dl.style.maxHeight = dl.originalMaxHeight;
            dl.style.display = "none";
          }
        } else if (!toggleTimeout) {
          dlRef = dl; toggleTimeout = setTimeout(singleClick, 250);
        }
        //dl.style.display = (dl.style.display == "none") ? "block" : "none";
        break;
      }
    }//end if
  }//end for
  return false;
}}//end function

window.onload = addLinks;
