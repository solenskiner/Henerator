// ==UserScript==
// @name          Henerator
// @namespace    http://www.Henerator.se/
// @description   Med Henerator kan du surfa genusneutralt. Henerator byter ut alla "han" och "hon" mot "hen" på alla websidor du besöker.
// @include       *
// ==/UserScript==

function henate(string, replacement) {
    if (string.charAt(0) == string.charAt(0).toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    } else {
        return replacement;
    }
}

function replaceInElement(element, find, replacement) {
    for (var i= element.childNodes.length; i-->0;) {
        var child= element.childNodes[i];
        if (child.nodeType==1) {
            var tag= child.nodeName.toLowerCase();
            if (tag!='style' && tag!='script')
                replaceInElement(child, find, replacement);
        } else if (child.nodeType==3) {
            for (var j= find.length; j-->0;) {
                child.data = child.data.replace(find[j], function (string) { return henate(string, replacement[j]) });
            }
        }
    }
}

var find= []
var replacement= []

find[0] = /\b(han|hon|hon\/han|honom|henne)\b/gi;
replacement[0] = 'hen';

find[1] = /\b(hennes)\b/gi;
replacement[1] = 'hens';

find[2] = /\b(hans)\b/g;
replacement[2] = 'hens';

var timer= setTimeout("", 0);

function delayedHandleChange(e) {
    clearTimeout(timer);
    timer= setTimeout(handleChange, 50);
}

function handleChange() {
    window.removeEventListener("DOMSubtreeModified", delayedHandleChange, false);
    window.removeEventListener("change", delayedHandleChange, false);
    replaceInElement(document.body, find, replacement);
    window.addEventListener("DOMSubtreeModified", delayedHandleChange, false);
    window.addEventListener("change", delayedHandleChange, false);
}

window.addEventListener("DOMSubtreeModified", delayedHandleChange, false);
window.addEventListener("change", delayedHandleChange, false);
if (document.readystate == "complete") {
    handleChange();
} else {
    window.addEventListener("load", delayedHandleChange, false);
    window.addEventListener("DOMContentLoaded", delayedHandleChange, false);
}

