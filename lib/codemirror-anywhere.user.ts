import { KeyUtil } from "./key-util";
import { boot } from "./boot-codemirror";

const textAreaList = Array.from(document.getElementsByTagName("textarea"));

function textAreaHandler(event) {
    if (event.shiftKey && KeyUtil.isModKey(event) && event.key === "e") {
        console.log("codemirror-anywhere:boot-codemirror");
        boot(event.target);
    }
}

textAreaList.forEach(function(textArea) {
    textArea.addEventListener("keydown", textAreaHandler);
});
