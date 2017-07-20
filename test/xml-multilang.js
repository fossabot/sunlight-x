import { TestSupport } from "./fixtures/testsupport.js";

let testSupport;
describe("XML cross-language tests", function() {
  before(function() {
    testSupport = new TestSupport("xml-multilang.xml", "xml");
  });
  it("doctype", function() {
    testSupport.AssertContentExists("doctype", "<!doctype html>");
  });

  // embedded stuff
  it("php variable", function() {
    testSupport.AssertContentExists("variable", "$_GET");
  });
  it("php function", function() {
    testSupport.AssertContentExists("function", "print_r");
  });
  it("javascript keyword", function() {
    testSupport.AssertContentExists("keyword", "function");
  });
  it("css rule", function() {
    testSupport.AssertContentExists("rule", "@font-face");
  });
  it("xml tag", function() {
    testSupport.AssertContentExists("tagName", "style");
  });

  it("c# string", function() {
    testSupport.AssertContentExists("string", '"Short tag ftw"');
  });
  it("c# keyword if", function() {
    testSupport.AssertContentExists("keyword", "if");
  });

  it("asp server side comment", function() {
    testSupport.AssertContentExists("comment", "<%-- server side comment --%>");
  });
  it("asp open tag", function() {
    testSupport.AssertContentExists("aspOpenTag", "<%");
  });
  it("asp short open tag", function() {
    testSupport.AssertContentExists("aspOpenTag", "<%=");
  });
  it("asp close tag", function() {
    testSupport.AssertContentExists("aspCloseTag", "%>");
  });
});