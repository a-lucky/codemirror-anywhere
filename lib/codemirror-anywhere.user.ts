import { KeyUtil } from "./key-util";
import { boot } from "./boot-codemirror";

const textAreaList = Array.from(document.getElementsByTagName("textarea"));

function textAreaHandler(event: KeyboardEvent) {    
    if (event.shiftKey && KeyUtil.isModKey(event) && event.key === "e") {
        console.log("codemirror-anywhere:boot-codemirror");
        boot(event.target as HTMLTextAreaElement);
    }
}

textAreaList.forEach(function(textArea) {
    textArea.addEventListener("keydown", textAreaHandler);
});
