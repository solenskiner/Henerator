// ==UserScript==
// @name          Henerator
// @namespace    http://www.Henerator.se/
// @description   Med Henerator kan du surfa genusneutralt. Henerator byter ut alla "han" och "hon" mot "hen" på alla websidor du besöker.
// @include       *
// ==/UserScript==

function replaceInElement(element, find, replacement) {
    for (var i= element.childNodes.length; i-->0;) {
        var child= element.childNodes[i];
        if (child.nodeType==1) {
            var tag= child.nodeName.toLowerCase();
            if (tag!='style' && tag!='script')
                replaceInElement(child, find, replacement);
        } else if (child.nodeType==3) {
            for (var j= find.length; j-->0;) {
                child.data = child.data.replace(find[j], replacement[j]);
            }
        }
    }
}

var find= []
var replacement= []
find[0] = /\b(han|hon)\b/g;
replacement[0] = 'hen';
find[1] = /\b(Han|Hon)\b/g;
replacement[1] = 'Hen';
find[2] = /\b(honom)\b/g;
replacement[1] = 'hen';
find[3] = /\b(henne)\b/g;
replacement[1] = 'hen';
find[2] = /\b(Honom)\b/g;
replacement[1] = 'Hen';
find[3] = /\b(Henne)\b/g;
replacement[1] = 'Hen';
// hur böjer man hen i genetiv? hennes alltihop?

if (document.readystate == "complete") {
    replaceInElement(document.body, find, replacement);
} else {
    window.addEventListener(
                              "DOMContentLoaded",
                              function(e) { replaceInElement(document.body, find, replacement); },
                              false
                             );
    window.addEventListener(
                              "load",
                              function(e) { replaceInElement(document.body, find, replacement); },
                              false
                             );
}
window.addEventListener(
                          "DOMSubtreeModified",
                          function(e) { replaceInElement(document.body, find, replacement); },
                          false
                         );
window.addEventListener(
                          "change",
                          function(e) { replaceInElement(document.body, find, replacement); },
                          false
                         );

