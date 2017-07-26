// sunlight-x: Intelligent Syntax Highlighting, Modernized
// Copyright 2017 Leung Wing-chung. All rights reserved.
// Use of this source code is governed by a Apache License Version 2.0, that can
// be found in the LICENSE file.

// @flow
import assert from "assert";
import fs from "fs";
import path from "path";
import { TestSupport } from "./fixtures/testsupport.js";

const HTMLTemplate = `<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../../compiled-assets/sunlight-defaultfont.css">
  <title>$$TITLE$$</title>
</head>
<body>
$$CONTENT$$
</body>
</html>
`;

/**
 * Returns the syntax highlighting language from the file extension.
 * @param {string} filename
 * @returns {string}
 */
function getHighlightLanguage(filename: string): string {
  if (filename === "README.md") return "";
  const extension = path.parse(filename).ext;
  const map: { [string]: string } = {
    ".6502asm": "6502asm",
    ".bat": "batch",
    ".bf": "brainfuck",
    ".cs": "csharp",
    ".css": "css",
    ".js": "javascript",
    ".php": "php",
    ".txt": "plaintext",
    ".vb": "vb",
    ".xml": "xml"
  };
  const language = map[extension] || "";
  assert.notStrictEqual(
    "",
    language,
    "Cannot find the language of extension " + extension
  );
  return language;
}

/**
 * Compare the expected result in the file with the actual result. If the
 * expected result does not exist, then write the expected result.
 * @param {string} filename
 * @param {string} actualContent
 */
function compareResult(filename: string, actualContent: string) {
  const resultsDir = path.join(__dirname, "output");
  const fileData = path.parse(filename);
  const expectedFilename = path.join(
    resultsDir,
    fileData.name + "-expected" + fileData.ext
  );
  if (fs.existsSync(expectedFilename)) {
    const expectedContent = fs.readFileSync(expectedFilename, "utf8");
    if (expectedContent === actualContent) return;

    const actualFilename = path.join(
      resultsDir,
      fileData.name + "-actual" + fileData.ext
    );
    if (expectedContent !== actualContent) {
      fs.writeFileSync(actualFilename, actualContent, "utf8");
      throw new Error(
        `Content doesn't match. \`${actualFilename}\` written for comparison.`
      );
    }
  } else {
    fs.writeFileSync(expectedFilename, actualContent, "utf8");
    throw new Error(
      `Test expectation file \`${expectedFilename}\` does not exist. New expectation written. Please commit the file.`
    );
  }
}

describe("HTML files generation test", function() {
  const snippetsDir = path.join(__dirname, "code-snippets");
  const snippetList: string[] = fs.readdirSync(snippetsDir);
  const options = { lineNumbers: true };

  this.timeout(10000);

  it("Code generated by TestSupport", function() {
    const allResults: { filename: string, highlightedCode: string }[] = [];
    for (const snippetFilename of snippetList) {
      const language = getHighlightLanguage(snippetFilename);
      if (language === "") continue;

      const testSupport = new TestSupport(snippetFilename, language, options);
      allResults.push({
        filename: snippetFilename,
        highlightedCode: testSupport.codeElement.innerHTML
      });
    }

    const testname = "TestSupport Tests";
    let content = `<h1>${testname}</h1>\n`;
    for (const result of allResults) {
      content += `<h2>${result.filename}</h2>\n`;
      content += `${result.highlightedCode}\n`;
    }

    // Replacement are put into functions to avoid unescapes of "$" character.
    const generatedHTML = HTMLTemplate.replace(
      "$$TITLE$$",
      (): string => testname
    ).replace("$$CONTENT$$", (): string => content);

    compareResult("testsupport.html", generatedHTML);
  });
});
