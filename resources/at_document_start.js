/* ╔════════════════════════════════════════════════════════════════════╗
   ║ at_document_start                                                  ║
   ╟────────────────────────────────────────────────────────────────────╢
   ║ File's content is injected after any files from CSS,               ║
   ║ - but before any other DOM is constructed,                         ║
   ║ - or any other script is run.                                      ║
   ╚════════════════════════════════════════════════════════════════════╝
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ */

NodeList.prototype.forEach = Array.prototype.forEach;

counter_total = 0;

query = (function(array,glue){
          return array.join(glue + ",") + glue;
        }(
          [
            '[spellcheck]'
          , '[autocomplete]'
          , '[contentEditable]:not([contentEditable="false"])'
          , 'input:not([readonly]):not([type="hidden"]):not([type="radio"]):not([type="button"]):not([type="file"]):not([type="checkbox"]):not([type="image"]):not([type="reset"]):not([type="submit"])'
          , 'textarea:not([readonly])'
          , 'form'
          ]
          ,
          ''
         +':not([disabled]):not([hidden])'
         +':not([spellcheck="true"]):not([autocomplete="on"])'
         +':not([style*="display:none"]):not([style*="visibility:hidden"]):not([style*="display: none"]):not([style*="visibility: hidden"])'
         +':not([done-spellcheckautocompleteenabler])'
        ));

function action(){
  var elements = document.querySelectorAll(query);
  if(null === elements || 0 === elements.length) return;
  counter_total+=elements.length;
  try{chrome.runtime.sendMessage({badge_data: counter_total});}catch(err){} /* update extension's badge. */

  elements.forEach(function(element){
    element.setAttribute("done-spellcheckautocompleteenabler", "");
    element.setAttribute("spellcheck","true"); 
    element.setAttribute("autocomplete","on"); 
  });
}

try{  action();                               }catch(err){}
try{  interval_id = setInterval(action, 250); }catch(err){ clearInterval(interval_id); }  //Only available in pages having JavaScript support.
