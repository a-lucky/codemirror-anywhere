import Prettier from "prettier/standalone";
import ParserBabylon from "prettier/parser-babylon";
import ParserTypeScript from "prettier/parser-typescript";
import ParserMarkdown from "prettier/parser-markdown";
import StructuredSource from "structured-source";
import * as CodeMirror from "codemirror";
require("codemirror/addon/mode/overlay");
require("codemirror/mode/xml/xml");
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/gfm/gfm");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/clike/clike");
require("codemirror/mode/meta");
require("codemirror/addon/edit/continuelist");
import * as HyperMD from "hypermd";

import { KeyUtil } from "./key-util";



let isInsertCSS = false;

function insertOnce() {
    if (isInsertCSS) {
        return;
    }
    require("codemirror/lib/codemirror.css");
    isInsertCSS = true;
}

function prettierCode(code) {
    const parser = 'markdown';
    const plugins = [
        ParserBabylon,
        ParserTypeScript,
        ParserMarkdown,
    ];

    return Prettier.format(code, {
        parser,
        plugins
    });
}

function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart;
    }
    return 0;
}

function onChange(originalTextArea, cm) {
    originalTextArea.value = cm.getValue();
}

function positionOfCaret(textarea) {
    const src = new StructuredSource(textarea.value);
    const caretPosition = getCaret(textarea);
    const indexToPosition = src.indexToPosition(caretPosition);
    indexToPosition.line -= 1;
    return {
        ch: indexToPosition.column,
        line: indexToPosition.line
    };
}

const textareaSet = new Set();

export function boot(textarea) {
    if (textareaSet.has(textarea)) {
        return;
    }
    textareaSet.add(textarea);

    insertOnce();

    function restoreTextArea(cm) {
        console.log("codemirror-anywhere:reset");
        const textarea = cm.getTextArea();
        cm.toTextArea();
        textarea.focus();
        textareaSet.delete(textarea);
    };

    function formatWithPrettier(cm) {
        const text = cm.getValue();
        const formattedCode = prettierCode(text);
        if (formattedCode !== text) {
            cm.setValue(formattedCode);
        }
    };

    const extraKeys = {
        "Shift-Cmd-E": restoreTextArea,
        "Shift-Ctrl-E": KeyUtil.withoutMacOS(restoreTextArea),
        "Enter": "newlineAndIndentContinueMarkdownList",
        "Cmd-Alt-F": formatWithPrettier,
        "Ctrl-Alt-F": KeyUtil.withoutMacOS(formatWithPrettier),
    };

    const position = positionOfCaret(textarea);
    const myCodeMirror = CodeMirror.fromTextArea(textarea, {
        mode: "gfm",
        lineWrapping: true,
        lineNumbers: true
    });
    myCodeMirror.setOption("extraKeys", extraKeys);
    myCodeMirror.on("change", onChange.bind(myCodeMirror, textarea));
    myCodeMirror.setCursor(position);

    HyperMD.switchToHyperMD(myCodeMirror);
    myCodeMirror.setOption("hmdFold", {
        image: true,
        link: true,
        code: true,
        math: true,
        emoji: true,
        html: true
    });
}

