"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "こんにちは！ 今日は元気です。"
    ],
    invalid: [
        // single match
        {
            text: "こんにちは！明日も元気です。",
            errors: [
                {
                    message: "感嘆符(！)・疑問符(？)の直後にスペースか閉じ括弧が必要です",
                    line: 1,
                    column: 6
                }
            ]
        },
        // multiple match
        {
            text: `こんにちは！今日はいい天気です。

こんにちは？明日もいい天気です。`,
            errors: [
                {
                    message: "感嘆符(！)・疑問符(？)の直後にスペースか閉じ括弧が必要です",
                    line: 1,
                    column: 6
                },
                {
                    message: "感嘆符(！)・疑問符(？)の直後にスペースか閉じ括弧が必要です",
                    line: 3,
                    column: 6
                }
            ]
        },

    ]
});