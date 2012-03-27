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


find[0] = /\b(han|hon|hon\/han|honom|henne)\b/g;
replacement[0] = 'hen';

find[1] = /\b(Han|Hon|Honom|Henne)\b/g;
replacement[1] = 'Hen';

find[2] = /\b(hans|hennes)\b/g;
replacement[2] = 'hens';

find[3] = /\b(Hans|Hennes)\b/g;
replacement[3] = 'Hens';

window.addEventListener("DOMSubtreeModified", myHandleEvent, false);
window.addEventListener("change", myHandleEvent, false);

function myHandleEvent(e) {
    window.removeEventListener("DOMSubtreeModified", myHandleEvent, false);
    window.removeEventListener("change", myHandleEvent, false);
    // lägg en timer som callar replaceInElement om ~0.1s, 
    // resetta timern varje gång myHandleEvent callas.
    // Så att replaceInElement inte callas föränss sidan är färdigladdad.
    replaceInElement(document.body, find, replacement);
    window.addEventListener("DOMSubtreeModified", myHandleEvent, false);
    window.addEventListener("change", myHandleEvent, false);
}

if (document.readystate == "complete") {
    replaceInElement(document.body, find, replacement);
} else {
    window.addEventListener("load", myHandleEvent, false);
    window.addEventListener("DOMContentLoaded", myHandleEvent, false);
}

