const keyUtil = require("./key-util");

var textAreaList = Array.from(document.getElementsByTagName("textarea"));

function textAreaHandler(event) {
    if (event.shiftKey && keyUtil.isModKey() && event.key === "e") {
        console.log("codemirror-anywhere:boot-codemirror");
        require("./boot-codemirror")(event.target);
    }
}

textAreaList.forEach(function(textArea) {
    textArea.addEventListener("keydown", textAreaHandler);
});
