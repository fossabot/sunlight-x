import assert from "power-assert";
const fs = require("fs");
const path = require("path");

import { jsdom } from "jsdom";
import { Highlighter } from "../../src/sunlight.js";

const defaultOptions = {
  classPrefix: "sunlight-",
  showMenu: true,
  enableDocLinks: true,
  maxHeight: undefined
};

export const nbsp = "\u00a0";

export class TestSupport {
  /**
   * @param {string} filename Name of the file that contains the code to be highlighted.
   * @param {string} language
   * @param {Object|undefined} options
   */
  constructor(filename, language, options) {
    this.options =
      options === undefined
        ? Object.assign({}, defaultOptions)
        : Object.assign({}, defaultOptions, options);

    const code = fs.readFileSync(
      path.join(__dirname, "..", "code-snippets", filename),
      "utf8"
    );

    const document = jsdom("", {});
    const preElement = document.createElement("div");
    // Note: setting innerText does not work in jsdom 9.4.2
    preElement.appendChild(document.createTextNode(code));
    preElement.setAttribute(
      "class",
      this.options.classPrefix + "highlight-" + language
    );

    this.codeElement = document.createElement("div");
    this.codeElement.appendChild(preElement);

    const highlighter = new Highlighter(this.options);
    highlighter.highlightNode(preElement);
  }

  /**
   * Return if an element with class |className| exists.
   * @param {string} className
   * @returns {boolean}
   */
  DoesElementsWithClassNameExist(className) {
    return (
      this.codeElement.querySelector(
        "." + this.options.classPrefix + className
      ) !== null
    );
  }

  /**
   * Return elements matching the specified CSS selectors.
   * @param {string} selectors
   * @returns {NodeList}
   */
  querySelectorAll(selectors) {
    return this.codeElement.querySelectorAll(selectors);
  }

  /**
   * Return elements matching the specified CSS class name.
   * @param {string} className
   * @returns {NodeList}
   */
  GetElementsWithClassName(className) {
    return this.codeElement.querySelectorAll(
      "." + this.options.classPrefix + className
    );
  }

  /**
   * Assert that the text |content| inside a tag with class |className| exists.
   * @param {string} className
   * @param {string} content
   */
  AssertContentExists(className, content) {
    const elements = this.codeElement.querySelectorAll(
      "." + this.options.classPrefix + className
    );

    const nodeValues = [];
    for (let i = 0; i < elements.length; i++)
      if (elements[i].firstChild)
        nodeValues.push(elements[i].firstChild.nodeValue);

    content = content.replace(/ /g, nbsp).replace(/\t/g, nbsp.repeat(4));

    assert(nodeValues.indexOf(content) >= 0);
  }
}