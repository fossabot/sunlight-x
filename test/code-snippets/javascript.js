(function($, window), undefined){
	
	if ($ === undefined) {
		throw 'missing jQuery\'s dependency';
	}
	
	function $$(id) {
		var element = document.getElementById(id);
		for (var property in element) {
			document.write(property + ": " + element[property].toString());
		}
	}
	
	function foo(bar) {
		window.alert("oh noes!!");
		
		var abstract = encodeURIComponent(parseFloat("abstract is a reserved word"));
		
		var elements = document.getElementsByTagName("foo");
		for (var i = 0; i &lt; elements.length; i++) {
			if (element[i].name !== 'foo\'s') {
				return false;
			} else {
				return true;
			}
		}
		
		var req;
		try {
			req = new XMLHttpRequest();
		} catch (e) {
			try {
				req = new XDomainRequest();
			} catch (e) { 
				try {
					req = new ActiveXObject("MSXML2.HTTP");
				} catch (e) { 
					if (e instanceof Object) {
						throw e;
					}
				}
			}
		} finally {
			if (req !== null) {
				req.open("http://google.com/");
				req.send();
			}
		}
		
		if (req === null) {
			throw new Error("FAIL");
		}
		
		return bar == 0.5;
	}
	
	var stringify = function(string) {
		return JSON !== undefined ? JSON.stringify.call(null, string) : new String(string);
	};
	
	switch (foo("he\\\"ad").length) {
		case 1:
			//fall through
		case 0x2:
			break;
		case 1e3:
		default:
			/* 
			 * default implementation
			 * of something
			 */
			if (isNaN(10) || this === NaN) {
				doSomething(Infinity, new Boolean(true));
			}
			
			doSomething(/\w[^A-Z0-9]$/g, 5 / 3);
			break;
	}
	
	//regex literal parsing
	
	/foo/.test("foo"); //should be a regex
	/\//.test("/"); //should be a regex
	/\\/.test("foo"); //should be a regex
	var foo = /foo/.test("foo"); //should be a regex
	var foo = /f\/oo/.test("foo"); //should be a regex
	if (/foo/.test("foo")) { } //should be a regex
	var x = 4 / 5; /foo/.test("foo") { } //should be a regex
	4 = /foo/ //should be a regex
	if (!/foo/.test("foo")) {} //should be a regex
	if (!/foo/.test("foo") || /foo/.test("foo") && /foo/.test("foo")) {} //all should be a regex
	4 + /regexafteroperator/ //should be a regex
	/regexatstartofline/ //should be a regex
	/[/]/.test('/'); //should be a regex
	/[\/]/.test('/'); //should be a regex
	/[\]]/.test('/'); //should be a regex
	/[\[]/.test('/'); //should be a regex
	/\[/.test('/'); //should be a regex
	/\]/.test('/'); //should be a regex

	/foo/gim.test("foo") //should be a regex with modifiers
	/foo/asdfasdf //should be a regex with non-existent modifiers
	
	var foo = (4 + 5) / 2; //should not be a regex
	var arr = [/regexafterbracket/, /regexaftercomma/, 4/5];
	function(regex) { /regexafterbrace/.text(regex); }
	func(/regexafterparen/); /regexaftersemicolon/;
	
	
	//.test("foo"); //should not be a regex
	
	4 /identafterdivision1/ //should not be a regex
	var foo = 5/identafterdivision2; //should not be a regex
	var foo = 5 /identafterdivision3; //should not be a regex
	if /regexafterkeyword/ //should not be a regex
	
	
	var jsonLiteral = {
		regex: /regexaftercolon/
	};
}(jQuery, window));
