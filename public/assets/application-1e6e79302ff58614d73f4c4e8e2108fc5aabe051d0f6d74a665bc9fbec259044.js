/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
;
(function() {
  this.Gmaps = {
    build: function(type, options) {
      var model;
      if (options == null) {
        options = {};
      }
      model = _.isFunction(options.handler) ? options.handler : Gmaps.Objects.Handler;
      return new model(type, options);
    },
    Builders: {},
    Objects: {},
    Google: {
      Objects: {},
      Builders: {}
    }
  };

}).call(this);
(function() {
  var moduleKeywords,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  this.Gmaps.Base = (function() {
    function Base() {}

    Base.extend = function(obj) {
      var key, ref, value;
      for (key in obj) {
        value = obj[key];
        if (indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((ref = obj.extended) != null) {
        ref.apply(this);
      }
      return this;
    };

    Base.include = function(obj) {
      var key, ref, value;
      for (key in obj) {
        value = obj[key];
        if (indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((ref = obj.included) != null) {
        ref.apply(this);
      }
      return this;
    };

    return Base;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.BaseBuilder = (function() {
    function BaseBuilder() {}

    BaseBuilder.prototype.build = function() {
      return new (this.model_class())(this.serviceObject);
    };

    BaseBuilder.prototype.before_init = function() {};

    BaseBuilder.prototype.after_init = function() {};

    BaseBuilder.prototype.addListener = function(action, fn) {
      return this.primitives().addListener(this.getServiceObject(), action, fn);
    };

    BaseBuilder.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    BaseBuilder.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    BaseBuilder.prototype.model_class = function() {
      return this.constructor.OBJECT;
    };

    return BaseBuilder;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.Builders = function(builderClass, objectClass, primitivesProvider) {
    return {
      build: function(args, provider_options, internal_options) {
        var builder;
        objectClass.PRIMITIVES = primitivesProvider;
        builderClass.OBJECT = objectClass;
        builderClass.PRIMITIVES = primitivesProvider;
        builder = new builderClass(args, provider_options, internal_options);
        return builder.build();
      }
    };
  };

}).call(this);
(function() {
  this.Gmaps.Objects.Handler = (function() {
    function Handler(type, options) {
      this.type = type;
      if (options == null) {
        options = {};
      }
      this.setPrimitives(options);
      this.setOptions(options);
      this._cacheAllBuilders();
      this.resetBounds();
    }

    Handler.prototype.buildMap = function(options, onMapLoad) {
      if (onMapLoad == null) {
        onMapLoad = function() {};
      }
      return this.map = this._builder('Map').build(options, (function(_this) {
        return function() {
          _this._createClusterer();
          return onMapLoad();
        };
      })(this));
    };

    Handler.prototype.addMarkers = function(markers_data, provider_options) {
      return _.map(markers_data, (function(_this) {
        return function(marker_data) {
          return _this.addMarker(marker_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addMarker = function(marker_data, provider_options) {
      var marker;
      marker = this._builder('Marker').build(marker_data, provider_options, this.marker_options);
      marker.setMap(this.getMap());
      this.clusterer.addMarker(marker);
      return marker;
    };

    Handler.prototype.addCircles = function(circles_data, provider_options) {
      return _.map(circles_data, (function(_this) {
        return function(circle_data) {
          return _this.addCircle(circle_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addCircle = function(circle_data, provider_options) {
      return this._addResource('circle', circle_data, provider_options);
    };

    Handler.prototype.addPolylines = function(polylines_data, provider_options) {
      return _.map(polylines_data, (function(_this) {
        return function(polyline_data) {
          return _this.addPolyline(polyline_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addPolyline = function(polyline_data, provider_options) {
      return this._addResource('polyline', polyline_data, provider_options);
    };

    Handler.prototype.addPolygons = function(polygons_data, provider_options) {
      return _.map(polygons_data, (function(_this) {
        return function(polygon_data) {
          return _this.addPolygon(polygon_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addPolygon = function(polygon_data, provider_options) {
      return this._addResource('polygon', polygon_data, provider_options);
    };

    Handler.prototype.addKmls = function(kmls_data, provider_options) {
      return _.map(kmls_data, (function(_this) {
        return function(kml_data) {
          return _this.addKml(kml_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addKml = function(kml_data, provider_options) {
      return this._addResource('kml', kml_data, provider_options);
    };

    Handler.prototype.removeMarkers = function(gem_markers) {
      return _.map(gem_markers, (function(_this) {
        return function(gem_marker) {
          return _this.removeMarker(gem_marker);
        };
      })(this));
    };

    Handler.prototype.removeMarker = function(gem_marker) {
      gem_marker.clear();
      return this.clusterer.removeMarker(gem_marker);
    };

    Handler.prototype.fitMapToBounds = function() {
      return this.map.fitToBounds(this.bounds.getServiceObject());
    };

    Handler.prototype.getMap = function() {
      return this.map.getServiceObject();
    };

    Handler.prototype.setOptions = function(options) {
      this.marker_options = _.extend(this._default_marker_options(), options.markers);
      this.builders = _.extend(this._default_builders(), options.builders);
      return this.models = _.extend(this._default_models(), options.models);
    };

    Handler.prototype.resetBounds = function() {
      return this.bounds = this._builder('Bound').build();
    };

    Handler.prototype.setPrimitives = function(options) {
      return this.primitives = options.primitives === void 0 ? this._rootModule().Primitives() : _.isFunction(options.primitives) ? options.primitives() : options.primitives;
    };

    Handler.prototype.currentInfowindow = function() {
      return this.builders.Marker.CURRENT_INFOWINDOW;
    };

    Handler.prototype._addResource = function(resource_name, resource_data, provider_options) {
      var resource;
      resource = this._builder(resource_name).build(resource_data, provider_options);
      resource.setMap(this.getMap());
      return resource;
    };

    Handler.prototype._cacheAllBuilders = function() {
      var that;
      that = this;
      return _.each(['Bound', 'Circle', 'Clusterer', 'Kml', 'Map', 'Marker', 'Polygon', 'Polyline'], function(kind) {
        return that._builder(kind);
      });
    };

    Handler.prototype._clusterize = function() {
      return _.isObject(this.marker_options.clusterer);
    };

    Handler.prototype._createClusterer = function() {
      return this.clusterer = this._builder('Clusterer').build({
        map: this.getMap()
      }, this.marker_options.clusterer);
    };

    Handler.prototype._default_marker_options = function() {
      return _.clone({
        singleInfowindow: true,
        maxRandomDistance: 0,
        clusterer: {
          maxZoom: 5,
          gridSize: 50
        }
      });
    };

    Handler.prototype._builder = function(name) {
      var name1;
      name = this._capitalize(name);
      if (this[name1 = "__builder" + name] == null) {
        this[name1] = Gmaps.Objects.Builders(this.builders[name], this.models[name], this.primitives);
      }
      return this["__builder" + name];
    };

    Handler.prototype._default_models = function() {
      var models;
      models = _.clone(this._rootModule().Objects);
      if (this._clusterize()) {
        return models;
      } else {
        models.Clusterer = Gmaps.Objects.NullClusterer;
        return models;
      }
    };

    Handler.prototype._capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Handler.prototype._default_builders = function() {
      return _.clone(this._rootModule().Builders);
    };

    Handler.prototype._rootModule = function() {
      if (this.__rootModule == null) {
        this.__rootModule = Gmaps[this.type];
      }
      return this.__rootModule;
    };

    return Handler;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.NullClusterer = (function() {
    function NullClusterer() {}

    NullClusterer.prototype.addMarkers = function() {};

    NullClusterer.prototype.addMarker = function() {};

    NullClusterer.prototype.clear = function() {};

    NullClusterer.prototype.removeMarker = function() {};

    return NullClusterer;

  })();

}).call(this);
(function() {
  this.Gmaps.Google.Objects.Common = {
    getServiceObject: function() {
      return this.serviceObject;
    },
    setMap: function(map) {
      return this.getServiceObject().setMap(map);
    },
    clear: function() {
      return this.getServiceObject().setMap(null);
    },
    show: function() {
      return this.getServiceObject().setVisible(true);
    },
    hide: function() {
      return this.getServiceObject().setVisible(false);
    },
    isVisible: function() {
      return this.getServiceObject().getVisible();
    },
    primitives: function() {
      return this.constructor.PRIMITIVES;
    }
  };

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Bound = (function(superClass) {
    extend(Bound, superClass);

    function Bound(options) {
      this.before_init();
      this.serviceObject = new (this.primitives().latLngBounds);
      this.after_init();
    }

    return Bound;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Circle = (function(superClass) {
    extend(Circle, superClass);

    function Circle(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_circle();
      this.after_init();
    }

    Circle.prototype.create_circle = function() {
      return new (this.primitives().circle)(this.circle_options());
    };

    Circle.prototype.circle_options = function() {
      var base_options;
      base_options = {
        center: new (this.primitives().latLng)(this.args.lat, this.args.lng),
        radius: this.args.radius
      };
      return _.defaults(base_options, this.provider_options);
    };

    return Circle;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Clusterer = (function(superClass) {
    extend(Clusterer, superClass);

    function Clusterer(args, options) {
      this.args = args;
      this.options = options;
      this.before_init();
      this.serviceObject = new (this.primitives().clusterer)(this.args.map, [], this.options);
      this.after_init();
    }

    return Clusterer;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Kml = (function(superClass) {
    extend(Kml, superClass);

    function Kml(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_kml();
      this.after_init();
    }

    Kml.prototype.create_kml = function() {
      return new (this.primitives().kml)(this.args.url, this.kml_options());
    };

    Kml.prototype.kml_options = function() {
      var base_options;
      base_options = {};
      return _.defaults(base_options, this.provider_options);
    };

    return Kml;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Map = (function(superClass) {
    extend(Map, superClass);

    function Map(options, onMapLoad) {
      var provider_options;
      this.before_init();
      provider_options = _.extend(this.default_options(), options.provider);
      this.internal_options = options.internal;
      this.serviceObject = new (this.primitives().map)(document.getElementById(this.internal_options.id), provider_options);
      this.on_map_load(onMapLoad);
      this.after_init();
    }

    Map.prototype.build = function() {
      return new (this.model_class())(this.serviceObject, this.primitives());
    };

    Map.prototype.on_map_load = function(onMapLoad) {
      return this.primitives().addListenerOnce(this.serviceObject, 'idle', onMapLoad);
    };

    Map.prototype.default_options = function() {
      return {
        mapTypeId: this.primitives().mapTypes('ROADMAP'),
        center: new (this.primitives().latLng)(0, 0),
        zoom: 8
      };
    };

    return Map;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Marker = (function(superClass) {
    extend(Marker, superClass);

    Marker.CURRENT_INFOWINDOW = void 0;

    Marker.CACHE_STORE = {};

    function Marker(args, provider_options, internal_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.internal_options = internal_options != null ? internal_options : {};
      this.infowindow_binding = bind(this.infowindow_binding, this);
      this.before_init();
      this.create_marker();
      this.create_infowindow_on_click();
      this.after_init();
    }

    Marker.prototype.build = function() {
      return this.marker = new (this.model_class())(this.serviceObject);
    };

    Marker.prototype.create_marker = function() {
      return this.serviceObject = new (this.primitives().marker)(this.marker_options());
    };

    Marker.prototype.create_infowindow = function() {
      if (!_.isString(this.args.infowindow)) {
        return null;
      }
      return new (this.primitives().infowindow)({
        content: this.args.infowindow
      });
    };

    Marker.prototype.marker_options = function() {
      var base_options, coords;
      coords = this._randomized_coordinates();
      base_options = {
        title: this.args.marker_title,
        position: new (this.primitives().latLng)(coords[0], coords[1]),
        icon: this._get_picture('picture'),
        shadow: this._get_picture('shadow')
      };
      return _.extend(this.provider_options, base_options);
    };

    Marker.prototype.create_infowindow_on_click = function() {
      return this.addListener('click', this.infowindow_binding);
    };

    Marker.prototype.infowindow_binding = function() {
      var base;
      if (this._should_close_infowindow()) {
        this.constructor.CURRENT_INFOWINDOW.close();
      }
      this.marker.panTo();
      if (this.infowindow == null) {
        this.infowindow = this.create_infowindow();
      }
      if (this.infowindow == null) {
        return;
      }
      this.infowindow.open(this.getServiceObject().getMap(), this.getServiceObject());
      if ((base = this.marker).infowindow == null) {
        base.infowindow = this.infowindow;
      }
      return this.constructor.CURRENT_INFOWINDOW = this.infowindow;
    };

    Marker.prototype._get_picture = function(picture_name) {
      if (!_.isObject(this.args[picture_name]) || !_.isString(this.args[picture_name].url)) {
        return null;
      }
      return this._create_or_retrieve_image(this._picture_args(picture_name));
    };

    Marker.prototype._create_or_retrieve_image = function(picture_args) {
      if (this.constructor.CACHE_STORE[picture_args.url] === void 0) {
        this.constructor.CACHE_STORE[picture_args.url] = new (this.primitives().markerImage)(picture_args.url, picture_args.size, picture_args.origin, picture_args.anchor, picture_args.scaledSize);
      }
      return this.constructor.CACHE_STORE[picture_args.url];
    };

    Marker.prototype._picture_args = function(picture_name) {
      return {
        url: this.args[picture_name].url,
        anchor: this._createImageAnchorPosition(this.args[picture_name].anchor),
        size: new (this.primitives().size)(this.args[picture_name].width, this.args[picture_name].height),
        scaledSize: null,
        origin: null
      };
    };

    Marker.prototype._createImageAnchorPosition = function(anchorLocation) {
      if (!_.isArray(anchorLocation)) {
        return null;
      }
      return new (this.primitives().point)(anchorLocation[0], anchorLocation[1]);
    };

    Marker.prototype._should_close_infowindow = function() {
      return this.internal_options.singleInfowindow && (this.constructor.CURRENT_INFOWINDOW != null);
    };

    Marker.prototype._randomized_coordinates = function() {
      var Lat, Lng, dx, dy, random;
      if (!_.isNumber(this.internal_options.maxRandomDistance)) {
        return [this.args.lat, this.args.lng];
      }
      random = function() {
        return Math.random() * 2 - 1;
      };
      dx = this.internal_options.maxRandomDistance * random();
      dy = this.internal_options.maxRandomDistance * random();
      Lat = parseFloat(this.args.lat) + (180 / Math.PI) * (dy / 6378137);
      Lng = parseFloat(this.args.lng) + (90 / Math.PI) * (dx / 6378137) / Math.cos(this.args.lat);
      return [Lat, Lng];
    };

    return Marker;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Polygon = (function(superClass) {
    extend(Polygon, superClass);

    function Polygon(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_polygon();
      this.after_init();
    }

    Polygon.prototype.create_polygon = function() {
      return new (this.primitives().polygon)(this.polygon_options());
    };

    Polygon.prototype.polygon_options = function() {
      var base_options;
      base_options = {
        path: this._build_path()
      };
      return _.defaults(base_options, this.provider_options);
    };

    Polygon.prototype._build_path = function() {
      return _.map(this.args, (function(_this) {
        return function(arg) {
          return new (_this.primitives().latLng)(arg.lat, arg.lng);
        };
      })(this));
    };

    return Polygon;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Polyline = (function(superClass) {
    extend(Polyline, superClass);

    function Polyline(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_polyline();
      this.after_init();
    }

    Polyline.prototype.create_polyline = function() {
      return new (this.primitives().polyline)(this.polyline_options());
    };

    Polyline.prototype.polyline_options = function() {
      var base_options;
      base_options = {
        path: this._build_path()
      };
      return _.defaults(base_options, this.provider_options);
    };

    Polyline.prototype._build_path = function() {
      return _.map(this.args, (function(_this) {
        return function(arg) {
          return new (_this.primitives().latLng)(arg.lat, arg.lng);
        };
      })(this));
    };

    return Polyline;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Bound = (function(superClass) {
    extend(Bound, superClass);

    Bound.include(Gmaps.Google.Objects.Common);

    function Bound(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Bound.prototype.extendWith = function(array_or_object) {
      var collection;
      collection = _.isArray(array_or_object) ? array_or_object : [array_or_object];
      return _.each(collection, (function(_this) {
        return function(object) {
          return object.updateBounds(_this);
        };
      })(this));
    };

    Bound.prototype.extend = function(value) {
      return this.getServiceObject().extend(this.primitives().latLngFromPosition(value));
    };

    return Bound;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Circle = (function(superClass) {
    extend(Circle, superClass);

    Circle.include(Gmaps.Google.Objects.Common);

    function Circle(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Circle.prototype.updateBounds = function(bounds) {
      bounds.extend(this.getServiceObject().getBounds().getNorthEast());
      return bounds.extend(this.getServiceObject().getBounds().getSouthWest());
    };

    return Circle;

  })(Gmaps.Base);

}).call(this);
(function() {
  this.Gmaps.Google.Objects.Clusterer = (function() {
    function Clusterer(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Clusterer.prototype.addMarkers = function(markers) {
      return _.each(markers, (function(_this) {
        return function(marker) {
          return _this.addMarker(marker);
        };
      })(this));
    };

    Clusterer.prototype.addMarker = function(marker) {
      return this.getServiceObject().addMarker(marker.getServiceObject());
    };

    Clusterer.prototype.clear = function() {
      return this.getServiceObject().clearMarkers();
    };

    Clusterer.prototype.removeMarker = function(marker) {
      return this.getServiceObject().removeMarker(marker.getServiceObject());
    };

    Clusterer.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    return Clusterer;

  })();

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Kml = (function(superClass) {
    extend(Kml, superClass);

    function Kml(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Kml.prototype.updateBounds = function(bounds) {};

    Kml.prototype.setMap = function(map) {
      return this.getServiceObject().setMap(map);
    };

    Kml.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    Kml.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    return Kml;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Map = (function(superClass) {
    extend(Map, superClass);

    function Map(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Map.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    Map.prototype.centerOn = function(position) {
      return this.getServiceObject().setCenter(this.primitives().latLngFromPosition(position));
    };

    Map.prototype.fitToBounds = function(boundsObject) {
      if (!boundsObject.isEmpty()) {
        return this.getServiceObject().fitBounds(boundsObject);
      }
    };

    Map.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    return Map;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Marker = (function(superClass) {
    extend(Marker, superClass);

    Marker.include(Gmaps.Google.Objects.Common);

    function Marker(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Marker.prototype.updateBounds = function(bounds) {
      return bounds.extend(this.getServiceObject().position);
    };

    Marker.prototype.panTo = function() {
      return this.getServiceObject().getMap().panTo(this.getServiceObject().getPosition());
    };

    return Marker;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Polygon = (function(superClass) {
    extend(Polygon, superClass);

    Polygon.include(Gmaps.Google.Objects.Common);

    function Polygon(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Polygon.prototype.updateBounds = function(bounds) {
      var i, len, ll, ref, results;
      ref = this.serviceObject.getPath().getArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ll = ref[i];
        results.push(bounds.extend(ll));
      }
      return results;
    };

    return Polygon;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Polyline = (function(superClass) {
    extend(Polyline, superClass);

    Polyline.include(Gmaps.Google.Objects.Common);

    function Polyline(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Polyline.prototype.updateBounds = function(bounds) {
      var i, len, ll, ref, results;
      ref = this.serviceObject.getPath().getArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ll = ref[i];
        results.push(bounds.extend(ll));
      }
      return results;
    };

    return Polyline;

  })(Gmaps.Base);

}).call(this);
(function() {
  this.Gmaps.Google.Primitives = function() {
    var factory;
    factory = {
      point: google.maps.Point,
      size: google.maps.Size,
      circle: google.maps.Circle,
      latLng: google.maps.LatLng,
      latLngBounds: google.maps.LatLngBounds,
      map: google.maps.Map,
      mapTypez: google.maps.MapTypeId,
      markerImage: google.maps.MarkerImage,
      marker: google.maps.Marker,
      infowindow: google.maps.InfoWindow,
      listener: google.maps.event.addListener,
      clusterer: MarkerClusterer,
      listenerOnce: google.maps.event.addListenerOnce,
      polyline: google.maps.Polyline,
      polygon: google.maps.Polygon,
      kml: google.maps.KmlLayer,
      addListener: function(object, event_name, fn) {
        return factory.listener(object, event_name, fn);
      },
      addListenerOnce: function(object, event_name, fn) {
        return factory.listenerOnce(object, event_name, fn);
      },
      mapTypes: function(type) {
        return factory.mapTypez[type];
      },
      latLngFromPosition: function(position) {
        if (_.isArray(position)) {
          return new factory.latLng(position[0], position[1]);
        } else {
          if (_.isNumber(position.lat) && _.isNumber(position.lng)) {
            return new factory.latLng(position.lat, position.lng);
          } else {
            if (_.isFunction(position.getServiceObject)) {
              return position.getServiceObject().getPosition();
            } else {
              return position;
            }
          }
        }
      }
    };
    return factory;
  };

}).call(this);
(function() {


}).call(this);
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
(function(){var $c=function(a){this.w=a||[]};$c.prototype.set=function(a){this.w[a]=!0};$c.prototype.encode=function(){for(var a=[],b=0;b<this.w.length;b++)this.w[b]&&(a[Math.floor(b/6)]^=1<<b%6);for(b=0;b<a.length;b++)a[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b]||0);return a.join("")+"~"};var vd=new $c;function J(a){vd.set(a)}var Nd=function(a,b){var c=new $c(Dd(a));c.set(b);a.set(Gd,c.w)},Td=function(a){a=Dd(a);a=new $c(a);for(var b=vd.w.slice(),c=0;c<a.w.length;c++)b[c]=b[c]||a.w[c];return(new $c(b)).encode()},Dd=function(a){a=a.get(Gd);ka(a)||(a=[]);return a};var ea=function(a){return"function"==typeof a},ka=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},qa=function(a){return void 0!=a&&-1<(a.constructor+"").indexOf("String")},D=function(a,b){return 0==a.indexOf(b)},sa=function(a){return a?a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""):""},ta=function(a){var b=M.createElement("img");b.width=1;b.height=1;b.src=a;return b},ua=function(){},K=function(a){if(encodeURIComponent instanceof Function)return encodeURIComponent(a);J(28);return a},
L=function(a,b,c,d){try{a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)}catch(e){J(27)}},f=/^[\w\-:/.?=&%!]+$/,wa=function(a,b,c){a&&(c?(c="",b&&f.test(b)&&(c=' id="'+b+'"'),f.test(a)&&M.write("<script"+c+' src="'+a+'">\x3c/script>')):(c=M.createElement("script"),c.type="text/javascript",c.async=!0,c.src=a,b&&(c.id=b),a=M.getElementsByTagName("script")[0],a.parentNode.insertBefore(c,a)))},Ud=function(){return"https:"==M.location.protocol},E=function(a,b){var c=
a.match("(?:&|#|\\?)"+K(b).replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)");return c&&2==c.length?c[1]:""},xa=function(){var a=""+M.location.hostname;return 0==a.indexOf("www.")?a.substring(4):a},ya=function(a){var b=M.referrer;if(/^https?:\/\//i.test(b)){if(a)return b;a="//"+M.location.hostname;var c=b.indexOf(a);if(5==c||6==c)if(a=b.charAt(c+a.length),"/"==a||"?"==a||""==a||":"==a)return;return b}},za=function(a,b){if(1==b.length&&null!=b[0]&&"object"===typeof b[0])return b[0];for(var c=
{},d=Math.min(a.length+1,b.length),e=0;e<d;e++)if("object"===typeof b[e]){for(var g in b[e])b[e].hasOwnProperty(g)&&(c[g]=b[e][g]);break}else e<a.length&&(c[a[e]]=b[e]);return c};var ee=function(){this.keys=[];this.values={};this.m={}};ee.prototype.set=function(a,b,c){this.keys.push(a);c?this.m[":"+a]=b:this.values[":"+a]=b};ee.prototype.get=function(a){return this.m.hasOwnProperty(":"+a)?this.m[":"+a]:this.values[":"+a]};ee.prototype.map=function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b],d=this.get(c);d&&a(c,d)}};var O=window,M=document;var F=window,G=function(a){var b=F._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===F["ga-disable-"+a])return!0;try{var c=F.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(d){}return!1};var Ca=function(a){var b=[],c=M.cookie.split(";");a=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c.length;d++){var e=c[d].match(a);e&&b.push(e[1])}return b},zc=function(a,b,c,d,e,g){e=G(e)?!1:eb.test(M.location.hostname)||"/"==c&&vc.test(d)?!1:!0;if(!e)return!1;b&&1200<b.length&&(b=b.substring(0,1200),J(24));c=a+"="+b+"; path="+c+"; ";g&&(c+="expires="+(new Date((new Date).getTime()+g)).toGMTString()+"; ");d&&"none"!=d&&(c+="domain="+d+";");d=M.cookie;M.cookie=c;if(!(d=d!=M.cookie))a:{a=
Ca(a);for(d=0;d<a.length;d++)if(b==a[d]){d=!0;break a}d=!1}return d},Cc=function(a){return K(a).replace(/\(/g,"%28").replace(/\)/g,"%29")},vc=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,eb=/(^|\.)doubleclick\.net$/i;var oc=function(){return(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com"},Da=function(a){this.name="len";this.message=a+"-8192"},ba=function(a,b,c){c=c||ua;if(2036>=b.length)wc(a,b,c);else if(8192>=b.length)x(a,b,c)||wd(a,b,c)||wc(a,b,c);else throw ge("len",b.length),new Da(b.length);},wc=function(a,b,c){var d=ta(a+"?"+b);d.onload=d.onerror=function(){d.onload=null;d.onerror=null;c()}},wd=function(a,b,c){var d=O.XMLHttpRequest;if(!d)return!1;var e=new d;if(!("withCredentials"in e))return!1;
e.open("POST",a,!0);e.withCredentials=!0;e.setRequestHeader("Content-Type","text/plain");e.onreadystatechange=function(){4==e.readyState&&(c(),e=null)};e.send(b);return!0},x=function(a,b,c){return O.navigator.sendBeacon?O.navigator.sendBeacon(a,b)?(c(),!0):!1:!1},ge=function(a,b,c){1<=100*Math.random()||G("?")||(a=["t=error","_e="+a,"_v=j47","sr=1"],b&&a.push("_f="+b),c&&a.push("_m="+K(c.substring(0,100))),a.push("aip=1"),a.push("z="+hd()),wc(oc()+"/collect",a.join("&"),ua))};var h=function(a){var b=O.gaData=O.gaData||{};return b[a]=b[a]||{}};var Ha=function(){this.M=[]};Ha.prototype.add=function(a){this.M.push(a)};Ha.prototype.D=function(a){try{for(var b=0;b<this.M.length;b++){var c=a.get(this.M[b]);c&&ea(c)&&c.call(O,a)}}catch(d){}b=a.get(Ia);b!=ua&&ea(b)&&(a.set(Ia,ua,!0),setTimeout(b,10))};function Ja(a){if(100!=a.get(Ka)&&La(P(a,Q))%1E4>=100*R(a,Ka))throw"abort";}function Ma(a){if(G(P(a,Na)))throw"abort";}function Oa(){var a=M.location.protocol;if("http:"!=a&&"https:"!=a)throw"abort";}
function Pa(a){try{O.navigator.sendBeacon?J(42):O.XMLHttpRequest&&"withCredentials"in new O.XMLHttpRequest&&J(40)}catch(c){}a.set(ld,Td(a),!0);a.set(Ac,R(a,Ac)+1);var b=[];Qa.map(function(c,d){if(d.F){var e=a.get(c);void 0!=e&&e!=d.defaultValue&&("boolean"==typeof e&&(e*=1),b.push(d.F+"="+K(""+e)))}});b.push("z="+Bd());a.set(Ra,b.join("&"),!0)}
function Sa(a){var b=P(a,gd)||oc()+"/collect",c=P(a,fa);!c&&a.get(Vd)&&(c="beacon");if(c){var d=P(a,Ra),e=a.get(Ia),e=e||ua;"image"==c?wc(b,d,e):"xhr"==c&&wd(b,d,e)||"beacon"==c&&x(b,d,e)||ba(b,d,e)}else ba(b,P(a,Ra),a.get(Ia));b=a.get(Na);b=h(b);c=b.hitcount;b.hitcount=c?c+1:1;b=a.get(Na);delete h(b).pending_experiments;a.set(Ia,ua,!0)}
function Hc(a){(O.gaData=O.gaData||{}).expId&&a.set(Nc,(O.gaData=O.gaData||{}).expId);(O.gaData=O.gaData||{}).expVar&&a.set(Oc,(O.gaData=O.gaData||{}).expVar);var b;var c=a.get(Na);if(c=h(c).pending_experiments){var d=[];for(b in c)c.hasOwnProperty(b)&&c[b]&&d.push(encodeURIComponent(b)+"."+encodeURIComponent(c[b]));b=d.join("!")}else b=void 0;b&&a.set(m,b,!0)}function cd(){if(O.navigator&&"preview"==O.navigator.loadPurpose)throw"abort";}
function yd(a){var b=O.gaDevIds;ka(b)&&0!=b.length&&a.set("&did",b.join(","),!0)}function vb(a){if(!a.get(Na))throw"abort";};var hd=function(){return Math.round(2147483647*Math.random())},Bd=function(){try{var a=new Uint32Array(1);O.crypto.getRandomValues(a);return a[0]&2147483647}catch(b){return hd()}};function Ta(a){var b=R(a,Ua);500<=b&&J(15);var c=P(a,Va);if("transaction"!=c&&"item"!=c){var c=R(a,Wa),d=(new Date).getTime(),e=R(a,Xa);0==e&&a.set(Xa,d);e=Math.round(2*(d-e)/1E3);0<e&&(c=Math.min(c+e,20),a.set(Xa,d));if(0>=c)throw"abort";a.set(Wa,--c)}a.set(Ua,++b)};var Ya=function(){this.data=new ee},Qa=new ee,Za=[];Ya.prototype.get=function(a){var b=$a(a),c=this.data.get(a);b&&void 0==c&&(c=ea(b.defaultValue)?b.defaultValue():b.defaultValue);return b&&b.Z?b.Z(this,a,c):c};var P=function(a,b){var c=a.get(b);return void 0==c?"":""+c},R=function(a,b){var c=a.get(b);return void 0==c||""===c?0:1*c};Ya.prototype.set=function(a,b,c){if(a)if("object"==typeof a)for(var d in a)a.hasOwnProperty(d)&&ab(this,d,a[d],c);else ab(this,a,b,c)};
var ab=function(a,b,c,d){if(void 0!=c)switch(b){case Na:wb.test(c)}var e=$a(b);e&&e.o?e.o(a,b,c,d):a.data.set(b,c,d)},bb=function(a,b,c,d,e){this.name=a;this.F=b;this.Z=d;this.o=e;this.defaultValue=c},$a=function(a){var b=Qa.get(a);if(!b)for(var c=0;c<Za.length;c++){var d=Za[c],e=d[0].exec(a);if(e){b=d[1](e);Qa.set(b.name,b);break}}return b},yc=function(a){var b;Qa.map(function(c,d){d.F==a&&(b=d)});return b&&b.name},S=function(a,b,c,d,e){a=new bb(a,b,c,d,e);Qa.set(a.name,a);return a.name},cb=function(a,
b){Za.push([new RegExp("^"+a+"$"),b])},T=function(a,b,c){return S(a,b,c,void 0,db)},db=function(){};var gb=qa(window.GoogleAnalyticsObject)&&sa(window.GoogleAnalyticsObject)||"ga",Ba=!1,hb=T("apiVersion","v"),ib=T("clientVersion","_v");S("anonymizeIp","aip");var jb=S("adSenseId","a"),Va=S("hitType","t"),Ia=S("hitCallback"),Ra=S("hitPayload");S("nonInteraction","ni");S("currencyCode","cu");S("dataSource","ds");var Vd=S("useBeacon",void 0,!1),fa=S("transport");S("sessionControl","sc","");S("sessionGroup","sg");S("queueTime","qt");var Ac=S("_s","_s");S("screenName","cd");
var kb=S("location","dl",""),lb=S("referrer","dr"),mb=S("page","dp","");S("hostname","dh");var nb=S("language","ul"),ob=S("encoding","de");S("title","dt",function(){return M.title||void 0});cb("contentGroup([0-9]+)",function(a){return new bb(a[0],"cg"+a[1])});var pb=S("screenColors","sd"),qb=S("screenResolution","sr"),rb=S("viewportSize","vp"),sb=S("javaEnabled","je"),tb=S("flashVersion","fl");S("campaignId","ci");S("campaignName","cn");S("campaignSource","cs");S("campaignMedium","cm");
S("campaignKeyword","ck");S("campaignContent","cc");var ub=S("eventCategory","ec"),xb=S("eventAction","ea"),yb=S("eventLabel","el"),zb=S("eventValue","ev"),Bb=S("socialNetwork","sn"),Cb=S("socialAction","sa"),Db=S("socialTarget","st"),Eb=S("l1","plt"),Fb=S("l2","pdt"),Gb=S("l3","dns"),Hb=S("l4","rrt"),Ib=S("l5","srt"),Jb=S("l6","tcp"),Kb=S("l7","dit"),Lb=S("l8","clt"),Mb=S("timingCategory","utc"),Nb=S("timingVar","utv"),Ob=S("timingLabel","utl"),Pb=S("timingValue","utt");S("appName","an");
S("appVersion","av","");S("appId","aid","");S("appInstallerId","aiid","");S("exDescription","exd");S("exFatal","exf");var Nc=S("expId","xid"),Oc=S("expVar","xvar"),m=S("exp","exp"),Rc=S("_utma","_utma"),Sc=S("_utmz","_utmz"),Tc=S("_utmht","_utmht"),Ua=S("_hc",void 0,0),Xa=S("_ti",void 0,0),Wa=S("_to",void 0,20);cb("dimension([0-9]+)",function(a){return new bb(a[0],"cd"+a[1])});cb("metric([0-9]+)",function(a){return new bb(a[0],"cm"+a[1])});S("linkerParam",void 0,void 0,Bc,db);
var ld=S("usage","_u"),Gd=S("_um");S("forceSSL",void 0,void 0,function(){return Ba},function(a,b,c){J(34);Ba=!!c});var ed=S("_j1","jid");cb("\\&(.*)",function(a){var b=new bb(a[0],a[1]),c=yc(a[0].substring(1));c&&(b.Z=function(a){return a.get(c)},b.o=function(a,b,g,ca){a.set(c,g,ca)},b.F=void 0);return b});
var Qb=T("_oot"),dd=S("previewTask"),Rb=S("checkProtocolTask"),md=S("validationTask"),Sb=S("checkStorageTask"),Uc=S("historyImportTask"),Tb=S("samplerTask"),Vb=S("_rlt"),Wb=S("buildHitTask"),Xb=S("sendHitTask"),Vc=S("ceTask"),zd=S("devIdTask"),Cd=S("timingTask"),Ld=S("displayFeaturesTask"),V=T("name"),Q=T("clientId","cid"),n=T("clientIdTime"),Ad=S("userId","uid"),Na=T("trackingId","tid"),U=T("cookieName",void 0,"_ga"),W=T("cookieDomain"),Yb=T("cookiePath",void 0,"/"),Zb=T("cookieExpires",void 0,63072E3),
$b=T("legacyCookieDomain"),Wc=T("legacyHistoryImport",void 0,!0),ac=T("storage",void 0,"cookie"),bc=T("allowLinker",void 0,!1),cc=T("allowAnchor",void 0,!0),Ka=T("sampleRate","sf",100),dc=T("siteSpeedSampleRate",void 0,1),ec=T("alwaysSendReferrer",void 0,!1),gd=S("transportUrl"),Md=S("_r","_r");function X(a,b,c,d){b[a]=function(){try{return d&&J(d),c.apply(this,arguments)}catch(e){throw ge("exc",a,e&&e.name),e;}}};var Od=function(a){this.V=a;this.fa=void 0;this.$=!1;this.oa=void 0;this.ea=1},Ed=function(a,b){var c;if(a.fa&&a.$)return 0;a.$=!0;if(b){if(a.oa&&R(b,a.oa))return R(b,a.oa);if(0==b.get(dc))return 0}if(0==a.V)return 0;void 0===c&&(c=Bd());return 0==c%a.V?Math.floor(c/a.V)%a.ea+1:0};function fc(){var a,b,c;if((c=(c=O.navigator)?c.plugins:null)&&c.length)for(var d=0;d<c.length&&!b;d++){var e=c[d];-1<e.name.indexOf("Shockwave Flash")&&(b=e.description)}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b="WIN 6,0,21,0",a.AllowScriptAccess="always",b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=a.GetVariable("$version")}catch(g){}b&&
(a=b.match(/[\d]+/g))&&3<=a.length&&(b=a[0]+"."+a[1]+" r"+a[2]);return b||void 0};var aa=function(a){var b=Math.min(R(a,dc),100);return La(P(a,Q))%100>=b?!1:!0},gc=function(a){var b={};if(Ec(b)||Fc(b)){var c=b[Eb];void 0==c||Infinity==c||isNaN(c)||(0<c?(Y(b,Gb),Y(b,Jb),Y(b,Ib),Y(b,Fb),Y(b,Hb),Y(b,Kb),Y(b,Lb),a(b)):L(O,"load",function(){gc(a)},!1))}},Ec=function(a){var b=O.performance||O.webkitPerformance,b=b&&b.timing;if(!b)return!1;var c=b.navigationStart;if(0==c)return!1;a[Eb]=b.loadEventStart-c;a[Gb]=b.domainLookupEnd-b.domainLookupStart;a[Jb]=b.connectEnd-b.connectStart;a[Ib]=
b.responseStart-b.requestStart;a[Fb]=b.responseEnd-b.responseStart;a[Hb]=b.fetchStart-c;a[Kb]=b.domInteractive-c;a[Lb]=b.domContentLoadedEventStart-c;return!0},Fc=function(a){if(O.top!=O)return!1;var b=O.external,c=b&&b.onloadT;b&&!b.isValidLoadTime&&(c=void 0);2147483648<c&&(c=void 0);0<c&&b.setPageReadyTime();if(void 0==c)return!1;a[Eb]=c;return!0},Y=function(a,b){var c=a[b];if(isNaN(c)||Infinity==c||0>c)a[b]=void 0},Fd=function(a){return function(b){if("pageview"==b.get(Va)&&!a.I){a.I=!0;var c=
aa(b);b=0<E(b.get(kb),"gclid").length;(c||b)&&gc(function(b){a.send(c?"timing":"adtiming",b)})}}};var hc=!1,mc=function(a){if("cookie"==P(a,ac)){var b=P(a,U),c=nd(a),d=kc(P(a,Yb)),e=lc(P(a,W)),g=1E3*R(a,Zb),ca=P(a,Na);if("auto"!=e)zc(b,c,d,e,ca,g)&&(hc=!0);else{J(32);var l;a:{c=[];e=xa().split(".");if(4==e.length&&(l=e[e.length-1],parseInt(l,10)==l)){l=["none"];break a}for(l=e.length-2;0<=l;l--)c.push(e.slice(l).join("."));c.push("none");l=c}for(var k=0;k<l.length;k++)if(e=l[k],a.data.set(W,e),c=nd(a),zc(b,c,d,e,ca,g)){hc=!0;return}a.data.set(W,"auto")}}},nc=function(a){if("cookie"==P(a,ac)&&
!hc&&(mc(a),!hc))throw"abort";},Yc=function(a){if(a.get(Wc)){var b=P(a,W),c=P(a,$b)||xa(),d=Xc("__utma",c,b);d&&(J(19),a.set(Tc,(new Date).getTime(),!0),a.set(Rc,d.R),(b=Xc("__utmz",c,b))&&d.hash==b.hash&&a.set(Sc,b.R))}},nd=function(a){var b=Cc(P(a,Q)),c=lc(P(a,W)).split(".").length;a=jc(P(a,Yb));1<a&&(c+="-"+a);return["GA1",c,b].join(".")},Gc=function(a,b,c){for(var d=[],e=[],g,ca=0;ca<a.length;ca++){var l=a[ca];l.H[c]==b?d.push(l):void 0==g||l.H[c]<g?(e=[l],g=l.H[c]):l.H[c]==g&&e.push(l)}return 0<
d.length?d:e},lc=function(a){return 0==a.indexOf(".")?a.substr(1):a},kc=function(a){if(!a)return"/";1<a.length&&a.lastIndexOf("/")==a.length-1&&(a=a.substr(0,a.length-1));0!=a.indexOf("/")&&(a="/"+a);return a},jc=function(a){a=kc(a);return"/"==a?1:a.split("/").length};function Xc(a,b,c){"none"==b&&(b="");var d=[],e=Ca(a);a="__utma"==a?6:2;for(var g=0;g<e.length;g++){var ca=(""+e[g]).split(".");ca.length>=a&&d.push({hash:ca[0],R:e[g],O:ca})}if(0!=d.length)return 1==d.length?d[0]:Zc(b,d)||Zc(c,d)||Zc(null,d)||d[0]}function Zc(a,b){var c,d;null==a?c=d=1:(c=La(a),d=La(D(a,".")?a.substring(1):"."+a));for(var e=0;e<b.length;e++)if(b[e].hash==c||b[e].hash==d)return b[e]};var od=new RegExp(/^https?:\/\/([^\/:]+)/),pd=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;function Bc(a){a=a.get(Q);var b=Ic(a,0);return"_ga=1."+K(b+"."+a)}function Ic(a,b){for(var c=new Date,d=O.navigator,e=d.plugins||[],c=[a,d.userAgent,c.getTimezoneOffset(),c.getYear(),c.getDate(),c.getHours(),c.getMinutes()+b],d=0;d<e.length;++d)c.push(e[d].description);return La(c.join("."))}var Dc=function(a){J(48);this.target=a;this.T=!1};
Dc.prototype.ca=function(a,b){if(a.tagName){if("a"==a.tagName.toLowerCase()){a.href&&(a.href=qd(this,a.href,b));return}if("form"==a.tagName.toLowerCase())return rd(this,a)}if("string"==typeof a)return qd(this,a,b)};
var qd=function(a,b,c){var d=pd.exec(b);d&&3<=d.length&&(b=d[1]+(d[3]?d[2]+d[3]:""));a=a.target.get("linkerParam");var e=b.indexOf("?"),d=b.indexOf("#");c?b+=(-1==d?"#":"&")+a:(c=-1==e?"?":"&",b=-1==d?b+(c+a):b.substring(0,d)+c+a+b.substring(d));return b=b.replace(/&+_ga=/,"&_ga=")},rd=function(a,b){if(b&&b.action){var c=a.target.get("linkerParam").split("=")[1];if("get"==b.method.toLowerCase()){for(var d=b.childNodes||[],e=0;e<d.length;e++)if("_ga"==d[e].name){d[e].setAttribute("value",c);return}d=
M.createElement("input");d.setAttribute("type","hidden");d.setAttribute("name","_ga");d.setAttribute("value",c);b.appendChild(d)}else"post"==b.method.toLowerCase()&&(b.action=qd(a,b.action))}};
Dc.prototype.S=function(a,b,c){function d(c){try{c=c||O.event;var d;a:{var g=c.target||c.srcElement;for(c=100;g&&0<c;){if(g.href&&g.nodeName.match(/^a(?:rea)?$/i)){d=g;break a}g=g.parentNode;c--}d={}}("http:"==d.protocol||"https:"==d.protocol)&&sd(a,d.hostname||"")&&d.href&&(d.href=qd(e,d.href,b))}catch(k){J(26)}}var e=this;this.T||(this.T=!0,L(M,"mousedown",d,!1),L(M,"keyup",d,!1));c&&L(M,"submit",function(b){b=b||O.event;if((b=b.target||b.srcElement)&&b.action){var c=b.action.match(od);c&&sd(a,
c[1])&&rd(e,b)}})};function sd(a,b){if(b==M.location.hostname)return!1;for(var c=0;c<a.length;c++)if(a[c]instanceof RegExp){if(a[c].test(b))return!0}else if(0<=b.indexOf(a[c]))return!0;return!1};var p=/^(GTM|OPT)-[A-Z0-9]+$/,q=/;_gaexp=[^;]*/g,r=/;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g,t=function(a){function b(a,b){b&&(c+="&"+a+"="+K(b))}var c="https://www.google-analytics.com/gtm/js?id="+K(a.id);"dataLayer"!=a.B&&b("l",a.B);b("t",a.target);b("cid",a.ja);b("cidt",a.ka);b("gac",a.la);b("aip",a.ia);a.na&&b("m","sync");b("cycle",a.G);return c};var Jd=function(a,b,c){this.U=ed;this.aa=b;(b=c)||(b=(b=P(a,V))&&"t0"!=b?Wd.test(b)?"_gat_"+Cc(P(a,Na)):"_gat_"+Cc(b):"_gat");this.Y=b;Ed(new Od(100),a)&&(J(30),this.pa=!0)},Rd=function(a,b){var c=b.get(Wb);b.set(Wb,function(b){Pd(a,b);var d=c(b);Qd(a,b);return d});var d=b.get(Xb);b.set(Xb,function(b){var c=d(b);Id(a,b);return c})},Pd=function(a,b){b.get(a.U)||("1"==Ca(a.Y)[0]?b.set(a.U,"",!0):b.set(a.U,""+hd(),!0))},Qd=function(a,b){if(b.get(a.U)){var c=6E5;a.pa&&(c/=10);zc(a.Y,"1",b.get(Yb),b.get(W),
b.get(Na),c)}},Id=function(a,b){if(b.get(a.U)){var c=new ee,d=function(a){$a(a).F&&c.set($a(a).F,b.get(a))};d(hb);d(ib);d(Na);d(Q);d(Ad);d(a.U);c.set($a(ld).F,Td(b));var e=a.aa;c.map(function(a,b){e+=K(a)+"=";e+=K(""+b)+"&"});e+="z="+hd();ta(e);b.set(a.U,"",!0)}},Wd=/^gtm\d+$/;var fd=function(a,b){var c=a.b;if(!c.get("dcLoaded")){Nd(c,29);b=b||{};var d;b[U]&&(d=Cc(b[U]));d=new Jd(c,"https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&",d);Rd(d,c);c.set("dcLoaded",!0)}};var Sd=function(a){if(!a.get("dcLoaded")&&"cookie"==a.get(ac)){Nd(a,51);var b=new Jd(a);Pd(b,a);Qd(b,a);a.get(b.U)&&(a.set(Md,1,!0),a.set(gd,oc()+"/r/collect",!0))}};var Lc=function(){var a=O.gaGlobal=O.gaGlobal||{};return a.hid=a.hid||hd()};var ad,bd=function(a,b,c){if(!ad){var d;d=M.location.hash;var e=O.name,g=/^#?gaso=([^&]*)/;if(e=(d=(d=d&&d.match(g)||e&&e.match(g))?d[1]:Ca("GASO")[0]||"")&&d.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))zc("GASO",""+d,c,b,a,0),window._udo||(window._udo=b),window._utcp||(window._utcp=c),a=e[1],wa("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+hd(),"_gasojs");ad=!0}};var wb=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,pc=function(a){function b(a,b){d.b.data.set(a,b)}function c(a,c){b(a,c);d.filters.add(a)}var d=this;this.b=new Ya;this.filters=new Ha;b(V,a[V]);b(Na,sa(a[Na]));b(U,a[U]);b(W,a[W]||xa());b(Yb,a[Yb]);b(Zb,a[Zb]);b($b,a[$b]);b(Wc,a[Wc]);b(bc,a[bc]);b(cc,a[cc]);b(Ka,a[Ka]);b(dc,a[dc]);b(ec,a[ec]);b(ac,a[ac]);b(Ad,a[Ad]);b(n,a[n]);b(hb,1);b(ib,"j47");c(Qb,Ma);c(dd,cd);c(Rb,Oa);c(md,vb);c(Sb,nc);c(Uc,Yc);c(Tb,Ja);c(Vb,Ta);c(Vc,Hc);c(zd,yd);c(Ld,Sd);c(Wb,Pa);c(Xb,Sa);
c(Cd,Fd(this));Jc(this.b,a[Q]);Kc(this.b);this.b.set(jb,Lc());bd(this.b.get(Na),this.b.get(W),this.b.get(Yb))},Jc=function(a,b){if("cookie"==P(a,ac)){hc=!1;var c;b:{var d=Ca(P(a,U));if(d&&!(1>d.length)){c=[];for(var e=0;e<d.length;e++){var g;g=d[e].split(".");var ca=g.shift();("GA1"==ca||"1"==ca)&&1<g.length?(ca=g.shift().split("-"),1==ca.length&&(ca[1]="1"),ca[0]*=1,ca[1]*=1,g={H:ca,s:g.join(".")}):g=void 0;g&&c.push(g)}if(1==c.length){J(13);c=c[0].s;break b}if(0==c.length)J(12);else{J(14);d=lc(P(a,
W)).split(".").length;c=Gc(c,d,0);if(1==c.length){c=c[0].s;break b}d=jc(P(a,Yb));c=Gc(c,d,1);c=c[0]&&c[0].s;break b}}c=void 0}c||(c=P(a,W),d=P(a,$b)||xa(),c=Xc("__utma",d,c),void 0!=c?(J(10),c=c.O[1]+"."+c.O[2]):c=void 0);c&&(a.data.set(Q,c),hc=!0)}c=a.get(cc);if(e=E(M.location[c?"href":"search"],"_ga"))a.get(bc)?(c=e.indexOf("."),-1==c?J(22):(d=e.substring(c+1),"1"!=e.substring(0,c)?J(22):(c=d.indexOf("."),-1==c?J(22):(e=d.substring(0,c),c=d.substring(c+1),e!=Ic(c,0)&&e!=Ic(c,-1)&&e!=Ic(c,-2)?J(23):
(J(11),a.data.set(Q,c)))))):J(21);b&&(J(9),a.data.set(Q,K(b)));if(!a.get(Q))if(c=(c=O.gaGlobal&&O.gaGlobal.vid)&&-1!=c.search(/^(?:utma\.)?\d+\.\d+$/)?c:void 0)J(17),a.data.set(Q,c);else{J(8);c=O.navigator.userAgent+(M.cookie?M.cookie:"")+(M.referrer?M.referrer:"");d=c.length;for(e=O.history.length;0<e;)c+=e--^d++;a.data.set(Q,[hd()^La(c)&2147483647,Math.round((new Date).getTime()/1E3)].join("."))}mc(a)},Kc=function(a){var b=O.navigator,c=O.screen,d=M.location;a.set(lb,ya(a.get(ec)));if(d){var e=
d.pathname||"";"/"!=e.charAt(0)&&(J(31),e="/"+e);a.set(kb,d.protocol+"//"+d.hostname+e+d.search)}c&&a.set(qb,c.width+"x"+c.height);c&&a.set(pb,c.colorDepth+"-bit");var c=M.documentElement,g=(e=M.body)&&e.clientWidth&&e.clientHeight,ca=[];c&&c.clientWidth&&c.clientHeight&&("CSS1Compat"===M.compatMode||!g)?ca=[c.clientWidth,c.clientHeight]:g&&(ca=[e.clientWidth,e.clientHeight]);c=0>=ca[0]||0>=ca[1]?"":ca.join("x");a.set(rb,c);a.set(tb,fc());a.set(ob,M.characterSet||M.charset);a.set(sb,b&&"function"===
typeof b.javaEnabled&&b.javaEnabled()||!1);a.set(nb,(b&&(b.language||b.browserLanguage)||"").toLowerCase());if(d&&a.get(cc)&&(b=M.location.hash)){b=b.split(/[?&#]+/);d=[];for(c=0;c<b.length;++c)(D(b[c],"utm_id")||D(b[c],"utm_campaign")||D(b[c],"utm_source")||D(b[c],"utm_medium")||D(b[c],"utm_term")||D(b[c],"utm_content")||D(b[c],"gclid")||D(b[c],"dclid")||D(b[c],"gclsrc"))&&d.push(b[c]);0<d.length&&(b="#"+d.join("&"),a.set(kb,a.get(kb)+b))}};pc.prototype.get=function(a){return this.b.get(a)};
pc.prototype.set=function(a,b){this.b.set(a,b)};var qc={pageview:[mb],event:[ub,xb,yb,zb],social:[Bb,Cb,Db],timing:[Mb,Nb,Pb,Ob]};pc.prototype.send=function(a){if(!(1>arguments.length)){var b,c;"string"===typeof arguments[0]?(b=arguments[0],c=[].slice.call(arguments,1)):(b=arguments[0]&&arguments[0][Va],c=arguments);b&&(c=za(qc[b]||[],c),c[Va]=b,this.b.set(c,void 0,!0),this.filters.D(this.b),this.b.data.m={})}};
pc.prototype.ma=function(a,b){var c=this;u(a,c,b)||(v(a,function(){u(a,c,b)}),y(String(c.get(V)),a,void 0,b,!0))};var rc=function(a){if("prerender"==M.visibilityState)return!1;a();return!0},z=function(a){if(!rc(a)){J(16);var b=!1,c=function(){if(!b&&rc(a)){b=!0;var d=c,e=M;e.removeEventListener?e.removeEventListener("visibilitychange",d,!1):e.detachEvent&&e.detachEvent("onvisibilitychange",d)}};L(M,"visibilitychange",c)}};var td=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,sc=function(a){if(ea(a[0]))this.u=a[0];else{var b=td.exec(a[0]);null!=b&&4==b.length&&(this.c=b[1]||"t0",this.K=b[2]||"",this.C=b[3],this.a=[].slice.call(a,1),this.K||(this.A="create"==this.C,this.i="require"==this.C,this.g="provide"==this.C,this.ba="remove"==this.C),this.i&&(3<=this.a.length?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(qa(this.a[1])?this.X=this.a[1]:this.W=this.a[1])));b=a[1];a=a[2];if(!this.C)throw"abort";if(this.i&&(!qa(b)||""==b))throw"abort";
if(this.g&&(!qa(b)||""==b||!ea(a)))throw"abort";if(ud(this.c)||ud(this.K))throw"abort";if(this.g&&"t0"!=this.c)throw"abort";}};function ud(a){return 0<=a.indexOf(".")||0<=a.indexOf(":")};var Yd,Zd,$d,A;Yd=new ee;$d=new ee;A=new ee;Zd={ec:45,ecommerce:46,linkid:47};
var u=function(a,b,c){b==N||b.get(V);var d=Yd.get(a);if(!ea(d))return!1;b.plugins_=b.plugins_||new ee;if(b.plugins_.get(a))return!0;b.plugins_.set(a,new d(b,c||{}));return!0},y=function(a,b,c,d,e){if(!ea(Yd.get(b))&&!$d.get(b)){Zd.hasOwnProperty(b)&&J(Zd[b]);if(p.test(b)){J(52);a=N.j(a);if(!a)return!0;c=d||{};d={id:b,B:c.dataLayer||"dataLayer",ia:!!a.get("anonymizeIp"),na:e,G:!1};a.get("&gtm")==b&&(d.G=!0);var g=String(a.get("name"));"t0"!=g&&(d.target=g);G(String(a.get("trackingId")))||(d.ja=String(a.get(Q)),
d.ka=Number(a.get(n)),a=c.palindrome?r:q,a=(a=M.cookie.replace(/^|(; +)/g,";").match(a))?a.sort().join("").substring(1):void 0,d.la=a);a=d.B;c=(new Date).getTime();O[a]=O[a]||[];c={"gtm.start":c};e||(c.event="gtm.js");O[a].push(c);c=t(d)}!c&&Zd.hasOwnProperty(b)?(J(39),c=b+".js"):J(43);c&&(c&&0<=c.indexOf("/")||(c=(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+c),d=ae(c),a=d.protocol,c=M.location.protocol,("https:"==a||a==c||("http:"!=a?0:"http:"==c))&&B(d)&&(wa(d.url,void 0,
e),$d.set(b,!0)))}},v=function(a,b){var c=A.get(a)||[];c.push(b);A.set(a,c)},C=function(a,b){Yd.set(a,b);for(var c=A.get(a)||[],d=0;d<c.length;d++)c[d]();A.set(a,[])},B=function(a){var b=ae(M.location.href);if(D(a.url,"https://www.google-analytics.com/gtm/js?id="))return!0;if(a.query||0<=a.url.indexOf("?")||0<=a.path.indexOf("://"))return!1;if(a.host==b.host&&a.port==b.port)return!0;b="http:"==a.protocol?80:443;return"www.google-analytics.com"==a.host&&(a.port||b)==b&&D(a.path,"/plugins/")?!0:!1},
ae=function(a){function b(a){var b=(a.hostname||"").split(":")[0].toLowerCase(),c=(a.protocol||"").toLowerCase(),c=1*a.port||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";D(a,"/")||(a="/"+a);return[b,""+c,a]}var c=M.createElement("a");c.href=M.location.href;var d=(c.protocol||"").toLowerCase(),e=b(c),g=c.search||"",ca=d+"//"+e[0]+(e[1]?":"+e[1]:"");D(a,"//")?a=d+a:D(a,"/")?a=ca+a:!a||D(a,"?")?a=ca+e[2]+(a||g):0>a.split("/")[0].indexOf(":")&&(a=ca+e[2].substring(0,e[2].lastIndexOf("/"))+"/"+
a);c.href=a;d=b(c);return{protocol:(c.protocol||"").toLowerCase(),host:d[0],port:d[1],path:d[2],query:c.search||"",url:a||""}};var Z={ga:function(){Z.f=[]}};Z.ga();Z.D=function(a){var b=Z.J.apply(Z,arguments),b=Z.f.concat(b);for(Z.f=[];0<b.length&&!Z.v(b[0])&&!(b.shift(),0<Z.f.length););Z.f=Z.f.concat(b)};Z.J=function(a){for(var b=[],c=0;c<arguments.length;c++)try{var d=new sc(arguments[c]);d.g?C(d.a[0],d.a[1]):(d.i&&(d.ha=y(d.c,d.a[0],d.X,d.W)),b.push(d))}catch(e){}return b};
Z.v=function(a){try{if(a.u)a.u.call(O,N.j("t0"));else{var b=a.c==gb?N:N.j(a.c);if(a.A)"t0"!=a.c||N.create.apply(N,a.a);else if(a.ba)N.remove(a.c);else if(b)if(a.i){if(a.ha&&(a.ha=y(a.c,a.a[0],a.X,a.W)),!u(a.a[0],b,a.W))return!0}else if(a.K){var c=a.C,d=a.a,e=b.plugins_.get(a.K);e[c].apply(e,d)}else b[a.C].apply(b,a.a)}}catch(g){}};var N=function(a){J(1);Z.D.apply(Z,[arguments])};N.h={};N.P=[];N.L=0;N.answer=42;var uc=[Na,W,V];N.create=function(a){var b=za(uc,[].slice.call(arguments));b[V]||(b[V]="t0");var c=""+b[V];if(N.h[c])return N.h[c];b=new pc(b);N.h[c]=b;N.P.push(b);return b};N.remove=function(a){for(var b=0;b<N.P.length;b++)if(N.P[b].get(V)==a){N.P.splice(b,1);N.h[a]=null;break}};N.j=function(a){return N.h[a]};N.getAll=function(){return N.P.slice(0)};
N.N=function(){"ga"!=gb&&J(49);var a=O[gb];if(!a||42!=a.answer){N.L=a&&a.l;N.loaded=!0;var b=O[gb]=N;X("create",b,b.create);X("remove",b,b.remove);X("getByName",b,b.j,5);X("getAll",b,b.getAll,6);b=pc.prototype;X("get",b,b.get,7);X("set",b,b.set,4);X("send",b,b.send);X("requireSync",b,b.ma);b=Ya.prototype;X("get",b,b.get);X("set",b,b.set);if(!Ud()&&!Ba){a:{for(var b=M.getElementsByTagName("script"),c=0;c<b.length&&100>c;c++){var d=b[c].src;if(d&&0==d.indexOf("https://www.google-analytics.com/analytics")){J(33);
b=!0;break a}}b=!1}b&&(Ba=!0)}Ud()||Ba||!Ed(new Od(1E4))||(J(36),Ba=!0);(O.gaplugins=O.gaplugins||{}).Linker=Dc;b=Dc.prototype;C("linker",Dc);X("decorate",b,b.ca,20);X("autoLink",b,b.S,25);C("displayfeatures",fd);C("adfeatures",fd);a=a&&a.q;ka(a)?Z.D.apply(N,a):J(50)}};N.da=function(){for(var a=N.getAll(),b=0;b<a.length;b++)a[b].get(V)};var H=N.N,I=O[gb];I&&I.r?H():z(H);z(function(){Z.D(["provide","render",ua])});function La(a){var b=1,c,d;if(a)for(b=0,d=a.length-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b;return b};})(window);
// Copyright 2012 Google Inc. All rights reserved.
// Container Version: 278
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){


var __awct;(function(){var a=!1,b=[],c=function(a){var b=n("google_trackConversion"),c=a.gtm_onFailure;"function"==typeof b?b(a)||c():c()},d=function(){for(;0<b.length;)c(b.shift())};(function(a){__awct=a;__awct.a="awct";__awct.b=["google"];__awct.isVendorTemplate=!0})(function(e){var f={google_conversion_domain:"",google_conversion_id:e["47"],google_conversion_label:e["48"],google_conversion_value:e["49"]||0,google_remarketing_only:!1,
onload_callback:e["55"],gtm_onFailure:e["56"]};e["50"]&&(f.google_conversion_currency=e["50"]);e[""]&&(f.google_conversion_order_id=e[""]);b.push(f);a||(a=!0,ea("//www.googleadservices.com/pagead/conversion_async.js",function(){d();b={push:c}},function(){d();a=!1}))})})();

var __c;__c=function(a){return a["54"]};__c.a="c";__c.b=["google"];__c.isVendorTemplate=!0;



var __cegg;(function(){var a={};(function(a){__cegg=a;__cegg.a="cegg";__cegg.b=["nonGoogleScripts"];__cegg.isVendorTemplate=!0})(function(b){try{var c=b["53"];if(c)if(a.hasOwnProperty(c)&&!0===a[c])b["55"]();else{b[""]&&(w.CE_SNAPSHOT_NAME=b[""]);for(var d=c.toString();8>d.length;)d="0"+d;var e=d.replace(/(\d+)(\d{4})$/,"/pages/scripts/$1/$2.js");ea("//dnn506yrbagrg.cloudfront.net"+e+"?"+Math.floor((new Date).getTime()/
36E5),b["55"],b["56"]);a[c]=!0}else x(b["56"])}catch(f){x(b["56"])}})})();
var __pa;__pa=function(a){try{var b=n("_pa",{},!0);if(b.fired)a["55"]();else{a[""]&&(b.orderId=a[""]);a[""]&&(b.revenue=a[""]);a[""]&&(b.productId=a[""]);var c=ba(w.location.href).protocol;"https:"!=c&&(c="http:");r(c+"//tag.marinsm.com/serve/"+a["51"]+".js",a["55"],a["56"])}}catch(d){x(a["56"])}};
__pa.a="pa";__pa.b=["nonGoogleScripts"];__pa.isVendorTemplate=!0;

var Va=this;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Wa=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Xa=function(a){if(null==a)return String(a);var b=Wa.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Za=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Ga=function(a){if(!a||"object"!=Xa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Za(a,"constructor")&&!Za(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Za(a,b)},$a=function(a,b){var c=b||("array"==Xa(a)?[]:{}),d;for(d in a)if(Za(a,d)){var e=a[d];"array"==Xa(e)?("array"!=Xa(c[d])&&(c[d]=[]),c[d]=$a(e,c[d])):Ga(e)?(Ga(c[d])||(c[d]={}),c[d]=$a(e,c[d])):c[d]=e}return c};var La=null,ab=Math.random(),bb=null,cb=null,Sa=!1,db={},eb={},Ta={};var fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,S,sb,ub,vb,wb,xb,yb,zb,Ab,Bb,Cb,Db,Eb,Fb,Gb,Hb,Ib,Jb,Lb,Mb,Nb,Ob,Qb,Rb,Sb,Tb,Ub,Vb,Wb,Xb,Yb,Zb,$b,ac,bc,cc,dc,ec,fc,gc,hc,ic,jc,kc,lc,mc,nc,oc,pc,qc,rc,sc,tc,uc,wc,xc,yc,zc,Ac,Bc,Cc,Dc,Ec,Fc,Gc,Hc,Ic,Jc,Kc,Lc,Mc,Nc,Oc,Pc,Qc,Rc,Sc,Tc,Uc,Vc,Wc,Xc,Yc,Zc,$c,U,ad,bd,cd,dd,ed,fd,gd,hd,id,jd,kd,ld,od,pd,qd,rd,sd,vd,wd,xd,yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Yd,Zd,$d,ae,be,ce,de,ee,fe,ge,he,ie,je,ke,le,me,ne,oe,pe,qe,re,se,te,
ue,ve,we,xe,ye,ze,Ae,Be,Ce,De,Ee,Fe,Ge,He,Ie,Je,Ke,Le,Me,Ne,Oe,Pe,Qe,Re,Se,Te,Ue,Ve,We,Xe,Ye,Ze,$e,af,bf,cf,df,ef,ff,gf,hf,jf;
(function(){var a=function(a){return{toString:function(){return a}}};fb=a("");gb=a("0");hb="";ib=a("");jb=a("");kb=a("");lb=a("");mb=a("");nb=a("");ob=a("");pb=a("");qb=a("3");S=a("4");sb=a("");ub=a("");vb=a("");
wb=a("5");xb=a("6");yb=a("");zb=a("");Ab=a("");Bb=a("");Cb=a("");Db=a("");Eb=a("");Fb=a("");Gb=a("");Hb=a("");Ib=a("");Jb=a("");
Lb=a("");Mb=a("");Nb=a("");Ob=a("");Qb=a("");Rb=a("");Sb=a("7");Tb=a("");Ub=a("");Vb=a("");Wb=a("");Xb=a("");Yb=a("");Zb=a("");$b=a("");ac=a("");bc=a("");
cc=a("");dc=a("");ec=a("");fc=a("");gc=a("8");hc=a("");ic=a("9");jc=a("");kc=a("10");lc=a("11");mc=a("");nc=a("12");oc=a("");pc=a("");qc=a("13");rc=a("");sc=a("");
tc=a("");uc=a("14");wc=a("");xc=a("15");yc=a("");zc=a("16");Ac=a("");Bc=a("");Cc=a("");Dc=a("");Ec=a("");Fc=a("");Gc=a("17");Hc=a("");Ic=a("");Jc=a("18");
Kc=a("19");Lc=a("20");Mc=a("21");Nc=a("");Oc=a("");Pc=a("");Qc=a("");Rc=a("22");Sc=a("");Tc=a("");Uc=a("23");Vc=a("");Wc=a("55");Xc=a("56");Yc=a("");Zc=a("");$c=a("24");
U=a("25");ad=a("26");bd=a("");cd=a("");dd=a("27");ed=a("28");fd=a("");gd=a("");hd=a("29");id=a("");jd=a("");kd=a("");ld=a("");od=a("");pd=a("");qd=a("");rd=a("30");sd=a("");vd=a("");wd=
a("");xd=a("");yd=a("");zd=a("31");Ad=a("");Bd=a("");Cd=a("");Dd=a("");Ed=a("32");Fd=a("");Gd=a("");Hd=a("");Id=a("");Jd=a("33");Kd=a("");Ld=a("35");Md=a("");Nd=a("");Od=a("");Pd=a("");
Qd=a("");Rd=a("");Sd=a("");Td=a("");Ud=a("");Vd=a("");Wd=a("");Xd=a("");Yd=a("");Zd=a("");$d=a("");ae=a("");be=a("");ce=a("");de=a("36");ee=a("");fe=a("");ge=a("");he=a("");
ie=a("");je=a("");ke=a("");le=a("");me=a("");ne=a("");oe=a("");pe=a("");qe=a("");re=a("");se=a("37");te=a("38");ue=a("39");ve=a("");we=a("40");xe=
a("");ye=a("");ze=a("");Ae=a("");Be=a("");Ce=a("");De=a("");Ee=a("");Fe=a("");Ge=a("");He=a("");Ie=a("");Je=a("");Ke=a("");Le=a("");Me=a("");Ne=a("41");
Oe=a("42");Pe=a("");Qe=a("");Re=a("");Se=a("");Te="";Ue=a("");Ve=a("");We=a("");Xe=a("43");Ye=a("");Ze=a("44");$e=a("");af=a("");bf=a("");cf=a("");df=a("");ef=
a("45");ff=a("");gf=a("");hf=a("");jf=a("")})();var kf=function(){},O=function(a){return"function"==typeof a},xa=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},lf=function(a){return"number"==Xa(a)&&!isNaN(a)},mf=function(a){return/^[0-9]+$/.test(a)},nf=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},of=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},K=function(a){return Math.round(Number(a))||0},Da=function(a){return"false"==
String(a).toLowerCase()?!1:!!a},pf=function(a){var b=[];if(xa(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},H=function(){return new Date},qf=function(a,b){if(!lf(a)||!lf(b)||a>b)a=0,b=2147483647;return Math.round(Math.random()*(b-a)+a)},rf=function(){this.prefix="gtm.";this.values={}};rf.prototype.set=function(a,b){this.values[this.prefix+a]=b};rf.prototype.get=function(a){return this.values[this.prefix+a]};rf.prototype.contains=function(a){return void 0!==this.get(a)};
var sf=function(a,b,c){try{if(!a[yd])return a[Uc](a,b||kf,c||kf);c&&c()}catch(d){}return!1},tf=function(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b).push(c)}for(var d=of(b).split("&"),e=0;e<d.length;e++)if(d[e]){var f=d[e].indexOf("=");0>f?c(d[e],"1"):c(d[e].substring(0,f),d[e].substring(f+1))}},uf=function(a){var b=a?a.length:0;return 0<b?a[b-1]:""},Bf=function(a){return function(){return a("GTM-JD26")}},Cf=function(a){for(var b=0;b<a.length;b++)a[b]()},Df=H().getTime(),Fa=function(){return"gtm"+
Df++},Ha=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ef=function(a){return null!==a&&void 0!==a&&void 0!==a.length},Ff=function(a,b){0==b?a.Wa=!0:a.complete=!0;var c=a.g;a.s&&(a.s.Ha[c]=b);db[c]&&(db[c].state=b)},Gf=function(a,b){a.sort(function(a,d){return b(a,d)?-1:b(d,a)?1:0})};var w=window,J=document,Jf=navigator,Q=function(a,b){var c=w[a];w[a]=void 0===c?b:c;return w[a]},I=function(a,b,c,d){return(d||"http:"!=w.location.protocol?a:b)+c},Kf=function(a){var b=J.getElementsByTagName("script")[0]||J.body||J.head;b.parentNode.insertBefore(a,b)},Ka=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},r=function(a,b,c){var d=J.createElement("script");d.type="text/javascript";d.async=
!0;d.src=a;Ka(d,b);c&&(d.onerror=c);Kf(d);return d},ga=function(a,b){var c=J.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";Kf(c);Ka(c,b);void 0!==a&&(c.src=a);return c},G=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a},L=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},x=function(a){w.setTimeout(a,0)},Na=!1,
Oa=[],Lf=function(a){if(!Na){var b=J.createEventObject,c="complete"==J.readyState,d="interactive"==J.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Na=!0;for(var e=0;e<Oa.length;e++)Oa[e]()}Oa.push=function(){for(var a=0;a<arguments.length;a++)x(arguments[a]);return 0}}},Mf=0,Nf=function(){if(!Na&&140>Mf){Mf++;try{J.documentElement.doScroll("left"),Lf()}catch(a){w.setTimeout(Nf,50)}}},za=function(a){var b=J.getElementById(a);if(b&&sa(b,"id")!=a)for(var c=1;c<document.all[a].length;c++)if(sa(document.all[a][c],
"id")==a)return document.all[a][c];return b},sa=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},va=function(a){return a.target||a.srcElement||{}},Ra=function(a){var b=J.createElement("div");b.innerHTML="A<div>"+a+"</div>";for(var b=b.lastChild,c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},wa=function(a,b){for(var c={},d=0;d<b.length;d++)c[b[d]]=!0;for(var e=a,d=0;e&&!c[String(e.tagName).toLowerCase()]&&100>d;d++)e=e.parentElement;e&&!c[String(e.tagName).toLowerCase()]&&
(e=null);return e},Of=!1,Pf=[],Qf=function(){if(!Of){Of=!0;for(var a=0;a<Pf.length;a++)Pf[a]()}},Rf=function(a){a=a||w;var b=a.location.href,c=b.indexOf("#");return 0>c?"":b.substring(c+1)},Pa=function(a){window.console&&window.console.log&&window.console.log(a)};var aa=function(a,b,c,d,e){var f,g=(a.protocol.replace(":","")||w.location.protocol.replace(":","")).toLowerCase();switch(b){case "protocol":f=g;break;case "host":f=(a.hostname||w.location.hostname).split(":")[0].toLowerCase();if(c){var h=/^www\d*\./.exec(f);h&&h[0]&&(f=f.substr(h[0].length))}break;case "port":f=String(1*(a.hostname?a.port:w.location.port)||("http"==g?80:"https"==g?443:""));break;case "path":f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var k=f.split("/");0<=nf(d||[],k[k.length-
1])&&(k[k.length-1]="");f=k.join("/");break;case "query":f=a.search.replace("?","");if(e)a:{for(var l=f.split("&"),m=0;m<l.length;m++){var p=l[m].split("=");if(decodeURIComponent(p[0]).replace(/\+/g," ")==e){f=decodeURIComponent(p.slice(1).join("=")).replace(/\+/g," ");break a}}f=void 0}break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},Sf=function(a){var b="";a&&a.href&&(b=a.hash?a.href.replace(a.hash,""):a.href);return b},ba=function(a){var b=J.createElement("a");
a&&(b.href=a);return b};var ia=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var fa=function(a){var b=["veinteractive.com","ve-interactive.cn"];if(!a)return!1;var c=aa(ba(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1},Ca=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null};var Tf=new rf,Uf={},Wf={set:function(a,b){$a(Vf(a,b),Uf)},get:function(a){return P(a,2)},reset:function(){Tf=new rf;Uf={}}},P=function(a,b){if(2==b){for(var c=Uf,d=a.split("."),e=0;e<d.length;e++){if(void 0===c[d[e]])return;c=c[d[e]]}return c}return Tf.get(a)},Vf=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c};var Xf=Math.random(),Yf="0.100000">Xf;var Zf=function(a,b){Yf&&G("//www.googletagmanager.com/a?id=GTM-JD26&cv=278&v=t&n="+a+(void 0!==b?"&s="+encodeURIComponent(b):"")+"&l="+(H().getTime()-K(bb))+"&sr=0.100000&ps="+Xf+"&cb="+qf());},$f=kf;var ag=kf,bg=[],cg=!1,ca=function(a){return w["dataLayer"].push(a)},dg=function(a){var b=!1;return function(){!b&&O(a)&&x(Bf(a));b=!0}},jg=function(){for(var a=!1;!cg&&0<bg.length;){cg=!0;var b=bg.shift();if(O(b))try{b.call(Wf)}catch(ya){}else if(xa(b))a:{var c=b;if("string"==Xa(c[0])){for(var d=c[0].split("."),e=d.pop(),f=c.slice(1),g=Uf,h=0;h<d.length;h++){if(void 0===g[d[h]])break a;g=g[d[h]]}try{g[e].apply(g,f)}catch(ya){}}}else{var k=b,l=void 0;for(l in k)if(k.hasOwnProperty(l)){var m=l,
p=k[l];Tf.set(m,p);$a(Vf(m,p),Uf)}var q=!1,t=k.event,y=void 0;if(t){y=Df++;cb=t;if(!k["gtm.uniqueEventId"]){var u=y;Tf.set("gtm.uniqueEventId",u);$a(Vf("gtm.uniqueEventId",u),Uf)}var z=dg(k.eventCallback),E=k.eventTimeout;E&&w.setTimeout(z,Number(E));q=ag(y,t,z,k.eventReporter)}bb||(bb=k["gtm.start"])&&$f();var D=k,C=y,A=t,M=Uf;if(!q){var F=y,N=t;
}cb=null;a=q||a}var T=b,R=Uf;ig();cg=!1}return!a},kg=function(){var a=jg();try{var b=w["dataLayer"].hide;if(b&&void 0!==b["GTM-JD26"]&&b.end){b["GTM-JD26"]=!1;var c=!0,d;for(d in b)if(!0===b[d]){c=!1;break}c&&(b.end(),
b.end=null)}}catch(e){}return a};var ua=function(a,b,c){L(a,b,c,void 0)},ea=function(a,b,c){r(a,b,c)},Ua=function(a,b){w[a]=b},n=function(a,b,c){var d=w;b&&(void 0===d[a]||c&&!d[a])&&(d[a]=b);return d[a]},v=function(a,b,c){return("https:"==w.location.protocol?a:b)+c};var lg=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),mg={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},ng={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels",
"customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},og=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},pg=function(){var a=P("gtm.whitelist");
var b=a&&og(pf(a),mg),c=P("gtm.blacklist")||P("tagTypeBlacklist")||[];lg.test(w.location&&w.location.hostname)&&(c=pf(c),c.push("nonGooglePixels","nonGoogleScripts"));var d=c&&og(pf(c),ng),e={};return function(f){var g=f&&f[Uc];if(!g)return!0;if(void 0!==e[g.a])return e[g.a];var h=!0;if(a)a:{if(0>nf(b,g.a))if(g.b&&0<g.b.length)for(var k=0;k<g.b.length;k++){if(0>nf(b,
g.b[k])){h=!1;break a}}else{h=!1;break a}h=!0}var l=!1;if(c){var m;if(!(m=0<=nf(d,g.a)))a:{for(var p=g.b||[],q=new rf,t=0;t<d.length;t++)q.set(d[t],!0);for(t=0;t<p.length;t++)if(q.get(p[t])){m=!0;break a}m=!1}l=m}return e[g.a]=!h||l}};var _jsm=function(a){if(void 0!==a[hd])try{var b=w.google_tag_manager;return b&&b.e&&b.e(a[hd])}catch(c){}};_jsm.a="jsm";_jsm.b=["customScripts"];var _c=function(a){return a[ef]};_c.a="c";_c.b=["google"];var _k=function(a){for(var b=String(P("gtm.cookie")||J.cookie).split(";"),c=0;c<b.length;c++){var d=b[c].split("="),e=of(d[0]);if(e&&e==a[Ed]){var f=of(d.slice(1).join("="));return f&&a[lc]?decodeURIComponent(f):f}}};_k.a="k";_k.b=[];var Hf=function(a){var b=J;return qg?b.querySelectorAll(a):null},rg=!1;if(J.querySelectorAll)try{var sg=J.querySelectorAll(":root");sg&&1==sg.length&&sg[0]==J.documentElement&&(rg=!0)}catch(a){}var qg=rg;var tg=void 0,ug="",vg=0,wg=void 0,_et=function(a){var b,c=P("gtm.element"),d=P("event"),e=Number(H());if(tg===c&&ug===d&&vg>e-250)b=wg;else{var f;if(c){var g=c.innerText||c.textContent||"";g&&" "!=g&&(g=g.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));g&&(g=g.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));f=g}else f="";wg=b=f;tg=c;ug=d}vg=e;return b?b:a[qc]};_et.a="et";_et.b=["google"];var _eu=function(a){var b=String(P("gtm.elementUrl")||a[qc]||""),c=ba(b);return b};_eu.a="eu";_eu.b=["google"];var _e=function(){return cb};_e.a="e";_e.b=["google"];var xg=/(^|\.)doubleclick\.net$/i,yg=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ea=function(a){for(var b=String(J.cookie).split(";"),c=[],d=0;d<b.length;d++){var e=b[d].split("="),f=of(e[0]);if(f&&f==a){var g=of(e.slice(1).join("="));g&&(g=decodeURIComponent(g));c.push(g)}}return c},zg=function(a,b,c,d,e){if(xg.test(J.location.hostname)||"/"==c&&yg.test(d))return!1;var f=a+"="+b+"; ";c&&(f+="path="+c+"; ");e&&(f+="expires="+e.toGMTString()+"; ");d&&(f+="domain="+d+";");var g=J.cookie;J.cookie=f;return g!=
J.cookie||0<=nf(Ea(a),b)},Ag=function(a){if("none"==a)return 0;0==a.indexOf(".")&&(a=a.substr(1));return a.split(".").length},Bg=function(a){var b=a;b?(1<b.length&&b.lastIndexOf("/")==b.length-1&&(b=b.substr(0,b.length-1)),0!=b.indexOf("/")&&(b="/"+b),a=b):a="/";return"/"==a?1:a.split("/").length},Cg=function(){var a=aa(w.location,"host",!0).split(".");if(4==a.length&&/^[0-9]*$/.exec(a[3]))return["none"];for(var b=[],c=a.length-2;0<=c;c--)b.push(a.slice(c).join("."));b.push("none");return b};var Dg=function(a,b){this.f=a;this.j=b};Dg.prototype.toString=function(){var a=""+this.f;1<this.j&&(a=a+"-"+this.j);return a};var Eg=function(a,b){this.Fa=a;this.ka=b};Eg.prototype.toString=function(){return""+this.ka+"."+this.Fa};var Hg=function(a,b){var c=new Fg(null,a,b);Gg(c);return c},Fg=function(a,b,c){this.Oa=Math.floor(H().getTime()/864E5);this.ja=b||"auto";this.aa=c||"/";var d=Ag(this.ja),e=Bg(this.aa);this.F=a||new Dg(d,e);this.h=[];this.C=new rf},Jg=function(a,b,c){b&&(""==c.Fa?Ig(a,b):(a.C.contains(b)||a.h.push(b),a.C.set(b,c)))},Kg=function(a,b){for(var c=0;c<b.length;c++)Jg(a,b[c][0],b[c][1])},Ig=function(a,b){var c=nf(a.h,b);0<=c&&a.h.splice(c,1);a.C.set(b,void 0)},Lg=function(a){for(var b=[],c=0;c<a.h.length;c++){var d=
a.h[c];b.push([d,a.C.get(d)])}return b},Mg=function(a){for(var b=0,c=0;c<a.h.length;c++)b=Math.max(b,a.C.get(a.h[c]).ka);return 864E5*b};Fg.prototype.toString=function(){if(0==this.h.length)return"";for(var a=[],b=0;b<this.h.length;b++){var c=this.h[b];a.push(""+c+"."+this.C.get(c).toString())}return"GAX1."+this.F.toString()+"."+a.join("!")};
var Ng=function(a,b){for(var c=new Date,d=Bg(a.aa),e=[],f=0;f<a.h.length;f++){var g=a.h[f];a.C.get(g).ka<a.Oa&&e.push(g)}for(f=0;f<e.length;f++)Ig(a,e[f]);if(a.h.length>(b||10))return!1;c.setTime(Mg(a));if("auto"!=a.ja)return zg("_gaexp",a.toString(),a.aa,a.ja,c);for(var h=Cg(),k=0;k<h.length;k++)if("none"!=h[k]&&(a.F=new Dg(Ag(h[k]),d),zg("_gaexp",a.toString(),a.aa,h[k],c)))return!0;return!1},Gg=function(a){for(var b=a.F.f,c=a.F.j,d=Ea("_gaexp"),e=[],f=0;f<d.length;f++){var g=Og(a,d[f]);g&&e.push(g)}Gf(e,
function(a,d){var e=a.F,f=d.F;return e.f==f.f&&e.j==f.j?!1:e.f==b&&e.j==c?!0:f.f==b&&f.j==c?!1:e.f==b?f.f!=b||e.j<f.j:f.f==b?!1:e.j==c?f.f!=b&&(f.j!=c||e.f<f.f):f.j==c?!1:e.f<f.f||e.f==f.f&&e.j<f.j});a.F=0<e.length?e[0].F:new Dg(b,c);for(f=e.length-1;0<=f;f--)Kg(a,Lg(e[f]))},Og=function(a,b){var c=b.match(/GAX1\.([^.]+).(.*)/);if(c){var d;a:{var e=(c[1]||"").split("-");if(!(0==e.length||2<e.length)){var f=of(e[0]);if(0!=f.length){var g=2==e.length?of(e[1]):"1";if(mf(f)&&mf(g)){d=new Dg(K(f),K(g));
break a}}}d=void 0}if(d){for(var h=new Fg(d,a.ja,a.aa),k=(c[2]||"").split("!"),l=0;l<k.length;l++){var m=k[l].split(".");if(3==m.length){if(!mf(m[1]))return;Jg(h,m[0],new Eg(m[2],K(m[1])))}}return h}}};var _hid=function(){return Pg};_hid.a="hid";_hid.b=["google"];var _j=function(a){for(var b=String(a[Ed]).split("."),c=w,d=0;d<b.length;d++)c=c&&c[b[d]];return c};_j.a="j";_j.b=["google"];var _v=function(a){var b=P(a[Ed].replace(/\\\./g,"."),a[ic]);return void 0!==b?b:a[qc]};_v.a="v";_v.b=["google"];var _r=function(a){return qf(a[Cd],a[Ad])};_r.a="r";_r.b=["google"];var _f=function(a){var b=String(P("gtm.referrer")||J.referrer);if(!b)return b;var c=ba(b);return b};_f.a="f";_f.b=["google"];var _smm=function(a){var b=a[dd],c=a[zd]||{};return c.hasOwnProperty(b)?c[b]:a[qc]};_smm.a="smm";_smm.b=["google"];var Ba=function(a){var b=w.location,c;(c=a[fc]?a[fc]:P("gtm.url"))&&(b=ba(String(c)));var d=b.href,e=d.indexOf("#"),f=0>e?d:d.substr(0,e);a[Sb]&&(f=aa(b,a[Sb],a[qe],a[pc],a[de]));return f},_u=Ba;_u.a="u";_u.b=["google"];var _cn=function(a){return 0<=String(a[qb]).indexOf(String(a[S]))};_cn.a="cn";_cn.b=["google"];var _eq=function(a){return String(a[qb])==String(a[S])};_eq.a="eq";_eq.b=["google"];var _gt=function(a){return Number(a[qb])>Number(a[S])};_gt.a="gt";_gt.b=["google"];var _re=function(a){return(new RegExp(a[S],a[ad]?"i":void 0)).test(a[qb])};_re.a="re";_re.b=["google"];var _sw=function(a){return 0==String(a[qb]).indexOf(String(a[S]))};_sw.a="sw";_sw.b=["google"];var Pg=new String("undefined"),bh=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===Pg?b:a[d]);return c.join("")}};bh.prototype.toString=function(){return this.resolve("undefined")};bh.prototype.valueOf=bh.prototype.toString;var ch={},dh=function(a,b){var c=Df++;ch[c]=[a,b];return c},eh=function(a){var b=a?0:1;return function(a){var c=ch[a];if(c&&O(c[b]))c[b]();ch[a]=void 0}};var fh=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},gh=function(a,b){return a<b?-1:a>b?1:0};var hh;a:{var ih=Va.navigator;if(ih){var jh=ih.userAgent;if(jh){hh=jh;break a}}hh=""}var W=function(a){return-1!=hh.indexOf(a)};var kh=function(){W("iPod")},lh=function(){return W("iPhone")&&!W("iPod")&&!W("iPad")};var mh=function(a){mh[" "](a);return a};mh[" "]=function(){};var oh=function(a,b){var c=nh;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var ph=W("Opera"),qh=W("Trident")||W("MSIE"),rh=W("Edge"),sh;if(sh=W("Gecko"))sh=!(-1!=hh.toLowerCase().indexOf("webkit")&&!W("Edge"));var th=sh&&!(W("Trident")||W("MSIE"))&&!W("Edge"),uh=-1!=hh.toLowerCase().indexOf("webkit")&&!W("Edge");uh&&W("Mobile");W("Macintosh");W("Windows");W("Linux")||W("CrOS");var vh=Va.navigator||null;vh&&(vh.appVersion||"").indexOf("X11");W("Android");lh();W("iPad");kh();lh()||W("iPad")||kh();var wh=function(){var a=Va.document;return a?a.documentMode:void 0},xh;
a:{var yh="",zh=function(){var a=hh;if(th)return/rv\:([^\);]+)(\)|;)/.exec(a);if(rh)return/Edge\/([\d\.]+)/.exec(a);if(qh)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(uh)return/WebKit\/(\S+)/.exec(a);if(ph)return/(?:Version)[ \/]?(\S+)/.exec(a)}();zh&&(yh=zh?zh[1]:"");if(qh){var Ah=wh();if(null!=Ah&&Ah>parseFloat(yh)){xh=String(Ah);break a}}xh=yh}
var Bh=xh,nh={},Ch=function(a){return oh(a,function(){for(var b=0,c=fh(String(Bh)).split("."),d=fh(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{var k=/(\d*)(\D*)(.*)/.exec(g)||["","","",""],l=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==k[0].length&&0==l[0].length)break;b=gh(0==k[1].length?0:parseInt(k[1],10),0==l[1].length?0:parseInt(l[1],10))||gh(0==k[2].length,0==l[2].length)||gh(k[2],l[2]);g=k[3];h=l[3]}while(0==b)}return 0<=b})},Dh;
var Eh=Va.document;Dh=Eh&&qh?wh()||("CSS1Compat"==Eh.compatMode?parseInt(Bh,10):5):void 0;var Fh;if(!(Fh=!th&&!qh)){var Gh;if(Gh=qh)Gh=9<=Number(Dh);Fh=Gh}Fh||th&&Ch("1.9.1");qh&&Ch("9");var Qa=function(a,b){var c="";qh&&!Hh(a)&&(c='<script>document.domain="'+document.domain+'";\x3c/script>'+c);var d="<!DOCTYPE html><html><head><script>var inDapIF=true;\x3c/script>"+c+"</head><body>"+b+"</body></html>";if(Ih)a.srcdoc=d;else if(Jh){var e=a.contentWindow.document;e.open("text/html","replace");e.write(d);e.close()}else Kh(a,d)},Ih=uh&&"srcdoc"in document.createElement("iframe"),Jh=th||uh||qh&&Ch(11),Kh=function(a,b){qh&&Ch(7)&&!Ch(10)&&6>Lh()&&Mh(b)&&(b=Nh(b));var c=function(){a.contentWindow.goog_content=
b;a.contentWindow.location.replace("javascript:window.goog_content")};qh&&!Hh(a)?Oh(a,c):c()},Lh=function(){var a=navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);return a?parseFloat(a[1]):0},Hh=function(a){try{var b;var c=a.contentWindow;try{var d;if(d=!!c&&null!=c.location.href)b:{try{mh(c.foo);d=!0;break b}catch(e){}d=!1}b=d}catch(e){b=!1}return b}catch(e){return!1}},Ph=0,Oh=function(a,b){var c="goog_rendering_callback"+Ph++;window[c]=b;a.src="javascript:'<script>(function() {document.domain = \""+
document.domain+'";var continuation = window.parent.'+c+";window.parent."+c+" = null;continuation();})()\x3c/script>'"},Mh=function(a){for(var b=0;b<a.length;++b)if(127<a.charCodeAt(b))return!0;return!1},Nh=function(a){for(var b=unescape(encodeURIComponent(a)),c=Math.floor(b.length/2),d=[],e=0;e<c;++e)d[e]=String.fromCharCode(256*b.charCodeAt(2*e+1)+b.charCodeAt(2*e));1==b.length%2&&(d[c]=b.charAt(b.length-1));return d.join("")};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Rh=function(a,b,c,d){return function(){try{if(0<b.length){var e=b.shift(),f=Rh(a,b,c,d);if("SCRIPT"==String(e.nodeName).toUpperCase()&&"text/gtmscript"==e.type){var g=J.createElement("script");g.async=!1;g.type="text/javascript";g.id=e.id;g.text=e.text||e.textContent||e.innerHTML||"";e.charset&&(g.charset=e.charset);var h=e.getAttribute("data-gtmsrc");h&&(g.src=h,Ka(g,f));a.insertBefore(g,null);h||f()}else if(e.innerHTML&&0<=e.innerHTML.toLowerCase().indexOf("<script")){for(var k=[];e.firstChild;)k.push(e.removeChild(e.firstChild));
a.insertBefore(e,null);Rh(e,k,f,d)()}else a.insertBefore(e,null),f()}else c()}catch(l){x(d)}}};var Th=function(a,b,c){if(J.body){var d=
a[$c];d instanceof bh&&(d=d.resolve(dh(b,c)),b=kf);if(a[$e])try{Qa(ga(),"<script>var google_tag_manager=parent.google_tag_manager;\x3c/script>"+d),x(b)}catch(e){x(c)}else a[bf]?Sh(d,b,c):Rh(J.body,Ra(d),b,c)()}else w.setTimeout(function(){Th(a,b,c)},200)},_html=Th;_html.a="html";_html.b=["customScripts"];var _img=function(a,b,c){var d=Ra('<a href="'+a[Xe]+'"></a>')[0].href,e=a[wb];if(e)var f=d.charAt(d.length-1),g=0<=d.indexOf("?")?"?"==f||"&"==f?"":"&":"?",d=d+(g+e+"="+a[xb]);G(d,b,c)};_img.a="img";_img.b=["customPixels"];
var ei=function(a,b,c,d){var e=b+": "+c+(d?" !important":""),f=document;if(f.createStyleSheet){var g=bi(f),h=g.rules.length;g.addRule(a,e);return function(){g.removeRule?g.removeRule(h):g.deleteRule(h);g.addRule("x","-",h)}}var k=ci(a+"{"+e+"}",f);di(k,f);var l=k.parentNode;return function(){l.removeChild(k)}},fi=null,bi=function(a){if(fi)return fi;for(var b=a.styleSheets.length-1;0<=b;b--){var c=a.styleSheets[b],d=c.ownerNode;if(d&&d.parentNode&&"HEAD"==d.parentNode.tagName)return fi=c}0==a.styleSheets.length&&
a.createStyleSheet();return fi=a.styleSheets[0]},ci=function(a,b){var c=(b||document).createElement("style");void 0!==c.cssText?c.cssText=a:c.innerHTML=a;return c},di=function(a,b){var c=b||document,d=c.getElementsByTagName("head")[0];d||(d=c.createElement("head"),c.body.parentNode.insertBefore(d,c.body));d.appendChild(a)};var mi={},ni=void 0,oi=function(a){var b=mi[a];b||(b={id:a,v:[],W:0,Ia:null,za:void 0,Da:!1},mi[a]=b);ni=b},qi=function(a,b,c,d){var e=ni;if(!qg||!e)return!1;var f={id:e.id+":"+e.v.length,eb:b,U:[],Za:c,G:a,ua:0,sa:d||null,Na:0,V:!1};e.v.push(f);null===a?(f.V=!0,b(null)):pi(e);return!0},ri=function(a){var b=ei(a,"visibility","hidden",!0);return function(){O(b)&&b.apply();b=null}},si=function(a,b,c,d){var e=b;if(!Na){var f=ri(a.A);Oa.push(f);e=function(a,c){var d=b(a,c);f();return d}}return qi(a,e,
c,d)},pi=function(a){if(!a.Da){for(var b=a.W;b<a.v.length;b++){var c=a.v[b],d=b==a.W;if(!c.V&&!ti(d,c))break;c.V&&d&&a.W++}a.v.length>a.W?(a.Ia||(a.Ia=w.setTimeout(function(){a.Ia=null;pi(a)},80)),Na||a.za||(a.za=function(){x(function(){pi(a)})},L(J,"DOMContentLoaded",a.za))):ui(a)}},ui=function(a){for(var b=0;b<a.v.length;b++){var c=a.v[b];if(c.G)for(var d=Hf(c.G.A)||[],e=0;e<d.length;e++){var f=d[e];f.gtmProgressiveApplied&&f.gtmProgressiveApplied[c.id]||(vi(f,c.id),c.U.push(wi(f,c.id)))}}},ti=
function(a,b){var c=[];if(b.G){var d=xi(b.G,b.id),e=null;b.sa&&(e=xi(b.sa,b.id+"-t"));for(var f=0;f<d.length;f++){var g=d[f],h;if(null!=e&&(h=e.length>f?e[f]:null,!h&&!Na&&(null===b.sa.o||b.Na+c.length<b.sa.o)))break;c.push({element:g,Hb:h})}}if(!Na&&b.Za&&(!a||null==b.G.o||b.G.o!=b.ua+c.length))return!1;for(var k=0;k<c.length;k++){var l=c[k].element,m=c[k].Hb,p;b.ua++;vi(l,b.id);m&&(b.Na++,p=b.id+"-t",vi(m,p));var q=b.eb(l,m);O(q)&&b.U.push(q);b.U.push(wi(l,b.id));m&&p&&b.U.push(wi(m,p))}if(b.G.o&&
b.G.o==b.ua||Na)b.V=!0;return!0},vi=function(a,b){a.gtmProgressiveApplied||(a.gtmProgressiveApplied={});a.gtmProgressiveApplied[b]=!0},wi=function(a,b){return function(){a.gtmProgressiveApplied&&delete a.gtmProgressiveApplied[b]}},xi=function(a,b){for(var c=Hf(a.A)||[],d=[],e=0;e<c.length;e++){var f=c[e];if(!f.gtmProgressiveApplied||!f.gtmProgressiveApplied[b]){if(a.D&&!yi(f))break;d.push(f)}}return d},yi=function(a){if(Na)return!0;for(;a;){if(a.nextSibling)return!0;a=a.parentNode}return!1};var ja,zi,Ai,ra=/(Firefox\D28\D)/g.test(Jf.userAgent),Ci=function(a,b){return function(c){c=c||w.event;var d=va(c),e=!1;if(3!==c.which||"LINK_CLICK"!=a){"LINK_CLICK"==a&&(d=wa(d,["a","area"]),e=!d||!d.href||Bi(d.href)||2===c.which||null==c.which&&4==c.button||c.ctrlKey||c.shiftKey||c.altKey||!0===c.metaKey);var f="FORM_SUBMIT"==a?ja:Ai;if(c.defaultPrevented||!1===c.returnValue||c.X&&c.X()){if(d){var g={simulateDefault:!1},h=la(f,["wnc","nwnc"]);h&&na(a,d,g,f.wt,h)}}else{if(d){var g={},k,l=la(f,["wnc",
"nwnc","nwc","wc"]);(k=na(a,d,g,f.wt,l))||(oa(g.eventReport,f)?b=!0:e=!0);e=e||k||"LINK_CLICK"==a&&ra;g.simulateDefault=!k&&b&&!e;g.simulateDefault&&(e=ta(d,g)||e,!e&&c.preventDefault&&c.preventDefault());c.returnValue=k||!b||e;return c.returnValue}return!0}}}},na=function(a,b,c,d,e){var f=d||2E3,g={"gtm.element":b,"gtm.elementClasses":b.className,"gtm.elementId":b["for"]||sa(b,"id")||"","gtm.elementTarget":b.formTarget||b.target||""};switch(a){case "LINK_CLICK":g["gtm.triggers"]=e||"";g.event="gtm.linkClick";
g["gtm.elementUrl"]=b.href;g.eventTimeout=f;g.eventCallback=Di(b,c);g.eventReporter=function(a){c.eventReport=a};break;case "FORM_SUBMIT":g["gtm.triggers"]=e||"";g.event="gtm.formSubmit";g["gtm.elementUrl"]=Ei(b);g.eventTimeout=f;g.eventCallback=Fi(b,c);g.eventReporter=function(a){c.eventReport=a};break;case "CLICK":g.event="gtm.click";g["gtm.elementUrl"]=(b.attributes&&b.attributes.formaction?b.formAction:"")||b.action||b.href||b.src||b.code||b.codebase||"";break;default:return!0}return ca(g)},Ei=
function(a){var b=a.action;b&&b.tagName&&(b=a.cloneNode(!1).action);return b},qa=function(a){var b=a.target;if(!b)switch(String(a.tagName).toLowerCase()){case "a":case "area":case "form":b="_self"}return b},ta=function(a,b){var c=!1,d=/(iPad|iPhone|iPod)/g.test(Jf.userAgent),e=qa(a).toLowerCase();switch(e){case "":case "_self":case "_parent":case "_top":var f;f=(e||"_self").substring(1);b.targetWindow=w.frames&&w.frames[f]||w[f];break;case "_blank":d?(b.simulateDefault=!1,c=!0):(b.targetWindowName=
"gtm_autoEvent_"+H().getTime(),b.targetWindow=w.open("",b.targetWindowName));break;default:d&&!w.frames[e]?(b.simulateDefault=!1,c=!0):(w.frames[e]||(b.targetWindowName=e),b.targetWindow=w.frames[e]||w.open("",e))}return c},Di=function(a,b,c){return function(){b.simulateDefault&&(b.targetWindow?b.targetWindow.location.href=a.href:(c=c||H().getTime(),500>H().getTime()-c&&w.setTimeout(Di(a,b,c),25)))}},Fi=function(a,b,c){return function(){if(b.simulateDefault)if(b.targetWindow){var d;b.targetWindowName&&
(d=a.target,a.target=b.targetWindowName);J.gtmSubmitFormNow=!0;pa(a).call(a);b.targetWindowName&&(a.target=d)}else c=c||H().getTime(),500>H().getTime()-c&&w.setTimeout(Fi(a,b,c),25)}},la=function(a,b){for(var c=[],d=0;d<b.length;d++){var e=a[b[d]],f;for(f in e)e.hasOwnProperty(f)&&e[f]&&c.push(f)}return c.join(",")},Gi=function(a,b,c,d,e){var f=e;if(!f||"0"==f){if(a.l)return;a.l=!0;f="0"}var g=a.wt;b&&(!g||g>d)&&(a.wt=d);a[b?c?"wc":"wnc":c?"nwc":"nwnc"][f]=!0},oa=function(a,b){if(b.wnc["0"]||b.wc["0"])return!0;
for(var c=0;c<Hi.length;c++)if(a.passingRules[c]){var d=Ii[c],e=d&&d[0]&&d[0][0]||d[1]&&d[1][0];if(e&&"0"!=e&&(b.wc[e]||b.wnc[e]))for(var f=Hi[c][1],g=0;g<f.length;g++)if(a.resolvedTags[f[g]])return!0}return!1},Aa=function(a,b,c,d,e){var f,g,h=!1;switch(a){case "CLICK":if(J.gtmHasClickListenerTag)return;J.gtmHasClickListenerTag=!0;f="click";g=function(a){var b=va(a);b&&na("CLICK",b,{},d)};h=!0;break;case "LINK_CLICK":b&&!zi&&(zi=Sf(J.location));Gi(Ai,b||!1,c||!1,d,e);if(J.gtmHasLinkClickListenerTag)return;
J.gtmHasLinkClickListenerTag=!0;f="click";g=Ci(a,b||!1);break;case "FORM_SUBMIT":Gi(ja,b||!1,c||!1,d,e);if(J.gtmHasFormSubmitListenerTag)return;J.gtmHasFormSubmitListenerTag=!0;f="submit";g=Ci(a,b||!1);break;default:return}L(J,f,g,h)},Bi=function(a){if(!zi)return!0;var b=a.indexOf("#");if(0>b)return!1;if(0==b)return!0;var c=ba(a);return zi==Sf(c)},pa=function(a){try{if(a.constructor&&a.constructor.prototype)return a.constructor.prototype.submit}catch(b){}if(a.gtmReplacedFormSubmit)return a.gtmReplacedFormSubmit;
J.gtmFormElementSubmitter||(J.gtmFormElementSubmitter=J.createElement("form"));return J.gtmFormElementSubmitter.submit.call?J.gtmFormElementSubmitter.submit:a.submit};var _cl=function(a,b){Aa("CLICK");x(b)};_cl.a="cl";_cl.b=["google"];
var da=function(a,b){if(a.history&&a.history.pushState)Xi(a,b),Yi(a,b),Zi("pushState",a,b),Zi("replaceState",a,b);else{var c;var d=J.documentMode;if(d&&8>d)c=!1;else{var e=J.body,f="onhashchange"in e;f||(e.setAttribute("onhashchange","return;"),f="function"==typeof e.onhashchange);c=f}c?Xi(a,b):$i(a,b)}},Yi=function(a,b){L(a,"popstate",function(a){b({source:"popstate",state:a.state,u:Rf(a.target)})})},Zi=function(a,b,c){var d=b.history,e=d[a];if(O(e))try{d[a]=function(f,g,h){e.apply(d,[].slice.call(arguments,
0));c({source:a,state:f,u:Rf(b)})}}catch(f){}},Xi=function(a,b){L(a,"hashchange",function(a){b({source:"hashchange",state:null,u:Rf(a.target)})})},$i=function(a,b){var c=Rf(a);a.setInterval(function(){var d=Rf(a);c!==d&&(c=d,b({source:"polling",state:null,u:d}))},150)};
var aj=function(){var a={source:null,u:Rf(w),state:w.history.state||null};return function(b){var c=a,d={};d[c.source]=!0;d[b.source]=!0;if(!d.popstate||!d.hashchange||c.u!=b.u){var e={event:"gtm.historyChange","gtm.historyChangeSource":b.source,"gtm.oldUrlFragment":a.u,"gtm.newUrlFragment":b.u,"gtm.oldHistoryState":a.state,"gtm.newHistoryState":b.state};a=b;ca(e)}}},_hl=function(a,b){J.gtmHasHistoryListenerTag||(J.gtmHasHistoryListenerTag=!0,da(w,aj()));x(b)};_hl.a="hl";_hl.b=["google"];var Ia=function(a,b){var c=b||Va,d=c.onerror,e=!1;uh&&!Ch("535.3")&&(e=!e);c.onerror=function(b,c,h,k,l){d&&d(b,c,h,k,l);a({message:b,fileName:c,Sa:h,Xb:k,error:l});return e}};
var Y=[],cj={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},dj=function(a){return cj[a]},ej=/[\x00\x22\x26\x27\x3c\x3e]/g;var jj=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,tj={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b","\f":"\\f",
"\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},uj=function(a){return tj[a]};
Y[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(jj,uj)+"'"}};
var Cj=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,Dj={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10","\u0011":"%11","\u0012":"%12","\u0013":"%13",
"\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86","\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89",
"\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},Ej=function(a){return Dj[a]};Y[16]=function(a){return a};var Gj=345,Hj=[],Ij=[],Jj=[],Kj=new rf,Lj=[],Z=[],Hi=[],Ii=[],Mj=function(){this.L=[]};Mj.prototype.set=function(a,b){this.L.push([a,b]);return this};Mj.prototype.resolve=function(a,b){for(var c={},d=0;d<this.L.length;d++){var e=Nj(this.L[d][0],a,b),f=Nj(this.L[d][1],a,b);c[e]=f}return c};var Oj=function(a){this.index=a};Oj.prototype.resolve=function(a,b){var c=Jj[this.index];if(c&&!b(c)){var d=c[ed];if(a){if(a.get(d))return;a.set(d,!0)}c=Nj(c,a,b);a&&a.set(d,!1);return sf(c)}};
var _M=function(a){return new Oj(a)},Pj=function(a){this.resolve=function(b,c){for(var d=[],e=!1,f=0;f<a.length;f++){var g=Nj(Hj[a[f]],b,c);g===Pg&&(e=!0);d.push(g)}return e?new bh(d):d.join("")}},_T=function(a){return new Pj(arguments)},Qj=function(a){function b(b){for(var c=1;c<a.length;c++)if(a[c]==b)return!0;return!1}this.resolve=
function(c,d){var e=Nj(a[0],c,d);if(a[0]instanceof Oj&&b(8)&&b(16)){if(e===Pg)return e;var f=Fa();Kj.set(f,e);return'google_tag_manager["GTM-JD26"].macro(\''+f+"')"}for(var e=String(e),g=1;g<a.length;g++)e=Y[a[g]](e);return e}},_E=function(a,b){return new Qj(arguments)},Rj=function(a,b){this.w=a;this.ra=b},_R=function(a,b){return new Rj(a,b)},Nj=function(a,b,c){var d=a;if(a instanceof Oj||a instanceof Mj||a instanceof Pj||a instanceof Qj)return a.resolve(b,c);if(!(a instanceof Rj))if(xa(a))for(var d=
[],e=0;e<a.length;e++)d[e]=Nj(a[e],b,c);else if(a&&"object"==typeof a){var d={},f;for(f in a)a.hasOwnProperty(f)&&(d[f]=Nj(a[f],b,c))}return d},Sj=function(a,b){var c=b[a],d=c;if(c instanceof Oj||c instanceof Qj||c instanceof Pj||c instanceof Rj)d=c;else if(xa(c))for(var d=[],e=0;e<c.length;e++)d[e]=Sj(c[e],b);else if("object"==typeof c){var d=new Mj,f;for(f in c)c.hasOwnProperty(f)&&d.set(b[f],Sj(c[f],b))}return d},Uj=function(a,b){for(var c=b?b.split(","):[],d=0;d<c.length;d++){var e=c[d]=c[d].split(":");
0==a&&(e[1]=Hj[e[1]]);if(1==a)for(var f=Tj(e[0]),e=c[d]={},g=0;g<f.length;g++){var h=Ij[f[g]];e[h[0]]=h[1]}if(2==a)for(g=0;4>g;g++)e[g]=Tj(e[g]);3==a&&(c[d]=Hj[e[0]]);if(4==a)for(g=0;2>g;g++)if(e[g]){e[g]=e[g].split(".");for(var k=0;k<e[g].length;k++)e[g][k]=Hj[e[g][k]]}else e[g]=[];5==a&&(c[d]=e[0])}return c},Tj=function(a){var b=[];if(!a)return b;for(var c=0,d=0;d<a.length&&c<Gj;c+=6,d++){var e=a&&a.charCodeAt(d)||65;if(65!=e){var f;f=65<e&&90>=e?e-65:97<=e&&122>=e?e-97+26:95==e?63:48<=e?e-48+52:
62;1&f&&b.push(c);2&f&&b.push(c+1);4&f&&b.push(c+2);8&f&&b.push(c+3);16&f&&b.push(c+4);32&f&&b.push(c+5)}}return b},Vj=function(a,b,c){a.push.apply(a,Uj(b,c))};
var fg=function(){},dk=function(a){},ig=function(){},ek=function(a){},fk=function(a,b){},gk=function(a,b){},gg=function(a){};var hk,ik;var sk=function(a){return function(){}},tk=function(a){return function(){}};var uk=function(a){var b=this;this.g=a;this.complete=this.Wa=!1;this.qa=[];this.la=[];this.S=function(){if(b.s&&b.s.event){var c=b.s.event,d=b.g;}b.complete||Cf(b.qa);Ff(b,1);if(eb[a])for(var e=0;e<eb[a].length;e++)eb[a].shift().S()};this.R=function(){if(b.s&&b.s.event){var c=b.s.event,d=b.g;}b.complete||
Cf(b.la);Ff(b,2);if(eb[a])for(var e=0;e<eb[a].length;e++)eb[a].shift().R()};this.B=kf},vk=function(a,b){a.qa.push(b)},wk=function(a,b){a.la.push(b)},xk=function(a){this.M=[];this.Ga=[];this.Pa={};this.ya=[];this.Y=0;this.Va={};this.Xa={};this.Ha={};this.event=a};xk.prototype.addListener=function(a){this.ya.push(a)};
var yk=function(a,b,c,d,e,f){if(!c.complete){a.M[b]=c;void 0==d&&(d=[]);void 0==e&&(e=[]);void 0==f&&(f=[]);d=xa(d)?d.slice():["or",d];e=xa(e)?e.slice():[e];f=xa(f)?f.slice():[f];a.Pa[b]=d;a.Va[b]=0<e.length;a.Xa[b]=0<f.length;a.Y++;var g=function(){0<a.Y&&a.Y--;0<a.Y||Cf(a.ya)};vk(c,g);wk(c,g)}},zk=function(a,b,c){a.M[b]&&(vk(a.M[b],function(){c(b,!0)}),wk(a.M[b],function(){c(b,!1)}))},Ak=function(a,b){var c=!1;return function(d,e){var f;a:{for(var g=0;g<a.length;g++)if(a[g]instanceof Rj&&a[g].w===
d||a[g]===d){f=g;break a}f=-1}c||0>f||("or"==a[0]?e?(c=!0,b()):(a.splice(f,1),1==a.length&&(c=!0)):e?(a.splice(f,1),1==a.length&&(c=!0,b())):c=!0)}},Ek=function(a,b){var c=[],d=!1,e=function(b){var f,g,h=Z[b];if(a.event.c(h)){}else g=Bk(h,b,a);if(f=g){var k=Ck(b,!0);0<k.length&&e(k[0].w);c.push(f);var l=Ck(b,!1);0<l.length&&e(l[0].w)}else d=
!0};e(b);if(!d){for(var f=0;f<c.length;f++){var g=c[f],h=Ck(g.g,!0);if(0<h.length){var k=c[f-1],l=Dk(g);vk(k,l);0==h[0].ra&&wk(k,l)}var m=Ck(g.g,!1);0<m.length&&(l=Dk(c[f+1]),vk(g,l),0==m[0].ra&&wk(g,l))}a.Ga.push(c)}},Ck=function(a,b){var c=b?ne:Ee,d=Z[a],e=void 0===d[c]?[]:d[c];return xa(e)?e:[e]},Dk=function(a){return function(){a.B()}},Gk=function(a){for(var b={},c=0;c<a.length;c++){var d=a[c],e=[],f=function(a){var b=Ck(a,!0);0<b.length&&f(b[0].w);e.push(a);var c=Ck(a,!1);0<c.length&&f(c[0].w)};
f(d.g);b[d.g]=e}Fk(a,b);return b},Fk=function(a,b){for(var c=0;c<a.length;c++){var d=a[c].g,e;for(e in b)if(b.hasOwnProperty(e)&&e!=d&&-1<nf(b[e],d)){delete b[d];break}}};var Ik=function(a,b){return function(){a[Wc]=b.S;a[Xc]=b.R;var c=b.g,d=b.s&&b.s.Ha[c],e=db[c]&&db[c].state,f=d?void 0!==d:b.Wa||b.Yb,g=db[c]&&db[c].firingOption,h=g&&2==g,k=g&&1==g;if(!f&&void 0===e||!f&&!h||!h&&!k){Ff(b,0);var l=b.s?b.s.event:void 0;a=Hk(a,l?l.c:pg());if(l){var m=a;fk(l,c)}sf(a,b.S,b.R)}else h&&0==e||k&&0==d?eb[c].push(b):h&&1==e||k&&1==d?b.S():b.R()}},Hk=function(a,b){a=Nj(a,new rf,b);return a},Bk=function(a,b,c){var d=new uk(b);d.s=c;vk(d,sk(a));wk(d,tk(a));d.B=Ik(a,d);return d};var Lk=!1,Mk=!1;var _sp=function(a,b,c){r("//www.googleadservices.com/pagead/conversion_async.js",function(){var d=w.google_trackConversion;O(d)?d({google_conversion_id:a[U],google_conversion_label:a[kd],google_custom_params:a[gc]||{},google_remarketing_only:!0,onload_callback:b})||c():c()},c)};_sp.a="sp";_sp.b=["google"];
var Ok=!1,_ua=function(a,b,c){function d(a){var b=[].slice.call(arguments,0);b[0]=p+b[0];w[l()].apply(window,b)}function e(b,c){void 0!==a[c]&&d("set",b,a[c])}function f(a,b){return void 0===b?b:a(b)}function g(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&d("set",a+c,b[c])}function h(){var b=function(a,b,c){if(!Ga(b))return!1;for(var e=Ha(Object(b),c,[]),f=0;e&&f<e.length;f++)d(a,e[f]);return!!e&&0<e.length},c;a[zc]?c=P("ecommerce"):
a[yc]&&(c=a[yc].ecommerce);if(!Ga(c))return;c=Object(c);var e=Ha(a[Rc],"currencyCode",c.currencyCode);void 0!==e&&d("set","&cu",e);b("ec:addImpression",c,"impressions");if(b("ec:addPromo",c[c.promoClick?"promoClick":"promoView"],"promotions")&&c.promoClick){d("ec:setAction","promo_click",c.promoClick.actionField);return}for(var f="detail checkout checkout_option click add remove purchase refund".split(" "),g=0;g<f.length;g++){var h=c[f[g]];if(h){b("ec:addProduct",h,"products");d("ec:setAction",f[g],
h.actionField);break}}}function k(a,b,c){var d=0;if(void 0!==a)for(var e in a)if(a.hasOwnProperty(e)&&(c&&y[e]||!c&&void 0===y[e])){var f=u[e]?Da(a[e]):a[e];"anonymizeIp"!=e||f||(f=void 0);b[e]=f;d++}return d}Q("GoogleAnalyticsObject",a[Ed]||"ga");var l=function(){return w.GoogleAnalyticsObject},m=Q(l(),function(){var a=w[l()];a.q=a.q||[];a.q.push(arguments)});m.l=Number(H());var p="",q="";"string"!=typeof a[Re]?(q=Fa(),p=q+"."):""!==a[Re]&&
(q=a[Re],p=q+".");var t=!1;var y={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,storage:!0},u={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useBeacon:!0};
var z={name:q};k(a[Rc],z,!0);m("create",a[gb],z);d("set","&gtm","GTM-JD26");e("nonInteraction",Jd);g("dimension",a[uc]);
var E={};k(a[Rc],E,!1)&&d("set",E);var D;a[rd]&&d("require","linkid","linkid.js");d("set","hitCallback",function(){if(O(a[Yc]))a[Yc]();else{var c=a[Rc],d=c&&c.hitCallback;O(d)&&d()}b()});if(a[Ne]){a[Gc]&&(d("require","ec","ec.js"),h());var C={hitType:"event",eventCategory:String(a[Kc]),eventAction:String(a[Jc]),eventLabel:f(String,a[Lc]),eventValue:f(K,a[Mc])};k(D,C,!1);d("send",C);}else if(a[Oe]){
C={hitType:"social",socialNetwork:String(a[ue]),socialAction:String(a[se]),socialTarget:String(a[te])},k(D,C,!1),d("send",C);}else if(a[Qe]){}else if(a[Pe]){}else if(a[oc]){}else if(a[mc]){}else if(a[Me]){}else{a[Gc]&&(d("require","ec","ec.js"),h());if(a[xc]&&!a[Ic]){var R="_dc_gtm_"+String(a[gb]).replace(/[^A-Za-z0-9-]/g,"");d("require","displayfeatures",void 0,{cookieName:R})}D?d("send","pageview",D):d("send","pageview");}if(!Ok){var V=a[kc]?"u/analytics_debug.js":"analytics.js";a[fd]&&!a[kc]&&(V="internal/"+V);
Ok=!0;r(I("https:","http:","//www.google-analytics.com/"+V,t),function(){w[l()].loaded||c()},c)}};_ua.a="ua";_ua.b=["google"];var Pk=function(){var a=[];return function(b,c){if(void 0===a[b]){var d=Lj[b]&&Nj(Lj[b],new rf,c),e=d;if(d)if(d[pb]&&xa(d[S]))for(var f=d[S],e=!1,g=0;!e&&g<f.length;g++)d[S]=f[g],e=sf(d);else e=sf(d);a[b]=[e,d]}return a[b]}},ck=function(a,b){for(var c=b[0],d=0;d<c.length;d++)if(!a.P(c[d],a.c)[0])return!1;for(var e=b[2],d=0;d<e.length;d++)if(a.P(e[d],a.c)[0])return!1;return!0},Qk=!1,ag=function(a,b,c,d){switch(b){case "gtm.js":if(Qk)return!1;Qk=!0;break;case "gtm.sync":if(P("gtm.snippet")!=ab)return!1}P("tagTypeBlacklist");
for(var e={id:a,name:b,ha:c||kf,fa:Tj(),pa:Tj(),P:Pk(),c:pg()},f=[],g=0;g<Hi.length;g++)if(ck(e,Hi[g])){f[g]=!0;for(var h=e,k=Hi[g],l=k[1],m=0;m<l.length;m++)h.fa[l[m]]=!0;for(var p=k[3],m=0;m<p.length;m++)h.pa[p[m]]=!0}else f[g]=!1;fk(e);var t=[];for(var y=0;y<Gj;y++)if(e.fa[y]&&!e.pa[y])if(e.c(Z[y])){}else{t[y]=Z[y];}e.T=t;for(var u=new xk(e),z=0;z<Gj;z++)if(e.fa[z]&&!e.pa[z])if(e.c(Z[z])){}else{var E=e.T[z],D=Bk(E,z,u);yk(u,z,D,E[rc],E[ne],E[Ee]);if(E[fb])break}u.addListener(e.ha);for(var C=[],
A=0;A<u.M.length;A++){var M=u.M[A];if(M){var B=u.Pa[A],F=u.Va[A],N=u.Xa[A];if(0!=B.length||F||N){if(0<B.length)for(var T=Ak(B,M.B),R=0;R<B.length;R++)B[R]instanceof Rj&&B[R].w!=A&&zk(u,B[R].w,T);(F||N)&&Ek(u,A)}else C.push(A)}}for(A=0;A<C.length;A++)u.M[C[A]].B();for(A=0;A<u.Ga.length;A++){for(var ya=u.Ga[A],V=ya,ka=[],ha=0;ha<V.length;ha++){var tb=V[ha],rb=tb.g,Pb=db[rb],td=Pb.firingOption;0!=td&&(1==td&&void 0!==tb.s.Ha[rb]||2==td&&void 0!==Pb.state)&&ka.push(tb)}var ud=Gk(ka),vc=void 0;for(vc in ud)if(ud.hasOwnProperty(vc)){for(var vf=
void 0,ij=void 0,md=ud[vc],dl=md[0],kj=md[md.length-1],lj,Ja=0;Ja<V.length;Ja++){var nd=V[Ja];!vf&&nd.g==dl&&0<Ja&&(vf=V[Ja-1]);nd.g==kj&&Ja<V.length-1&&(ij=V[Ja+1]);if(-1<nf(md,nd.g))if(lj=V.splice(Ja,1)[0],nd.g==kj)break;else Ja--}if(lj){var mj=Number(vc),ma=vf,wf=ij;if(ma){var el=ma.qa[0],fl=ma.la[0],nj=ma;nj.qa=[];nj.la=[];vk(ma,el);wk(ma,fl)}if(ma&&wf){var xf=Dk(wf);vk(ma,xf);var yf=Ck(ma.g,!1);0<yf.length&&yf[0].w!=mj&&0==yf[0].ra&&wk(ma,xf);var zf=Ck(wf.g,!0);0<zf.length&&zf[0].w!=mj&&0==zf[0].ra&&
wk(ma,xf)}}}0<ya.length&&ya[0].B()}0<u.Y||Cf(u.ya);d&&O(d)&&d({passingRules:f,resolvedTags:e.T});
if("gtm.js"==b||"gtm.sync"==b)a:{}for(var qj in e.T)if(e.T.hasOwnProperty(qj)){var rj=e.T[qj],Af;if(!(Af=void 0==rj[ed])){var sj=rj[ed];Af=!("function"!=typeof String.prototype.startsWith?0===sj.indexOf("_implicit"):sj.startsWith("_implicit"))}if(Af)return!0}return!1};var Rk={macro:function(a){if(Kj.contains(a))return Kj.get(a)}};Rk.dataLayer=Wf;Rk.onHtmlSuccess=eh(!0);Rk.onHtmlFailure=eh(!1);Rk.callback=function(a){Ta.hasOwnProperty(a)&&O(Ta[a])&&Ta[a]();delete Ta[a]};Rk.jb=function(){var a=w.google_tag_manager;a||(a=w.google_tag_manager={});a["GTM-JD26"]||(a["GTM-JD26"]=Rk);La=a};(function(){var a=function(a){var b=Q("google_tag_manager",{}),d=b[a];d||(d=b[a]={},d.nwnc={},d.nwc={},d.wnc={},d.wc={},d.wt=null,d.l=!1);return d};Ai=a("linkClickMap");ja=a("formSubmitMap")})();
Hj.push.apply(Hj,function(){for(var a=[_jsm,'Page Hash','(function(){return ',_u,'Page Fragment','fragment',_E(_M(0),8,16),'?\x22#\x22+',':\x22\x22})();',_T(2,6,7,6,8),'Signup Registration Form Check','(function(){return document.getElementsByClassName(\x22gtm_signup_register_form\x22).length})();',_T(11),'Page Subdomain','(function(){return/(.*)\\.heroku\\.com/.exec(','Page Hostname','host',_E(_M(3),8,16),')[1]})();',_T(14,17,18),'Is Vimeo on Page','(function(){var c\x3d\x22vimeo.com/video\x22,b\x3ddocument.getElementsByTagName(\x22iframe\x22),a;for(a\x3d0;a\x3cb.length;a++)if(-1\x3cb[a].getAttribute(\x22src\x22).indexOf(c))return!0;return!1})();',_T(21),'Is VidYard on Page','(function(){var c\x3d\x22play.vidyard.com\x22,b\x3ddocument.getElementsByTagName(\x22iframe\x22),a;for(a\x3d0;a\x3cb.length;a++)if(-1\x3cb[a].getAttribute(\x22src\x22).indexOf(c))return!0;return!1})();',_T(24),'Page Path with Fragment','(function(){return window.location.pathname+window.location.search+window.location.hash})();',_T(27),'Check if Old History Fragment equals New History Fragment',_v,'Old History Fragment','gtm.oldUrlFragment',_E(_M(8),8,16),'\x3d\x3d\x3d','New History Fragment','gtm.newUrlFragment',_E(_M(9),8,16),'?!1:!0})();',_T(2,33,34,37,38),'Set Cookie','(function(){return function(d,e,f,b,c){if(d\x26\x26e){var a;b\x3db?\x22; path\\x3d\x22+b:\x22\x22;c\x3dc?\x22; domain\\x3d\x22+c:\x22\x22;a\x3d\x22\x22;f\x26\x26(a\x3dnew Date,a.setTime(a.getTime()+f),a\x3d\x22; expires\\x3d\x22+a.toUTCString());document.cookie\x3dd+\x22\\x3d\x22+e+a+b+c}}})();',_T(41),'Is Newsletter Checked','(function(){return document.getElementById(\x22list_93478\x22).checked?\x22checked\x22:\x22unchecked\x22})();',_T(44),_eq,'History Source','gtm.historyChangeSource',_M(13),'popstate',_M(10),'true',_re,'Page Path','path',_M(14),'/articles/getting-started-.*',true,_e,'_event',_M(15),'gtm.historyChange','115433_117','gtm.js','115433_2147479553','Page URL',_M(16),'https://signup.heroku.com/account/accept/ok','115433_81',_ua,__c,'UA - Rollup Tracking Id','1','UA-39697570-1',_M(17),false,'3',_smm,'Logged In State',_k,'Session Cookie','heroku_session',_M(18),'LoggedIn',{73:84},'NotLoggedIn',_M(19),'Internal Campaign IDs','query','c',_M(20),{73:87,77:91},'cookieDomain','page','Cookie Domain - Auto','auto',_M(21),'Replace PII in URL','(function(){var e\x3d[\x22email\x22,\x22ehash\x22,\x22email_id\x22,\x22authuser\x22],a\x3d',_E(_M(7),8,16),',b\x3ddocument.createElement(\x22a\x22);b.href\x3da;if(b.search){var a\x3db.search.replace(\x22?\x22,\x22\\x26\x22),c,d;for(c\x3d0;c\x3ce.length;c++)d\x3de[c],d\x3dnew RegExp(\x22\\x26\x22+d+\x22[^\\x26#]*\x22,\x22g\x22),a\x3da.replace(d,\x22\\x26\x22);a\x3d\x22\\x26\x22\x3d\x3d\x3da[0]?a.slice(1):\x22piiremoved\x22;b.search\x3da}return b.pathname+b.search+b.hash})();',_T(99,100,101),_M(22),{93:97,94:103},'\x26tid','\x26cd1','\x26cd3',{105:75,106:87,107:91,93:97,94:103},5,'trackEvent','115433_10','Event Category','eventCat',1,_M(23),'Event Action','eventAction',_M(24),'Event Label','eventLabel',_M(25),'Event Value','eventValue',_M(26),'Event Interaction','eventInteraction',_M(27),{73:87},'\x26t','\x26ec','\x26ea','\x26el','\x26ev','\x26ni','event',{105:75,129:135,130:115,131:118,132:121,133:124,134:127,106:87,93:97,94:103},6,'trackPageview','115433_11',{93:97,94:56},{105:75,106:87,107:91,93:97,94:56},7,_M(3),'www.heroku.com','115433_15','devcenter.heroku.com','115433_21','signup.heroku.com','115433_50','https://signup.heroku.com/account','115433_63',_sw,'https://signup.heroku.com/account/accept/','https://signup.heroku.com/account/accept','115433_82',__pa,'PerfectAudience - Site Id','51b6483a434bba0f0c000016',_M(28),18,'UA - Subdomains Tracking Id',_M(4),'devcenter','www','dashboard','id','addons','beta','blog','dataclips','discussion','events','help','toolbelt','jobs','lp','waza','partners','postgres','redeem','status','success','signup','elements','engineering','connect','redis','sso','kb','data','UA-39697570-3','UA-39697570-4','UA-39697570-5','UA-39697570-6','UA-39697570-7','UA-39697570-11','UA-39697570-12','UA-39697570-13','UA-39697570-14','UA-39697570-15','UA-39697570-16','UA-39697570-17','UA-39697570-18','UA-39697570-19','UA-39697570-20','UA-39697570-21','UA-39697570-22','UA-39697570-23','UA-39697570-25','UA-39697570-26','UA-39697570-31','UA-39697570-32','UA-39697570-33','UA-39697570-34','UA-39697570-36','UA-39697570-38','UA-39697570-40','UA-39697570-41',{163:191,164:192,165:193,166:194,167:195,168:196,169:197,170:198,171:199,172:200,173:201,174:202,175:203,176:204,177:205,178:206,179:207,180:208,181:209,182:210,183:211,184:212,185:213,186:214,187:215,188:216,189:217,190:218},'false',_M(29),'115433_101','115433_118','2',{73:87,224:91},'\x26cd2',{105:221,106:87,226:91,93:97,94:103},30,'/virtual/registration/registered',{93:97,94:229},{105:75,106:87,107:91,93:97,94:229},34,__awct,'1.00','USD','992316833','Y-wFCP-02wUQoZuW2QM','_url',_M(30),45,'https://signup.heroku.com/nodese','115433_71',52,'blog.heroku.com','115433_8','elements.heroku.com','115433_75',__cegg,'00338119',57,_img,'//pixel.mathtag.com/event/img?mt_id\x3d814352\x26mt_adid\x3d131453\x26v1\x3d\x26v2\x3d\x26v3\x3d\x26s1\x3d\x26s2\x3d\x26s3\x3d','gtmcb',_r,'_random',_M(31),68,'https://signup.heroku.com/java','115433_85','//pixel.mathtag.com/event/img?mt_id\x3d848607\x26mt_adid\x3d131453\x26v1\x3d\x26v2\x3d\x26v3\x3d\x26s1\x3d\x26s2\x3d\x26s3\x3d',75,'//pixel.mathtag.com/event/img?mt_id\x3d849890\x26mt_adid\x3d131453\x26v1\x3d\x26v2\x3d\x26v3\x3d\x26s1\x3d\x26s2\x3d\x26s3\x3d',77,_j,'Page Title','document.title',_M(32),'(\\d+\\sError|^Page not found)','115433_79','ErrorPage',_f,'Referrer',_M(33),{105:75,129:135,130:270,131:67,132:273,134:76,106:87,93:97,94:103},80,'115433_105',{105:221,129:135,130:270,131:67,132:273,134:76,106:87,93:97,94:103},84,'115433_107',{105:221,129:135,130:115,131:118,132:121,133:124,134:127,106:87,93:97,94:103},86,'115433_109',{105:221,106:87,226:91,93:97,94:56},88,'115433_112',{105:221,106:87,226:91,93:97,94:229},90,'trackSocial','115433_119','Social Network','socialNetwork',2,_M(34),'Social Action','socialAction',_M(35),'Social Target','socialTarget',_M(36),'\x26sn','\x26sa','\x26st','social',{105:75,129:303,300:293,301:296,302:299,106:87,93:97,94:103},95,'115433_120',{105:221,129:303,300:293,301:296,302:299,106:87,93:97,94:103},96,'115433_122',_sp,'',98,_cn,'Click Value','gtm.element.value',_M(37),'Keep Me Up to Date','hello\\.heroku\\.com\\/keepmeuptodate','gtm.click','115433_129','Form','Submit','Keep me up to Date: Newsletter - ',_M(12),_T(323,324),{105:75,129:135,130:321,131:322,132:325,134:76,106:87,93:97,94:103},103,'Click Element','gtm.element',_M(38),'hello.heroku.com/unsubscribe','115433_130','Click',_et,'Click Text',_M(39),{105:75,129:135,130:321,131:333,132:336,134:76,106:87,93:97,94:103},104,'Re-subscribe','hello\\.heroku\\.com\\/unsubscribe','115433_132','Newsletter Re-subscribe',{105:74,129:135,130:321,131:339,132:342,134:76,106:87,93:97,94:103},105,'www\\.heroku\\.com(\\/$|\\/home)','115433_59','UA - Rollup Homepage','/home','/index.html','/',{348:350,349:350},_M(40),{94:352},{105:75,94:352},108,'115433_141',_hl,109,'115433_142',110,'115433_143',_cl,111,'115433_144',112,'115433_145',113,_html,'\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l4ajt\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl4ajt\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',35,'dashboard.heroku.com','115433_136','redis.heroku.com','115433_137','postgres.heroku.com','115433_138','dataclips.heroku.com','115433_139','\n\n\x3cscript type\x3d\x22text/gtmscript\x22\x3epiAId\x3d\x2237622\x22;piCId\x3d\x2230300\x22;(function(){function a(){var b\x3ddocument.createElement(\x22script\x22);b.type\x3d\x22text/javascript\x22;b.src\x3d(\x22https:\x22\x3d\x3ddocument.location.protocol?\x22https://pi\x22:\x22http://cdn\x22)+\x22.pardot.com/pd.js\x22;var a\x3ddocument.getElementsByTagName(\x22script\x22)[0];a.parentNode.insertBefore(b,a)}window.attachEvent?window.attachEvent(\x22onload\x22,a):window.addEventListener(\x22load\x22,a,!1)})();\x3c/script\x3e\n\n',37,'https://www.heroku.com/pricing','115433_57','\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622301\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',40,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622287\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;\x26amp;mt_nsync\x3d1\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',41,'https://signup.heroku.com',_gt,_M(2),'0','115433_60','\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622288\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',42,'https://devcenter.heroku.com/start','115433_61','\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622290\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',43,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622289\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',44,'\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l4sun\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl4sun\x26amp;p_id\x3dTwitter\x22\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dl4sun\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',46,'\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l5cdw\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl5cdw\x26amp;p_id\x3dTwitter\x22\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dl5cdw\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',47,'\x3cnoscript\x3e\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none\x22 src\x3d\x22https://www.facebook.com/tr?id\x3d1835809346650227\x26amp;ev\x3dPageView\x26amp;noscript\x3d1\x22\x3e\x3c/noscript\x3e',48,'https://www.heroku.com/connect','115433_65','https://www.heroku.com/thanks','115433_66','\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l4iup\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl4iup\x26amp;p_id\x3dTwitter\x22\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dl4iup\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',49,'\n\n\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d687393\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',53,'id.heroku.com','115433_3','engineering.heroku.com','115433_53','\x3cscript type\x3d\x22text/gtmscript\x22\x3e!function(){function f(a){var c\x3d/[?\x26]?([^\x3d]c)\x3d([^\x26]*)/;a\x3dc.exec(a)||[];return a\x3ddecodeURIComponent(a[2])}function g(a){var c\x3d\x22; \x22+document.cookie;a\x3dc.split(\x22; \x22+a+\x22\\x3d\x22);return 2\x3d\x3da.length?a.pop().split(\x22;\x22).shift():void 0}function h(a,c){var b\x3d\x22\x22,b\x3dnew Date;b.setTime(b.getTime()+12096E5);b\x3d\x22; expires\\x3d\x22+b.toGMTString();document.cookie\x3da+\x22\\x3d\x22+c+b+\x22;domain\\x3d.heroku.com;path\\x3d/\x22}var e\x3d\x22campaign\x22,d\x3dg(e);\x22undefined\x22\x3d\x3dtypeof d\x26\x26(d\x3df(document.location.search),\x22undefined\x22!\x3d\x3dd\x26\x26h(e,d))}();\x3c/script\x3e',60,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d805084\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',65,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d805085\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',66,'status.heroku.com','115433_31','toolbelt.heroku.com','115433_34','partners.heroku.com','115433_38','\x3cscript type\x3d\x22text/gtmscript\x22\x3e(function(){var a\x3dfunction(a){a\x3dnew RegExp(\x22[; ]\x22+a+\x22\\x3d([^\\\\s;]*)\x22);if(a\x3d(\x22 \x22+document.cookie).match(a))return unescape(a[1])};if(!a(\x22jbfp\x22)){var c\x3dMath.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);document.cookie\x3d\x22jbfp\\x3d\x22+(new Date).getTime()+\x22-\x22+c+\x22;domain\\x3dheroku.com;path\\x3d/;max-age\\x3d31536000\x22}var c\x3ddocument.referrer,b\x3da(\x22jbfp\x22),d\x3da(\x22heroku_session\x22),a\x3ddocument.createElement(\x22img\x22),b\x3d\x22https://jambox-p.herokuapp.com/e?url\\x3d\x22+escape(document.location.href)+\n\x22\\x26fp\\x3d\x22+b+\x22\\x26li\\x3d\x22+d;c\x26\x26(b+\x3d\x22\\x26ref\\x3d\x22+escape(c));a.src\x3db})();\x3c/script\x3e',78,_M(5),'115433_115','\x3cscript type\x3d\x22text/gtmscript\x22\x3e(function(c,e,g){e\x3dc(e);var f\x3d{iframes:[],eventMarker:{},getIframeSrc:function(a){return a.attr(\x22src\x22).split(\x22?\x22)[0]},getIframeId:function(a){return a.attr(\x22id\x22)},removeUndefinedIframes:function(a){var b\x3dc(a).attr(\x22id\x22);a\x3dc(a).attr(\x22src\x22);if(-1\x3d\x3d\x3da.indexOf(\x22player_id\x22))return!1;if(this.eventMarker[b])return!0;this.eventMarker[b]\x3d{progress25:!1,progress50:!1,progress75:!1,videoPlayed:!1,videoPaused:!1,videoResumed:!1,videoSeeking:!1,videoCompleted:!1,timePercentComplete:0};return!0},initIframes:function(){var a\x3d\nc(\x27iframe[src*\\x3d\x22player.vimeo.com/video\x22]\x27);this.iframes\x3dc.grep(a,c.proxy(this.removeUndefinedIframes,this))},onMessageReceived:function(a){if(/^https?:\\/\\/player\\.vimeo\\.com/.test(a.originalEvent.origin)){a\x3dJSON.parse(a.originalEvent.data);var b\x3dc(\x22#\x22+a.player_id);switch(a.event){case \x22ready\x22:this.initIframes();this.onReady();break;case \x22playProgress\x22:this.onPlayProgress(a.data,b);break;case \x22seek\x22:this.onSeek(b);break;case \x22play\x22:this.onPlay(b);break;case \x22pause\x22:this.onPause(b);break;case \x22finish\x22:this.onFinish(b)}}},\npost:function(a,b,d){a\x3dJSON.stringify({method:a,value:b});b\x3dc(d).attr(\x22src\x22).split(\x22?\x22)[0];d.contentWindow.postMessage(a,b)},handleOnReady:function(a,b){this.post(\x22addEventListener\x22,\x22play\x22,b);this.post(\x22addEventListener\x22,\x22seek\x22,b);this.post(\x22addEventListener\x22,\x22pause\x22,b);this.post(\x22addEventListener\x22,\x22finish\x22,b);this.post(\x22addEventListener\x22,\x22playProgress\x22,b)},onReady:function(){c.each(this.iframes,c.proxy(this.handleOnReady,this))},onFinish:function(a){var b\x3dthis.getIframeId(a);this.eventMarker[b].videoCompleted||\n(this.sendEvent(a,\x22Completed video\x22),this.eventMarker[b].videoCompleted\x3d!0)},onSeek:function(a){var b\x3dthis.getIframeId(a);this.eventMarker[b].videoSeeking||(this.sendEvent(a,\x22Skipped video forward or backward\x22),this.eventMarker[b].videoSeeking\x3d!0)},onPlay:function(a){var b\x3dthis.getIframeId(a);this.eventMarker[b].videoPlayed||(this.sendEvent(a,\x22Started video\x22),this.eventMarker[b].videoPlayed\x3d!0);!this.eventMarker[b].videoResumed\x26\x26this.eventMarker[b].videoPaused\x26\x26(this.sendEvent(a,\x22Resumed video\x22),\nthis.eventMarker[b].videoResumed\x3d!0)},onPause:function(a){var b\x3dthis.getIframeId(a);99\x3ethis.eventMarker[b].timePercentComplete\x26\x26!this.eventMarker[b].videoPaused\x26\x26(this.sendEvent(a,\x22Paused video\x22),this.eventMarker[b].videoPaused\x3d!0)},onPlayProgress:function(a,b){var d\x3dthis.getIframeId(b),c;this.eventMarker[d].timePercentComplete\x3dMath.round(100*a.percent);24\x3cthis.eventMarker[d].timePercentComplete\x26\x26!this.eventMarker[d].progress25\x26\x26(c\x3d\x22Played video: 25%\x22,this.eventMarker[d].progress25\x3d!0);49\x3cthis.eventMarker[d].timePercentComplete\x26\x26\n!this.eventMarker[d].progress50\x26\x26(c\x3d\x22Played video: 50%\x22,this.eventMarker[d].progress50\x3d!0);74\x3cthis.eventMarker[d].timePercentComplete\x26\x26!this.eventMarker[d].progress75\x26\x26(c\x3d\x22Played video: 75%\x22,this.eventMarker[d].progress75\x3d!0);c\x26\x26this.sendEvent(b,c)},sendEvent:function(a,b){var c\x3dthis.getIframeSrc(a);g.push({event:\x22trackEvent\x22,eventCat:\x22Vimeo\x22,eventAction:b,eventLabel:c,eventValue:void 0,eventInteraction:!1})}};e.on(\x22message\x22,c.proxy(f.onMessageReceived,f))})(jQuery,window,dataLayer);\x3c/script\x3e',93,_M(6),'gtm.dom','115433_116','\x3cscript type\x3d\x22text/gtmscript\x22\x3e!function(r){function t(a){var b\x3d[0,25,50,75,90],n\x3db.slice(0),f\x3d[0,0],g\x3d0,h\x3d!1,m\x3dc.create();a.on(\x22timeupdate\x22,function(b){var d,c\x3d0;d\x3dMath.floor(b);if(!(h||\x22object\x22!\x3dtypeof a.metadata||d\x3c\x3df[1])){f[1]\x3db;b\x3dm.insertOne(f);d\x3dm;var e,k\x3dnull,l\x3d[];for(e\x3d0;e\x3cd.length;++e)!k||k[1]\x3cd[e][0]?(k\x26\x26l.push(k),k\x3d[d[e][0],d[e][1]]):d[e][1]\x3ek[1]\x26\x26(k[1]\x3dd[e][1]);d\x3d(k\x26\x26l.push(k),l);for(e\x3d0;e\x3cd.length;++e)c+\x3dd[e][1]-d[e][0];(m.remove(b),c\x3dc/a.metadata.chapters_attributes[g].video_attributes.length_in_seconds*100,c\x3e\x3dn[0])\x26\x26\n\x22undefined\x22!\x3d\x3dtypeof dataLayer\x26\x26\x22function\x22\x3d\x3d\x3dtypeof dataLayer.push\x26\x26dataLayer.push({event:\x22trackEvent\x22,eventCat:\x22Vidyard\x22,eventAction:\x22Played video: \x22+n.shift()+\x22%\x22,eventLabel:a.metadata.chapters_attributes[g].video_attributes.name,eventValue:void 0,eventInteraction:!0})}});a.on(\x22beforeSeek\x22,function(a){!1\x3d\x3d\x3dh\x26\x26(f[1]\x3da.start);h\x3d!0});a.on(\x22play\x22,function(a){m.insertOne(f.slice(0));f[0]\x3da;f[1]\x3da;h\x3d!1});a.on(\x22chapterComplete\x22,function(){n\x3db.slice(0);g\x3da.getCurrentChapter();f\x3d[0,0];m\x3dc.create();h\x3d!1})}\nvar c\x3dfunction(){this._compare\x3dfunction(a,b){return a[0]\x3cb[0]?-1:a[0]\x3eb[0]?1:a[1]\x3cb[1]?-1:a[1]\x3eb[1]?1:0}};c.create\x3dfunction(){return new c};c.prototype\x3d[];c.prototype.constructor\x3dArray.prototype.constructor;c.prototype.insertOne\x3dfunction(a){var b\x3dthis.bsearch(a);return this.splice(b+1,0,a),b+1};c.prototype.remove\x3dfunction(a){return this.splice(a,1),this};c.prototype.bsearch\x3dfunction(a){if(!this.length)return-1;for(var b,c,f,g\x3d0,h\x3dthis.length;1\x3ch-g;){if(b\x3dMath.floor((g+h)/2),c\x3dthis[b],f\x3dthis._compare(a,\nc),0\x3d\x3d\x3df)return b;0\x3cf?g\x3db:h\x3db}return 0\x3d\x3d\x3dg\x26\x260\x3cthis._compare(this[0],a)?-1:g};var l,p\x3d!0;try{l\x3dnew r.players}catch(a){throw Error(\x22The Vidyard API must be loaded before this script can execute\x22);}for(var q in l)l.hasOwnProperty(q)\x26\x26(t(l[q]),p\x3d!1);p\x26\x26console.warn(\x22No Vidyard Players found. (include this script below player embed codes)\x22)}(Vidyard);\x3c/script\x3e',94,'\x3cimg src\x3d\x22//bat.bing.com/action/0?ti\x3d5116236\x26amp;Ver\x3d2\x22 height\x3d\x220\x22 width\x3d\x220\x22 style\x3d\x22display:none; visibility: hidden;\x22\x3e',97,'\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dnuf3v\x26amp;p_id\x3dTwitter\x26amp;tw_sale_amount\x3d0\x26amp;tw_order_quantity\x3d0\x22\x3e\n\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dnuf3v\x26amp;p_id\x3dTwitter\x26amp;tw_sale_amount\x3d0\x26amp;tw_order_quantity\x3d0\x22\x3e',102,'\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none\x22 src\x3d\x22https://www.facebook.com/tr?id\x3d998836190199866\x26amp;ev\x3dPageView\x26amp;noscript\x3d1\x22\x3e',106,'\x3cimg src\x3d\x22https://traffic.outbrain.com/network/trackpxl?advid\x3d 54996\x26amp;action\x3dview \x22 height\x3d\x221\x22 width\x3d\x221\x22 border\x3d\x220\x22 alt\x3d\x22\x22\x3e',107,'GA - Subdomains Tracking Id','UA-2989055-26','UA-2989055-24','UA-2989055-19','UA-2989055-36','UA-2989055-38','UA-2989055-37','UA-2989055-22',{165:450,163:451,174:452,183:453,184:454,186:455,181:456},'GA - Rollup Tracking Id','UA-2989055-1','Virtual Path','virtualPath','DOM Ready','Event','Click Classes','gtm.elementClasses','Click ID','gtm.elementId','Click Target','gtm.elementTarget','Click URL','gtm.elementUrl','Form Element','Form Classes','Form ID','Form Target','Form URL','Form Text',_c,'Container ID','GTM-JD26',_hid,'HTML ID'],b=[],c=0;c<a.length;c++)b[c]=Sj(c,a);return b}());Vj(Ij,0,"23:0,28:1,23:3,28:4,7:5,29:9,28:10,29:12,28:13,28:15,7:16,29:19,28:20,29:22,28:23,29:25,28:26,29:28,28:29,23:30,28:31,32:32,28:35,32:36,29:39,28:40,29:42,28:43,29:45,23:46,28:47,32:48,3:49,4:50,3:51,4:52,23:53,28:54,7:55,3:56,4:57,26:58,23:59,28:60,3:61,4:62,4:64,28:66,3:67,4:68,23:70,34:58,23:71,28:72,46:73,54:74,0:75,17:76,16:76,23:78,28:79,23:80,28:81,32:82,11:76,27:83,31:85,13:86,28:88,7:89,36:90,14:92,44:76,28:95,54:96,28:98,29:102,22:104,10:76,12:76,1:108,30:58,15:76,40:109,4:110,41:58,2:58,28:112,32:113,9:114,19:115,28:116,32:117,18:118,28:119,32:120,20:121,28:122,32:123,21:124,28:125,32:126,33:127,14:128,1:136,40:137,4:138,22:140,1:141,40:142,3:143,4:144,4:146,4:148,4:150,23:152,4:153,4:154,23:156,28:157,54:158,51:159,40:160,28:161,27:162,31:219,13:220,3:221,4:220,0:221,14:225,1:227,40:228,22:230,1:231,40:232,23:233,49:234,50:235,47:236,48:237,28:238,52:239,40:240,4:241,40:243,4:244,4:246,23:248,53:249,40:250,23:251,43:252,5:253,23:254,28:255,6:256,40:257,4:258,43:260,40:261,43:262,40:263,23:264,28:265,32:266,3:267,4:268,19:270,18:67,23:271,28:272,20:273,33:76,1:274,40:275,1:277,40:278,1:280,40:281,1:283,40:284,1:286,40:287,4:288,42:58,28:290,32:291,9:292,39:293,28:294,32:295,37:296,28:297,32:298,38:299,1:304,40:305,1:307,40:308,3:87,4:86,23:310,25:236,8:311,40:312,23:313,28:314,32:315,3:316,4:317,4:318,4:319,19:321,18:322,20:325,1:326,15:58,40:327,28:328,32:329,3:330,4:331,18:333,23:334,28:335,20:336,1:337,40:338,4:339,4:340,0:74,18:339,20:342,1:343,40:344,4:345,28:347,27:56,31:351,13:56,22:353,1:354,30:76,40:355,23:357,40:358,40:360,23:362,40:363,40:365,40:367,23:368,24:369,40:370,4:371,4:373,4:375,4:377,24:379,40:380,4:381,24:383,40:384,24:385,40:386,4:387,23:388,3:389,4:390,24:392,40:393,4:394,24:396,40:397,24:398,40:399,24:400,40:401,24:402,40:403,24:404,40:405,4:406,4:408,24:410,40:411,24:412,40:413,4:414,4:416,24:418,40:419,24:420,40:421,24:422,40:423,4:424,4:426,4:428,35:58,24:430,40:431,3:432,24:434,40:435,3:436,4:437,24:439,40:440,24:441,40:442,24:443,40:444,24:445,40:446,24:447,40:448,28:449,31:457,28:458,54:459,28:460,32:461,28:462,28:463,28:464,32:465,28:466,32:467,28:468,32:469,28:470,32:471,28:472,28:473,28:474,28:475,28:476,28:477,23:478,28:479,45:480,23:481,28:482");Vj(Jj,1,"c,j,BD,EY,Bk,BAD,BAM,BAw,AAAO,AAAy,BAABB,BAAAG,BAAAY,AAACAD,EAAAAAG,AAAAAAAD,EAAAAAAg,AAAAAAAAwD,AAAAAAAAAAe,AAAAAAAAAghD,EAAAAAAAAAAc,AAAAAAAAQBAAG,BAAAAAAAAAAAY,AAACAAAAAAAAAA4,AAACAAAAAAAAAAgG,AAACAAAAAAAAAAgw,AAACAAAAAAAAAAgAG,AAACAAAAAAAAAAgAw,AAAAAAAAQBAAAAAAAAAgB,AAAAAAAAAgAAAAAAAAAA4B,EAAAAAAAAAAAAAAAAAAAAAAI,AAAAAAAAAAAAAAAAAAAAAAAAAw,AAAAAAAAAAAAAAAAAAAAAAAAAAAO,AAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAH,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAA0,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAEG,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAY,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4B,AAAAAAAAAgAAAAAAAAAAQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD,AAAAAAAAQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw,AAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB,AAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQ,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIg,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAB,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIE,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAI,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwB,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG");Vj(Lj,1,"AAAAgM,AAAAgw,AAAAAA5,AAAAgAAM,AAAAgAAU,AAAAgAAAD,AAAAgAAEAAAAAAB,AAAAgAAEAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAM,AAAAgAAAAAAAAAAAAAU,AAAAgAAAAAAAAAAAAAk,AAAAgAAABAAAAAAAAAAB,AAAAAAAABAAAAAAAAAAG,AAAAgAAABAAAAAAAAAAI,AAAAgAAAAAAAAAAAAAAAAG,AAAAAAAABAAAAAAAAAACAAAAB,AAAAgAAAAAAAAAAAAAEAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAI,AAAAgAAABAAAAAAAAAAAAAAAAAE,AAAAAAhAAAAAAAAAAAAAAAAAAAAw,AAAAgAAEAAAAAAAAAAAAAAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkB,AAAAAAhABAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAAAgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgB,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAC,AAAAAAhABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAAAhABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAI,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAg,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAB,AAAAAAAABAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAI,AAAAAAAABAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4,AAAAAAAABAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAAAgAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg,AAAAggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI,AAAAggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB,AAAAgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC");Vj(Z,1,"AAAAAAAAMcAgh_,AAAAAAAAMcAAgZGJJP,AAAAAAAAMcAgBbAAAgD,AAAAAAAAIBAAAAAAAAAQG,AAAAAAAAMYAAhbAAAAAAA4B,AAAAAAAAMcAgBbAAAAAAAAO,AAAAAAAAIBAAAAAAAAAAAAw3,AAAAAAAAIBAAAAAAAAAQCAAAC,AAAAAAAAIBAAAAAAAAAAAAAAwB,AAAAAAAAIAAAAAAAAAAAAAAAAOD,AAAAAAAAIAAAAAAAAAAAAAAAAKZ,AAAAAAAAIAAAAAAAAAAAAAAAAKhB,AAAAAAAAMcAAgZGAACAAAAAAAAAAzD,AAAAAAAAMYAAgZGAACAAAIAAAAAAzM,AAAAAAAAMYAAgZGJJDAAAIAAAAAAAw,AAAAAAAAMYAABbAAAgAAAYAAAAAAAAD,AAAAAAAAMYAABbAAAAAAAYCAAAAAAAM,AAAAAAAAMEAAgZEAACAAAAAAAAAAAAgI5,AAAAAAAAMAAAgZEAACAAAIAAAAAAAAgIJD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAwD,AAAAAAAAMcAAgJGAACAAAAAAAAAAgAAAAAA4H,AAAAAAAAMcAAgJGAACAAAAAAAAAAgAAAAAAICyB,AAAAAAAAMYAAgJGAACAAAAAAAAAAgAAAAAAICA4D,AAAAAAAAMcAABTAAAAAAAAAAAAAAAAAAAAAAAAAAe,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgB,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgC,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAk,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABw,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAG,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAG,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAH,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAw,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAM,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAw,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAM,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAw");Vj(Hi,2,"P:B::,Q:BAAAfB::,AB:C::,AC:E::,QE:IkAAgAgkD::,QI:IgAAAAglD::,QQ:IgAAAAggD::,Q:Q:AAE:,P:Q:AAE:,w:gI::ZgACABggD,Qg:ABAAAgFAE::Ig,QAI:ACAAAAQ::,QAQ:AEAAAAgmD::,QAg:AEAAAAAkD::,QAAB:AQ::,QAAC:AAB::,QAAC:AAC:AAE:,AB:AAE:AAE:,AC:AAI:AAE:,w:AAQ:AAE:,AAAE:AAg::,AAAE:AAAB:AAE:,QAAI:AAAC::,AAAwB:AAAE::,AAAAD:AAAI::,AAAAN:AAAQ::,QAAAQ:AAAgAEg::,QAAAAI:AAAAAC::,QAAAAw:AAAAAIC::,QAAAAAB:AAAAAQ::,QAAAAAC:AAAAAAI::,QAAAAAE:AAAAAAI::,QAAAAAI:AAAAAAg::,QAAAAAQ:AAAAAAgE::,QAAAAAg:AAAAAAAE::,QAAAAAAB:AAAAAAAE::,QAAAAAAC:AAAAAAAE::,QAAAAAAE:AAAAAAAI::,AAAAAAAY:AAAAAAAQ::,QAB::gAC:IgAAABg,QAAAg:::AAAAAB,QAAAAB:::AAAAAB,QAAAAC:::AAAAAB,QAAAAE:::AAAAAB");Vj(Ii,4,"63:,65.356.359.361.364.366.65:,111:,139:,145.145.145.145.145.145.145.145.145:,147.147.147.147.147.147.147.147:,149.149.149.149.149.149:,222:,223:,69.69:69.69.69.69.69.69.69.69.69.69,151.151.151.151.151:151.151,242.242:,245.245.245.245.245.245.245:,247.247.247.247.247:,259:,269:,276:,279:,282:,285:,289:,306:,309:,320:,332:,341:,346.346.346:,382:,391.391:,395:,407:,409:,415:,417.417:,425:,427:,429:,433:,438:,:155.155.155.155,:372,:374,:376,:378");for(var Sk=0;Sk<Z.length;Sk++){var Tk=Z[Sk],Uk=1;Tk[Ld]?Uk=2:Tk[We]&&(Uk=0);db[Sk]={firingOption:Uk,state:void 0};eb[Sk]=[]}Rk.jb();
(function(a){})("async");
(function(){var a=Q("dataLayer",[]),b=Q("google_tag_manager",{}),b=b["dataLayer"]=b["dataLayer"]||{};Oa.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Pf.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var c=a.push;a.push=function(){var b=[].slice.call(arguments,0);c.apply(a,b);for(bg.push.apply(bg,b);300<this.length;)this.shift();return jg()};bg.push.apply(bg,a.slice(0));x(kg)})();var bl=w;
if("interactive"==J.readyState&&!J.createEventObject||"complete"==J.readyState)Lf();else{L(J,"DOMContentLoaded",Lf);L(J,"readystatechange",Lf);if(J.createEventObject&&J.documentElement.doScroll){var cl=!0;try{cl=!bl.frameElement}catch(a){}cl&&Nf()}L(bl,"load",Lf)}"complete"===J.readyState?Qf():L(w,"load",Qf);
(function(a){})("async");(function(){})();var _vs="res_ts:1481147357031000,srv_cl:141575379,ds:live,cv:278";
})()
;
(function(){var e=window,h=document,k="replace";var m=function(a,c,d,b,g){c=encodeURIComponent(c)[k](/\(/g,"%28")[k](/\)/g,"%29");a=a+"="+c+"; path="+(d||"/")+"; ";g&&(a+="expires="+(new Date((new Date).getTime()+g)).toGMTString()+"; ");b&&"none"!=b&&(a+="domain="+b+";");b=h.cookie;h.cookie=a;return b!=h.cookie},p=function(a){var c=h.body;try{c.addEventListener?c.addEventListener("click",a,!1):c.attachEvent&&c.attachEvent("onclick",a)}catch(d){}};var q=function(a,c,d,b){this.get=function(){for(var b=void 0,c=[],d=h.cookie.split(";"),l=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),f=0;f<d.length;f++){var n=d[f].match(l);n&&c.push(decodeURIComponent(n[1][k](/%28/g,"(")[k](/%29/g,")")))}for(d=0;d<c.length;d++)c[d]&&(b=c[d]);return b};this.set=function(g){return m(a,g,b,c,1E3*d)};this.remove=function(){return m(a,"",b,c,-100)}};var t=function(a,c){var d=void 0;if("function"==typeof a.get&&"function"==typeof a.set){var b=c||{},g=b.hasOwnProperty("cookieName")?b.cookieName:"_gali",r=b.hasOwnProperty("cookieTimeout")?b.cookieTimeout:30,s=b.hasOwnProperty("levels")?b.levels:3,b=a.get("cookieDomain"),l=a.get("cookiePath"),f=new q(g,b,r,l);d||(d=f.get());d&&a.set("&linkid",d);p(function(a){a=a||e.event;a=a.target||a.srcElement;for(var b,c=0;a&&c<=s;c++){if(b=a.getAttribute("id")){a=b;100<a.length?f.remove():a?f.set(a):f.remove();
return}a=a.parentElement}f.remove()})}};(function(){e.gaplugins=e.gaplugins||{};e.gaplugins.LinkId=t;var a=e.GoogleAnalyticsObject||"ga";e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)};e[a]("provide","linkid",t)})();})();
/*
 * The Typekit service used to deliver this font or fonts for use on websites
 * is provided by Adobe and is subject to these Terms of Use
 * http://www.adobe.com/products/eulas/tou_typekit. For font license
 * information, see the list below.
 *
 * proxima-nova:
 *   - http://typekit.com/eulas/00000000000000003b9ad1b1
 *   - http://typekit.com/eulas/00000000000000003b9ad1b2
 *   - http://typekit.com/eulas/00000000000000003b9ad1b9
 *   - http://typekit.com/eulas/00000000000000003b9ad1ba
 *
 * © 2009-2016 Adobe Systems Incorporated. All Rights Reserved.
 */

if(!window.Typekit)window.Typekit={};window.Typekit.config={"a":"620292","c":[".tk-proxima-nova","\"proxima-nova\",sans-serif"],"dl":"AAAAggAAAAq-RZC89C2Dnyx1LEL-mU6YAAAAAw","f":"//use.typekit.net/c/d9b070/1w;proxima-nova,2,2clzCG:W:i4,2clzC6:W:i7,2clzCF:W:n4,2clzC5:W:n7/{format}{/extras*}","fc":[{"id":139,"family":"proxima-nova","src":"{scheme}://{hostname}/af/03034e/00000000000000003b9ad1b1/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"normal","subset_id":2}},{"id":140,"family":"proxima-nova","src":"{scheme}://{hostname}/af/5a684a/00000000000000003b9ad1b2/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"italic","subset_id":2}},{"id":175,"family":"proxima-nova","src":"{scheme}://{hostname}/af/edab9a/00000000000000003b9ad1b9/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"400","style":"normal","subset_id":2}},{"id":176,"family":"proxima-nova","src":"{scheme}://{hostname}/af/1b9fb4/00000000000000003b9ad1ba/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"400","style":"italic","subset_id":2}}],"fi":[139,140,175,176],"fn":["proxima-nova",["i4","i7","n4","n7"]],"hn":"use.typekit.net","ht":"tk","js":"1.18.13","kt":"lpc2yow","l":"typekit","p":"p.typekit.net","ps":1,"token":"auB9iJZpTdJZdiefLu7/Jmk0gDhWatUXyO7wjrjH5e+TtV9YNSabgYK8W7oL3zQ+ZnxXNi4FfpNCg4N6GwpG2h+kSB0oV456t1OafkpEdUG8Dg0oCkVvnVanwLP/fHeOkm7nWfposDGW05SqrX1dn+AFCZcPzZ8QZqFvNfyPsZqFFbXAITXe6rjKsOKcZs/BqLks29ueIZ1GjePBgywH4A==","type":"configurable"};
/*{"k":"1.18.13","auto_updating":true,"last_published":"2016-05-06 10:25:37 UTC"}*/
;(function(window,document,undefined){if(!document.querySelector){document.documentElement.className+=" wf-inactive";return;}function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function k(a,b,c){k=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return k.apply(null,arguments)}var m=Date.now||function(){return+new Date};function ca(a){this.g=a||"-"}ca.prototype.b=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.g)};function da(){var a=[{name:"font-family",value:n.c[p+1]}];this.g=[n.c[p]];this.b=a}function ea(a){for(var b=a.g.join(","),c=[],d=0;d<a.b.length;d++){var e=a.b[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"};function r(a,b){return(a&65535)*b+(((a>>>16)*b&65535)<<16)};function t(a,b){this.b=b||Array(Math.ceil(a/32));if(!b)for(var c=0;c<this.b.length;c++)this.b[c]=0}t.prototype.set=function(a){if(Math.floor(a/32+1)>this.b.length)throw Error("Index is out of bounds.");var b=Math.floor(a/32);this.b[b]|=1<<a-32*b};t.prototype.has=function(a){if(Math.floor(a/32+1)>this.b.length)throw Error("Index is out of bounds.");var b=Math.floor(a/32);return!!(this.b[b]&1<<a-32*b)};function fa(a,b,c){this.b=a;this.i=b;this.g=new t(a,c)}var ga=[2449897292,4218179547,2675077685,1031960064,1478620578,1386343184,3194259988,2656050674,3012733295,2193273665];
fa.prototype.has=function(a){if("string"!==typeof a&&"number"!==typeof a)throw Error("Value should be a string or number.");for(var b="number"===typeof a,c=0;c<this.i;c++){var d;if(b)d=r(a&4294967295,3432918353),d=d<<15|d>>>17,d=r(d,461845907),d^=ga[c]||0,d=d<<13|d>>>19,d=r(d,5)+3864292196,d^=4,d^=d>>>16,d=r(d,2246822507),d^=d>>>13,d=r(d,3266489909),d^=d>>>16,d=(d>>>0)%this.b;else{d=ga[c]||0;var e,f,g=a.length%4,h=a.length-g;for(f=0;f<h;f+=4)e=(a.charCodeAt(f+0)&4294967295)<<0|(a.charCodeAt(f+1)&
4294967295)<<8|(a.charCodeAt(f+2)&4294967295)<<16|(a.charCodeAt(f+3)&4294967295)<<24,e=r(e,3432918353),e=e<<15|e>>>17,e=r(e,461845907),d^=e,d=d<<13|d>>>19,d=r(d,5)+3864292196;e=0;switch(g){case 3:e^=(a.charCodeAt(f+2)&4294967295)<<16;case 2:e^=(a.charCodeAt(f+1)&4294967295)<<8;case 1:e^=(a.charCodeAt(f+0)&4294967295)<<0,e=r(e,3432918353),e=e<<15|e>>>17,e=r(e,461845907),d^=e}d^=a.length;d=r(d^d>>>16,2246822507);d=r(d^d>>>13,3266489909);d=((d^d>>>16)>>>0)%this.b}if(!this.g.has(d))return!1}return!0};function ha(a){a.length%4&&(a+=Array(5-a.length%4).join("="));a=a.replace(/\-/g,"+").replace(/\_/g,"/");if(window.atob)a=window.atob(a);else{a=a.replace(/=+$/,"");if(1==a.length%4)throw Error("'atob' failed: The string to be decoded is not correctly encoded.");for(var b=0,c,d,e=0,f="";d=a.charAt(e++);~d&&(c=b%4?64*c+d:d,b++%4)?f+=String.fromCharCode(255&c>>(-2*b&6)):0)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d);a=f}c=[];for(b=0;b<a.length;b+=4)c.push(a.charCodeAt(b)<<
24|a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|a.charCodeAt(b+3)<<0);a=c.shift();b=c.shift();this.b=new fa(a,b,c)}ha.prototype.has=function(a){if(""===a)return!0;for(a=a.split(".");a.length;){var b=a.join("."),c="*."+b;if(this.b.has(b)||this.b.has(c)||this.b.has(encodeURIComponent(b))||this.b.has(encodeURIComponent(c)))return!0;a.shift()}return!1};function u(a,b,c,d){b=a.b.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.b.createTextNode(d));return b}function v(a,b,c){a=a.b.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}
function ia(a,b){a.b.body?b():a.b.addEventListener?a.b.addEventListener("DOMContentLoaded",b):a.b.attachEvent("onreadystatechange",function(){"interactive"!=a.b.readyState&&"complete"!=a.b.readyState||b()})}function y(a){a.parentNode&&a.parentNode.removeChild(a)}
function z(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ja(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function A(a,b){var c=u(a,"style");c.setAttribute("type","text/css");c.styleSheet?(v(a,"head",c),c.styleSheet.cssText=b):(c.appendChild(document.createTextNode(b)),v(a,"head",c))}
function ka(a,b,c){var d=a.b.getElementsByTagName("head")[0];if(d){var e=u(a,"script",{src:b}),f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(f=!0,c&&c(null),e.onload=e.onreadystatechange=null,"HEAD"==e.parentNode.tagName&&d.removeChild(e))};d.appendChild(e);setTimeout(function(){f||(f=!0,c&&c(Error("Script load timeout")))},5E3)}};function la(a,b,c){this.g=a.g.document.documentElement;this.j=b;this.m=c;this.b=new ca("-");this.o=!1!==b.events;this.i=!1!==b.classes}function B(a){if(a.i){var b=ja(a.g,a.b.b("wf","active")),c=[],d=[a.b.b("wf","loading")];b||c.push(a.b.b("wf","inactive"));z(a.g,c,d)}C(a,"inactive")}function C(a,b,c){if(a.o&&a.j[b])try{if(c)a.j[b](c.b,D(c));else a.j[b]()}catch(d){console.error('Typekit: Error in "'+b+'" callback',d)}if(a.m[b])if(c)a.m[b](c.b,D(c));else a.m[b]()};function ma(a,b,c){c=c||{};this.b=a;this.g=b;this.weight=c.weight||"400";this.style=c.style||"normal";this.A=c.primer||void 0;this.B=c.subset_id||void 0}function E(a){return("tk-"+a.b).slice(0,26)+"-"+D(a)}function F(a,b){return new ma(b,a.g,{weight:a.weight,style:a.style,A:a.A,B:a.B})}function D(a){return a.style.charAt(0)+a.weight.charAt(0)};function na(){var a=document,b=navigator.userAgent;if(/MSIE|Trident/.test(b)&&(a.documentMode?9>a.documentMode:1))b="i";else{a:{if(/AppleWebKit/.test(b)&&/Android/.test(b)&&!/OPR|Chrome|CrMo|CriOS/.test(b)&&(a=/Android ([^;)]+)/.exec(b))&&a[1]){a=parseFloat(a[1]);a=3.1<=a&&4.1>a;break a}a=!1}if(!a)a:{if(/Silk/.test(b)&&/Linux|Ubuntu|Android/.test(b)&&(b=/Silk\/([\d\._]+)/.exec(b))&&b[1]){a=2<=parseFloat(b[1]);break a}a=!1}b=a?"j":"k"}return b};function G(a){this.b=a}function H(a,b){return a.b.replace(/\{([^\{\}]+)\}/g,function(a,d){if("?"==d.charAt(0)){for(var e=d.slice(1).split(","),f=[],g=0;g<e.length;g++)b[e[g]]&&f.push(e[g]+"="+encodeURIComponent(b[e[g]]));return f.length?"?"+f.join("&"):""}return encodeURIComponent(b[d]||"")})};function I(){this.b=[]}function oa(a,b){for(var c=0;c<b.length;c++)a.b.push(b[c])}function J(a,b){for(var c=0;c<a.b.length;c++)b(a.b[c],c,a)}
function qa(a,b){if("i"===b){var c={},d=new I;J(a,function(a){c[a.b]||(c[a.b]={});c[a.b][a.weight]||(c[a.b][a.weight]=[]);c[a.b][a.weight].push(a)});for(var e in c){for(var f=[400,300,200,100,500,600,700,800,900],g=0;g<f.length;g++){var h=f[g];if(c[e][h]){oa(d,c[e][h]);break}}f=[700,800,900,600,500,400,300,200,100];for(g=0;g<f.length;g++){var l=f[g];if(c[e][l]&&h!==l){oa(d,c[e][l]);break}}}J(a,function(a){a=F(a,a.b.replace(/(-1|-2)$/,"").slice(0,28)+"-"+D(a));d.b.push(a)});return d}return"x"===b?
new I:a}function ra(a,b,c,d){for(var e=[],f=0;f<b.length;f++){var g=b[f],h=H(new G(a.g),{scheme:"https",hostname:c,format:g,primer:a.A,subset_id:a.B,fvd:D(a),extension:sa(g),token:d});"i"===g?e.push("url("+h+")"):e.push("url("+h+') format("'+ta(g)+'")')}return e.join(",")}
function ua(a,b,c,d,e){if("x"===b)return"";var f=[];f.push("font-family:"+(e?E(a):a.b));b="k"===b?ra(a,["l","d","a"],c,d):ra(a,[b],c,d);f.push("src:"+b);f.push("font-weight:"+a.weight);f.push("font-style:"+a.style);return"@font-face{"+f.join(";")+";}"}function ta(a){switch(a){case "d":return"woff";case "i":return"eot";case "l":return"woff2";default:return"opentype"}}function sa(a){switch(a){case "d":return"woff";case "i":return"eot";case "l":return"woff2";default:return"otf"}}
function K(a,b,c,d,e){var f=[];J(a,function(a){f.push(ua(a,b,c,d,e))});return f.join("")};function L(a,b){this.g=a;this.i=b;this.b=u(this.g,"span",{"aria-hidden":"true"},this.i)}function M(a){v(a.g,"body",a.b)}
function N(a){return"display:block !important;position:absolute !important;top:-9999px !important;left:-9999px !important;font-size:300px !important;width:auto !important;height:auto !important;line-height:normal !important;margin:0 !important;padding:0 !important;font-variant:normal !important;white-space:nowrap !important;font-family:"+a.b+" !important;font-weight:"+a.weight+" !important;font-style:"+a.style+" !important;"};function va(a,b,c,d,e,f,g,h){this.C=a;this.G=b;this.u=c;this.b=d;this.v=g||"BESbswy";this.g={};this.H=e||3E3;this.F=h;this.w=f||null;this.i=new L(this.u,this.v);this.j=new L(this.u,this.v);this.m=new L(this.u,this.v);this.o=new L(this.u,this.v);a=this.F?E(this.b):this.b.b;this.i.b.style.cssText=N(F(this.b,a+",serif"));this.j.b.style.cssText=N(F(this.b,a+",sans-serif"));this.m.b.style.cssText=N(F(this.b,"serif"));this.o.b.style.cssText=N(F(this.b,"sans-serif"));M(this.i);M(this.j);M(this.m);M(this.o)}
var O={J:"serif",I:"sans-serif"},P=null;function wa(){if(null===P){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);P=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return P}va.prototype.start=function(){this.g.serif=this.m.b.offsetWidth;this.g["sans-serif"]=this.o.b.offsetWidth;this.D=m();xa(this)};function ya(a,b,c){for(var d in O)if(O.hasOwnProperty(d)&&b===a.g[O[d]]&&c===a.g[O[d]])return!0;return!1}
function xa(a){var b=a.i.b.offsetWidth,c=a.j.b.offsetWidth,d;(d=b===a.g.serif&&c===a.g["sans-serif"])||(d=wa()&&ya(a,b,c));d?m()-a.D>=a.H?wa()&&ya(a,b,c)&&(!a.w||a.w.hasOwnProperty(a.b.b))?Q(a,a.C):Q(a,a.G):za(a):Q(a,a.C)}function za(a){setTimeout(k(function(){xa(this)},a),50)}function Q(a,b){setTimeout(k(function(){y(this.i.b);y(this.j.b);y(this.m.b);y(this.o.b);b(this.b)},a),0)};function Aa(a,b,c,d,e,f,g){this.i=a;this.u=b;this.b=d;this.m=c;this.g=e||3E3;this.o=f||void 0;this.j=g}Aa.prototype.start=function(){var a=this.m.g.document,b=this,c=m(),d=new Promise(function(d,e){function h(){m()-c>=b.g?e():a.fonts.load(b.b.style+" "+b.b.weight+" 300px "+(b.j?E(b.b):b.b.b),b.o).then(function(a){1<=a.length?d():setTimeout(h,25)},function(){e()})}h()}),e=new Promise(function(a,c){setTimeout(c,b.g)});Promise.race([e,d]).then(function(){b.i(b.b)},function(){b.u(b.b)})};function R(a,b,c,d){this.v=a;this.b=b;this.g=0;this.o=this.m=!1;this.w=c;this.u=d}var S=null;
function Ba(a,b,c){var d={},e=b.b.length;if(!e&&c)B(a.b);else{a.g+=e;c&&(a.m=c);var f=[];J(b,function(b){var c=a.b;c.i&&z(c.g,[c.b.b("wf",b.b,D(b),"loading")]);C(c,"fontloading",b);c=null;if(null===S)if(window.FontFace){var e=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),q=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);S=e?42<parseInt(e[1],10):q?!1:!0}else S=!1;S?c=new Aa(k(a.i,a),k(a.j,a),a.v,b,a.w,"BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",
a.u):c=new va(k(a.i,a),k(a.j,a),a.v,b,a.w,d,"BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",a.u);f.push(c)});for(b=0;b<f.length;b++)f[b].start()}}R.prototype.i=function(a){var b=this.b;b.i&&z(b.g,[b.b.b("wf",a.b,D(a),"active")],[b.b.b("wf",a.b,D(a),"loading"),b.b.b("wf",a.b,D(a),"inactive")]);C(b,"fontactive",a);this.o=!0;Ca(this)};
R.prototype.j=function(a){var b=this.b;if(b.i){var c=ja(b.g,b.b.b("wf",a.b,D(a),"active")),d=[],e=[b.b.b("wf",a.b,D(a),"loading")];c||d.push(b.b.b("wf",a.b,D(a),"inactive"));z(b.g,d,e)}C(b,"fontinactive",a);Ca(this)};function Ca(a){!--a.g&&a.m&&(a.o?(a=a.b,a.i&&z(a.g,[a.b.b("wf","active")],[a.b.b("wf","loading"),a.b.b("wf","inactive")]),C(a,"active")):B(a.b))};function T(a,b){this.b=a;this.g=[];this.m=b;this.j=this.u=null;this.o=new I;this.i=null}T.prototype.supportsConfiguredBrowser=function(){return!0};T.prototype.init=function(){if(0<this.g.length){for(var a=[],b=0;b<this.g.length;b++)a.push(ea(this.g[b]));A(this.b,a.join(""))}};
T.prototype.load=function(a,b,c){var d=this;c=c||{};a=c.timeout;var e=!!c.async,f=na(),g=qa(this.o,f);c=new la(this.b,c,{active:function(){if(e){var a=K(g,f,d.m,d.i,!1);A(d.b,a)}if(d.v){var a=d.v,b=d.b,c=new G("{scheme}://{hostname}/p.gif{?s,k,app,ht,h,f,a,js,_}"),h=(window.__adobewebfontsappname__||a.app||"").toString().substr(0,20),b=b.g.location.hostname||b.i.location.hostname,l=[],w=[];window.Typekit?(window.Typekit.fonts||(window.Typekit.fonts=[]),w=window.Typekit.fonts):window.TypekitPreview&&
(window.TypekitPreview.fonts||(window.TypekitPreview.fonts=[]),w=window.TypekitPreview.fonts);for(var x=0;x<a.b.length;x++){for(var pa=!1,Y=0;Y<w.length;Y++)if(a.b[x]===w[Y]){pa=!0;break}pa||(l.push(a.b[x]),w.push(a.b[x]))}l.length&&Da(H(c,{scheme:"https",hostname:a.o,s:a.j,k:a.m,app:h,ht:a.i,h:b,f:l.join("."),a:a.g,js:a.version,_:(+new Date).toString()}))}},inactive:function(){if(e){var a=K(g,f,d.m,d.i,!1);A(d.b,a)}}});if(this.j){var h=location.hostname;if(!this.j.has(h)){console.error('Typekit: the domain "'+
h+'" isn\'t in the list of published domains for kit "'+this.u+'".');B(c);return}}if(g.b.length){h=K(g,f,this.m,this.i,e);A(this.b,h);var l=new R(this.b,c,a,e);ia(d.b,function(){Ba(l,g,b)})}else B(c)};function U(a,b){this.j=a;this.g=b;this.b=[]}U.prototype.i=function(a){this.b.push(a)};U.prototype.load=function(a,b){var c=a,d=b||{};"string"==typeof c?c=[c]:c&&c.length||(d=c||{},c=[]);if(c.length)for(var e=this,f=c.length,g=0;g<c.length;g++)Ea(this,c[g],function(){--f||Fa(e,d)});else Fa(this,d)};function Ea(a,b,c){b=H(a.j,{id:b});ka(a.g,b,c)}
function Fa(a,b){if(a.b.length){for(var c=new la(a.g,b,{}),d=0;d<a.b.length;d++)a.b[d].init();c.i&&z(c.g,[c.b.b("wf","loading")]);C(c,"loading");for(c=0;c<a.b.length;c++)a.b[c].load(null,c==a.b.length-1,b);a.b=[]}};function Da(a){var b=new Image(1,1),c=!1;b.src=a;b.onload=function(){c=!0;b.onload=null};setTimeout(function(){c||(b.src="about:blank",b.onload=null)},3E3)};var Ga=new function(){var a=window;this.g=this.i=a;this.b=this.g.document};window.Typekit||(window.Typekit={});if(!window.Typekit.load){var V=new U(new G("//"+(window.Typekit.config||{}).hn+"/{id}.js"),Ga);window.Typekit.load=function(){V.load.apply(V,arguments)};window.Typekit.addKit=function(){V.i.apply(V,arguments)}}var W,n=window.Typekit.config||{};W=new T(Ga,n.hn);
W.v=new function(){var a=n.ps,b=n.ht,c=n.fi,d=n.a,e=n.kt,f=n.js,g=n.l;this.o=n.p;this.j=a;this.i=b;this.b=c||[];this.g=d||null;this.m=e||null;this.version=f||null;this.app=g||null};if(n.fc)for(var X=n.fc,Z=0;Z<X.length;Z++)W.o.b.push(new ma(X[Z].family,X[Z].src,X[Z].descriptors));if(n.dl){var Ha=n.dl;try{W.j=new ha(Ha)}catch(a){}}n.kt&&(W.u=n.kt);n.token&&(W.i=n.token);if(n.c)for(var p=0;p<n.c.length;p+=2)W.g.push(new da);window.Typekit.addKit(W);
if(1===Math.round(30*Math.random())){var Ia=window.Typekit.load,Ja=[];window.Typekit.load=function(a){a=a||{};var b=a.active||function(){},c=a.fontactive||function(){},d=(new Date).getTime();a.active=function(){b();if(!window.XDomainRequest){var a=new Image,c=function(a){a=JSON.stringify({fonts:Ja,augmentations:[],font_loading:window.FontFace?"native":"non-native",active_duration:(new Date).getTime()-d,javascript_version:n.js,kit_type:"configurable",ad_blocker:a});if(!window.XDomainRequest){var b=
new XMLHttpRequest;b.open("POST","https://performance.typekit.net/");b.send(a)}};a.src="https://p.typekit.net/p.gif?";a.onload=function(){for(var a=!1,b=0;b<document.styleSheets.length;b++)if(null===document.styleSheets[b].href&&/ghostery-purple-box/.test(document.styleSheets[b].ownerNode.textContent)){a=!0;break}c(a)};a.onerror=function(){c(!0)}}};a.fontactive=function(a,b){var g,h;c(a,b);a:{g=b.charAt(0);h=b.charAt(1);/[1-9]/.test(h)||(h=4);g="i"===g?"italic":"o"===g?"oblique":"normal";h+="00";
for(var l=n.fc,q=0;q<l.length;q++)if(l[q].family===a&&l[q].descriptors.weight===h&&l[q].descriptors.style===g){g=l[q].id;break a}g=0}Ja.push({id:g,duration:(new Date).getTime()-d,dynamic:!1})};Ia(a)}}if(window.WebFont)try{window.Typekit.load()}catch(a){};}(this,document));

var piScriptNum=0;var piScriptObj=new Array();function checkNamespace(c){var d=c.split(".");var b=window;for(var e=0;e<d.length;e++){var a=d[e];if(!b[a]){b[a]={}}b=b[a]}}function piTracker(a){checkNamespace("pi.tracker");pi.tracker.visitor_id=piGetCookie("visitor_id"+(piAId-1000));pi.tracker.pi_opt_in=piGetCookie("pi_opt_in"+(piAId-1000));if(pi.tracker.pi_opt_in!="false"||(typeof(pi.tracker.title)!="undefined"&&pi.tracker.notify_pi)){var n=piGetParameter(document.URL,"pi_campaign_id");if(n!=null){pi.tracker.campaign_id=n}else{if(typeof(piCId)!="undefined"&&piCId!=""&&piCId!=null){pi.tracker.campaign_id=piCId}else{pi.tracker.campaign_id=null}}pi.tracker.account_id=piAId;pi.tracker.title=encodeURIComponent(document.title);if(typeof(piPoints)!="undefined"){pi.tracker.pi_points=piPoints}if(typeof(a)!="undefined"){pi.tracker.url=encodeURIComponent(a)}else{pi.tracker.url=encodeURIComponent(document.URL)}pi.tracker.referrer=document.referrer;if(pi.tracker.referrer==null){pi.tracker.referrer=piGetParameter(document.URL,"referrer")}pi.tracker.referrer=encodeURIComponent(pi.tracker.referrer);var r=piGetParameter(document.URL,"pi_ad_id");if(r!=null){pi.tracker.pi_ad_id=r}var b=piGetParameter(document.URL,"creative");if(b!=null){pi.tracker.creative=b}var o=piGetParameter(document.URL,"matchtype");if(o!=null){pi.tracker.matchtype=o}var w=piGetParameter(document.URL,"keyword");if(w!=null){pi.tracker.keyword=w}var y=piGetParameter(document.URL,"network");if(y!=null){pi.tracker.network=y}var h=piGetParameter(document.URL,"device");if(h!=null){pi.tracker.device=h}if(typeof(piIncludeInActivities)!="undefined"){pi.tracker.pi_include_in_activies=piIncludeInActivities}if(typeof(piProfileId)!="undefined"){pi.tracker.pi_profile_id=piProfileId}var x=piGetParameter(document.URL,"pi_profile_id");if(x!=null){pi.tracker.pi_profile_id=x}var k=piGetParameter(document.URL,"pi_email");if(k!=null){pi.tracker.pi_email=k}var d=piGetParameter(document.URL,"pi_list_email");if(d!=null){pi.tracker.pi_list_email=d}var l=piGetParameter(document.URL,"utm_campaign");if(l!=null){pi.tracker.utm_campaign=encodeURIComponent(l)}var c=piGetParameter(document.URL,"utm_medium");if(c!=null){pi.tracker.utm_medium=encodeURIComponent(c)}var s=piGetParameter(document.URL,"utm_source");if(s!=null){pi.tracker.utm_source=encodeURIComponent(s)}var t=piGetParameter(document.URL,"utm_content");if(t!=null){pi.tracker.utm_content=encodeURIComponent(t)}var p=piGetParameter(document.URL,"utm_term");if(p==null){p=piGetParameter(document.URL,"_kk")}if(p!=null){pi.tracker.utm_term=encodeURIComponent(p)}var q=piGetParameter(document.URL,"gclid");if(q!=null){pi.tracker.gclid=q}var g="ver=3";for(property in pi.tracker){g+="&"+property+"="+pi.tracker[property]}var u=false;try{u=location.protocol+"//"}catch(v){}if(u==null){u="http://"}if(typeof(piTUrl)=="string"&&(piTUrl.indexOf("localhost")!=-1||piTUrl.indexOf("app.dev.pardot")!==-1)){var m=u+piTUrl+"/analytics?"}else{var m=u+"pi.pardot.com/analytics?"}var f=document.getElementsByTagName("head")[0];piScriptObj[piScriptNum]=document.createElement("script");piScriptObj[piScriptNum].type="text/javascript";piScriptObj[piScriptNum].src=m+g;f.appendChild(piScriptObj[piScriptNum]);piScriptObj[piScriptNum].onload=function(){return}}piScriptNum++}function piGetParameter(d,b){var b=b+"=";if(d.length>0){var c=d.indexOf(b);if(c!=-1){c+=b.length;var a=d.indexOf("&",c);if(a==-1){a=d.length}return decodeURIComponent(d.substring(c,a))}}return null}function piGetCookie(a){if(document.cookie.length>0){c_start=document.cookie.indexOf(a+"=");if(c_start!=-1){c_start=c_start+a.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}function piSetCookie(b,c,a){var d=new Date();d.setDate(d.getDate()+a);document.cookie=b+"="+escape(c)+((a==null)?"":";expires="+d.toGMTString()+";path="+escape("/"))}piTracker();(function(){function b(g){if(document.querySelectorAll){return document.querySelectorAll("."+g)}var f=document.getElementsByTagName("a");var h=new Array();for(i=0;i<f.length;i++){var e=f[i].getAttribute("class");if(!e){e=f[i].className}ecl=e.split(" ");for(j=0;j<ecl.length;j++){if(ecl[j].toLowerCase()==g.toLowerCase()){h.push(f[i])}}}return h}function a(e){if(typeof document.getElementsByClassName!=="function"){return b(e)}else{return document.getElementsByClassName(e)}}function c(){var f,g,h;f=a("pardotTrackClick");for(g=0;g<f.length;g++){h=f[g];var e=function(l){var k=(l.currentTarget)?l.currentTarget:l.srcElement;if(k){var m=k.getAttribute("href");if(m){d(m);if(l.preventDefault){l.preventDefault()}else{l.returnValue=false}return false}}};if(h.addEventListener){h.addEventListener("click",e,false)}else{if(h.attachEvent){h.attachEvent("onclick",e)}}}}function d(l){var k="pi.pardot.com/analytics?";var h={url:encodeURIComponent(l),title:"",referrer:pi.tracker.url};var f;for(f in pi.tracker){if(pi.tracker.hasOwnProperty(f)&&!h.hasOwnProperty(f)){h[f]=pi.tracker[f]}k+="&"+f+"="+h[f]}var e="analyticsCB"+(new Date()).getTime();k+="&piClickCallback="+e;pi[e]=function(){window.location=l};var g=document.createElement("script");g.type="text/javascript";g.src=("https:"==document.location.protocol?"https://":"http://")+k;var m=document.getElementsByTagName("script")[0];m.parentNode.insertBefore(g,m)}c()})();
(function(){var $c=function(a){this.w=a||[]};$c.prototype.set=function(a){this.w[a]=!0};$c.prototype.encode=function(){for(var a=[],b=0;b<this.w.length;b++)this.w[b]&&(a[Math.floor(b/6)]^=1<<b%6);for(b=0;b<a.length;b++)a[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b]||0);return a.join("")+"~"};var vd=new $c;function J(a){vd.set(a)}var Nd=function(a,b){var c=new $c(Dd(a));c.set(b);a.set(Gd,c.w)},Td=function(a){a=Dd(a);a=new $c(a);for(var b=vd.w.slice(),c=0;c<a.w.length;c++)b[c]=b[c]||a.w[c];return(new $c(b)).encode()},Dd=function(a){a=a.get(Gd);ka(a)||(a=[]);return a};var ea=function(a){return"function"==typeof a},ka=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},qa=function(a){return void 0!=a&&-1<(a.constructor+"").indexOf("String")},D=function(a,b){return 0==a.indexOf(b)},sa=function(a){return a?a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""):""},ta=function(a){var b=M.createElement("img");b.width=1;b.height=1;b.src=a;return b},ua=function(){},K=function(a){if(encodeURIComponent instanceof Function)return encodeURIComponent(a);J(28);return a},
L=function(a,b,c,d){try{a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)}catch(e){J(27)}},f=/^[\w\-:/.?=&%!]+$/,wa=function(a,b,c){a&&(c?(c="",b&&f.test(b)&&(c=' id="'+b+'"'),f.test(a)&&M.write("<script"+c+' src="'+a+'">\x3c/script>')):(c=M.createElement("script"),c.type="text/javascript",c.async=!0,c.src=a,b&&(c.id=b),a=M.getElementsByTagName("script")[0],a.parentNode.insertBefore(c,a)))},Ud=function(){return"https:"==M.location.protocol},E=function(a,b){var c=
a.match("(?:&|#|\\?)"+K(b).replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)");return c&&2==c.length?c[1]:""},xa=function(){var a=""+M.location.hostname;return 0==a.indexOf("www.")?a.substring(4):a},ya=function(a){var b=M.referrer;if(/^https?:\/\//i.test(b)){if(a)return b;a="//"+M.location.hostname;var c=b.indexOf(a);if(5==c||6==c)if(a=b.charAt(c+a.length),"/"==a||"?"==a||""==a||":"==a)return;return b}},za=function(a,b){if(1==b.length&&null!=b[0]&&"object"===typeof b[0])return b[0];for(var c=
{},d=Math.min(a.length+1,b.length),e=0;e<d;e++)if("object"===typeof b[e]){for(var g in b[e])b[e].hasOwnProperty(g)&&(c[g]=b[e][g]);break}else e<a.length&&(c[a[e]]=b[e]);return c};var ee=function(){this.keys=[];this.values={};this.m={}};ee.prototype.set=function(a,b,c){this.keys.push(a);c?this.m[":"+a]=b:this.values[":"+a]=b};ee.prototype.get=function(a){return this.m.hasOwnProperty(":"+a)?this.m[":"+a]:this.values[":"+a]};ee.prototype.map=function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b],d=this.get(c);d&&a(c,d)}};var O=window,M=document;var F=window,G=function(a){var b=F._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===F["ga-disable-"+a])return!0;try{var c=F.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(d){}return!1};var Ca=function(a){var b=[],c=M.cookie.split(";");a=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c.length;d++){var e=c[d].match(a);e&&b.push(e[1])}return b},zc=function(a,b,c,d,e,g){e=G(e)?!1:eb.test(M.location.hostname)||"/"==c&&vc.test(d)?!1:!0;if(!e)return!1;b&&1200<b.length&&(b=b.substring(0,1200),J(24));c=a+"="+b+"; path="+c+"; ";g&&(c+="expires="+(new Date((new Date).getTime()+g)).toGMTString()+"; ");d&&"none"!=d&&(c+="domain="+d+";");d=M.cookie;M.cookie=c;if(!(d=d!=M.cookie))a:{a=
Ca(a);for(d=0;d<a.length;d++)if(b==a[d]){d=!0;break a}d=!1}return d},Cc=function(a){return K(a).replace(/\(/g,"%28").replace(/\)/g,"%29")},vc=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,eb=/(^|\.)doubleclick\.net$/i;var oc=function(){return(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com"},Da=function(a){this.name="len";this.message=a+"-8192"},ba=function(a,b,c){c=c||ua;if(2036>=b.length)wc(a,b,c);else if(8192>=b.length)x(a,b,c)||wd(a,b,c)||wc(a,b,c);else throw ge("len",b.length),new Da(b.length);},wc=function(a,b,c){var d=ta(a+"?"+b);d.onload=d.onerror=function(){d.onload=null;d.onerror=null;c()}},wd=function(a,b,c){var d=O.XMLHttpRequest;if(!d)return!1;var e=new d;if(!("withCredentials"in e))return!1;
e.open("POST",a,!0);e.withCredentials=!0;e.setRequestHeader("Content-Type","text/plain");e.onreadystatechange=function(){4==e.readyState&&(c(),e=null)};e.send(b);return!0},x=function(a,b,c){return O.navigator.sendBeacon?O.navigator.sendBeacon(a,b)?(c(),!0):!1:!1},ge=function(a,b,c){1<=100*Math.random()||G("?")||(a=["t=error","_e="+a,"_v=j47","sr=1"],b&&a.push("_f="+b),c&&a.push("_m="+K(c.substring(0,100))),a.push("aip=1"),a.push("z="+hd()),wc(oc()+"/collect",a.join("&"),ua))};var h=function(a){var b=O.gaData=O.gaData||{};return b[a]=b[a]||{}};var Ha=function(){this.M=[]};Ha.prototype.add=function(a){this.M.push(a)};Ha.prototype.D=function(a){try{for(var b=0;b<this.M.length;b++){var c=a.get(this.M[b]);c&&ea(c)&&c.call(O,a)}}catch(d){}b=a.get(Ia);b!=ua&&ea(b)&&(a.set(Ia,ua,!0),setTimeout(b,10))};function Ja(a){if(100!=a.get(Ka)&&La(P(a,Q))%1E4>=100*R(a,Ka))throw"abort";}function Ma(a){if(G(P(a,Na)))throw"abort";}function Oa(){var a=M.location.protocol;if("http:"!=a&&"https:"!=a)throw"abort";}
function Pa(a){try{O.navigator.sendBeacon?J(42):O.XMLHttpRequest&&"withCredentials"in new O.XMLHttpRequest&&J(40)}catch(c){}a.set(ld,Td(a),!0);a.set(Ac,R(a,Ac)+1);var b=[];Qa.map(function(c,d){if(d.F){var e=a.get(c);void 0!=e&&e!=d.defaultValue&&("boolean"==typeof e&&(e*=1),b.push(d.F+"="+K(""+e)))}});b.push("z="+Bd());a.set(Ra,b.join("&"),!0)}
function Sa(a){var b=P(a,gd)||oc()+"/collect",c=P(a,fa);!c&&a.get(Vd)&&(c="beacon");if(c){var d=P(a,Ra),e=a.get(Ia),e=e||ua;"image"==c?wc(b,d,e):"xhr"==c&&wd(b,d,e)||"beacon"==c&&x(b,d,e)||ba(b,d,e)}else ba(b,P(a,Ra),a.get(Ia));b=a.get(Na);b=h(b);c=b.hitcount;b.hitcount=c?c+1:1;b=a.get(Na);delete h(b).pending_experiments;a.set(Ia,ua,!0)}
function Hc(a){(O.gaData=O.gaData||{}).expId&&a.set(Nc,(O.gaData=O.gaData||{}).expId);(O.gaData=O.gaData||{}).expVar&&a.set(Oc,(O.gaData=O.gaData||{}).expVar);var b;var c=a.get(Na);if(c=h(c).pending_experiments){var d=[];for(b in c)c.hasOwnProperty(b)&&c[b]&&d.push(encodeURIComponent(b)+"."+encodeURIComponent(c[b]));b=d.join("!")}else b=void 0;b&&a.set(m,b,!0)}function cd(){if(O.navigator&&"preview"==O.navigator.loadPurpose)throw"abort";}
function yd(a){var b=O.gaDevIds;ka(b)&&0!=b.length&&a.set("&did",b.join(","),!0)}function vb(a){if(!a.get(Na))throw"abort";};var hd=function(){return Math.round(2147483647*Math.random())},Bd=function(){try{var a=new Uint32Array(1);O.crypto.getRandomValues(a);return a[0]&2147483647}catch(b){return hd()}};function Ta(a){var b=R(a,Ua);500<=b&&J(15);var c=P(a,Va);if("transaction"!=c&&"item"!=c){var c=R(a,Wa),d=(new Date).getTime(),e=R(a,Xa);0==e&&a.set(Xa,d);e=Math.round(2*(d-e)/1E3);0<e&&(c=Math.min(c+e,20),a.set(Xa,d));if(0>=c)throw"abort";a.set(Wa,--c)}a.set(Ua,++b)};var Ya=function(){this.data=new ee},Qa=new ee,Za=[];Ya.prototype.get=function(a){var b=$a(a),c=this.data.get(a);b&&void 0==c&&(c=ea(b.defaultValue)?b.defaultValue():b.defaultValue);return b&&b.Z?b.Z(this,a,c):c};var P=function(a,b){var c=a.get(b);return void 0==c?"":""+c},R=function(a,b){var c=a.get(b);return void 0==c||""===c?0:1*c};Ya.prototype.set=function(a,b,c){if(a)if("object"==typeof a)for(var d in a)a.hasOwnProperty(d)&&ab(this,d,a[d],c);else ab(this,a,b,c)};
var ab=function(a,b,c,d){if(void 0!=c)switch(b){case Na:wb.test(c)}var e=$a(b);e&&e.o?e.o(a,b,c,d):a.data.set(b,c,d)},bb=function(a,b,c,d,e){this.name=a;this.F=b;this.Z=d;this.o=e;this.defaultValue=c},$a=function(a){var b=Qa.get(a);if(!b)for(var c=0;c<Za.length;c++){var d=Za[c],e=d[0].exec(a);if(e){b=d[1](e);Qa.set(b.name,b);break}}return b},yc=function(a){var b;Qa.map(function(c,d){d.F==a&&(b=d)});return b&&b.name},S=function(a,b,c,d,e){a=new bb(a,b,c,d,e);Qa.set(a.name,a);return a.name},cb=function(a,
b){Za.push([new RegExp("^"+a+"$"),b])},T=function(a,b,c){return S(a,b,c,void 0,db)},db=function(){};var gb=qa(window.GoogleAnalyticsObject)&&sa(window.GoogleAnalyticsObject)||"ga",Ba=!1,hb=T("apiVersion","v"),ib=T("clientVersion","_v");S("anonymizeIp","aip");var jb=S("adSenseId","a"),Va=S("hitType","t"),Ia=S("hitCallback"),Ra=S("hitPayload");S("nonInteraction","ni");S("currencyCode","cu");S("dataSource","ds");var Vd=S("useBeacon",void 0,!1),fa=S("transport");S("sessionControl","sc","");S("sessionGroup","sg");S("queueTime","qt");var Ac=S("_s","_s");S("screenName","cd");
var kb=S("location","dl",""),lb=S("referrer","dr"),mb=S("page","dp","");S("hostname","dh");var nb=S("language","ul"),ob=S("encoding","de");S("title","dt",function(){return M.title||void 0});cb("contentGroup([0-9]+)",function(a){return new bb(a[0],"cg"+a[1])});var pb=S("screenColors","sd"),qb=S("screenResolution","sr"),rb=S("viewportSize","vp"),sb=S("javaEnabled","je"),tb=S("flashVersion","fl");S("campaignId","ci");S("campaignName","cn");S("campaignSource","cs");S("campaignMedium","cm");
S("campaignKeyword","ck");S("campaignContent","cc");var ub=S("eventCategory","ec"),xb=S("eventAction","ea"),yb=S("eventLabel","el"),zb=S("eventValue","ev"),Bb=S("socialNetwork","sn"),Cb=S("socialAction","sa"),Db=S("socialTarget","st"),Eb=S("l1","plt"),Fb=S("l2","pdt"),Gb=S("l3","dns"),Hb=S("l4","rrt"),Ib=S("l5","srt"),Jb=S("l6","tcp"),Kb=S("l7","dit"),Lb=S("l8","clt"),Mb=S("timingCategory","utc"),Nb=S("timingVar","utv"),Ob=S("timingLabel","utl"),Pb=S("timingValue","utt");S("appName","an");
S("appVersion","av","");S("appId","aid","");S("appInstallerId","aiid","");S("exDescription","exd");S("exFatal","exf");var Nc=S("expId","xid"),Oc=S("expVar","xvar"),m=S("exp","exp"),Rc=S("_utma","_utma"),Sc=S("_utmz","_utmz"),Tc=S("_utmht","_utmht"),Ua=S("_hc",void 0,0),Xa=S("_ti",void 0,0),Wa=S("_to",void 0,20);cb("dimension([0-9]+)",function(a){return new bb(a[0],"cd"+a[1])});cb("metric([0-9]+)",function(a){return new bb(a[0],"cm"+a[1])});S("linkerParam",void 0,void 0,Bc,db);
var ld=S("usage","_u"),Gd=S("_um");S("forceSSL",void 0,void 0,function(){return Ba},function(a,b,c){J(34);Ba=!!c});var ed=S("_j1","jid");cb("\\&(.*)",function(a){var b=new bb(a[0],a[1]),c=yc(a[0].substring(1));c&&(b.Z=function(a){return a.get(c)},b.o=function(a,b,g,ca){a.set(c,g,ca)},b.F=void 0);return b});
var Qb=T("_oot"),dd=S("previewTask"),Rb=S("checkProtocolTask"),md=S("validationTask"),Sb=S("checkStorageTask"),Uc=S("historyImportTask"),Tb=S("samplerTask"),Vb=S("_rlt"),Wb=S("buildHitTask"),Xb=S("sendHitTask"),Vc=S("ceTask"),zd=S("devIdTask"),Cd=S("timingTask"),Ld=S("displayFeaturesTask"),V=T("name"),Q=T("clientId","cid"),n=T("clientIdTime"),Ad=S("userId","uid"),Na=T("trackingId","tid"),U=T("cookieName",void 0,"_ga"),W=T("cookieDomain"),Yb=T("cookiePath",void 0,"/"),Zb=T("cookieExpires",void 0,63072E3),
$b=T("legacyCookieDomain"),Wc=T("legacyHistoryImport",void 0,!0),ac=T("storage",void 0,"cookie"),bc=T("allowLinker",void 0,!1),cc=T("allowAnchor",void 0,!0),Ka=T("sampleRate","sf",100),dc=T("siteSpeedSampleRate",void 0,1),ec=T("alwaysSendReferrer",void 0,!1),gd=S("transportUrl"),Md=S("_r","_r");function X(a,b,c,d){b[a]=function(){try{return d&&J(d),c.apply(this,arguments)}catch(e){throw ge("exc",a,e&&e.name),e;}}};var Od=function(a){this.V=a;this.fa=void 0;this.$=!1;this.oa=void 0;this.ea=1},Ed=function(a,b){var c;if(a.fa&&a.$)return 0;a.$=!0;if(b){if(a.oa&&R(b,a.oa))return R(b,a.oa);if(0==b.get(dc))return 0}if(0==a.V)return 0;void 0===c&&(c=Bd());return 0==c%a.V?Math.floor(c/a.V)%a.ea+1:0};function fc(){var a,b,c;if((c=(c=O.navigator)?c.plugins:null)&&c.length)for(var d=0;d<c.length&&!b;d++){var e=c[d];-1<e.name.indexOf("Shockwave Flash")&&(b=e.description)}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b="WIN 6,0,21,0",a.AllowScriptAccess="always",b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=a.GetVariable("$version")}catch(g){}b&&
(a=b.match(/[\d]+/g))&&3<=a.length&&(b=a[0]+"."+a[1]+" r"+a[2]);return b||void 0};var aa=function(a){var b=Math.min(R(a,dc),100);return La(P(a,Q))%100>=b?!1:!0},gc=function(a){var b={};if(Ec(b)||Fc(b)){var c=b[Eb];void 0==c||Infinity==c||isNaN(c)||(0<c?(Y(b,Gb),Y(b,Jb),Y(b,Ib),Y(b,Fb),Y(b,Hb),Y(b,Kb),Y(b,Lb),a(b)):L(O,"load",function(){gc(a)},!1))}},Ec=function(a){var b=O.performance||O.webkitPerformance,b=b&&b.timing;if(!b)return!1;var c=b.navigationStart;if(0==c)return!1;a[Eb]=b.loadEventStart-c;a[Gb]=b.domainLookupEnd-b.domainLookupStart;a[Jb]=b.connectEnd-b.connectStart;a[Ib]=
b.responseStart-b.requestStart;a[Fb]=b.responseEnd-b.responseStart;a[Hb]=b.fetchStart-c;a[Kb]=b.domInteractive-c;a[Lb]=b.domContentLoadedEventStart-c;return!0},Fc=function(a){if(O.top!=O)return!1;var b=O.external,c=b&&b.onloadT;b&&!b.isValidLoadTime&&(c=void 0);2147483648<c&&(c=void 0);0<c&&b.setPageReadyTime();if(void 0==c)return!1;a[Eb]=c;return!0},Y=function(a,b){var c=a[b];if(isNaN(c)||Infinity==c||0>c)a[b]=void 0},Fd=function(a){return function(b){if("pageview"==b.get(Va)&&!a.I){a.I=!0;var c=
aa(b);b=0<E(b.get(kb),"gclid").length;(c||b)&&gc(function(b){a.send(c?"timing":"adtiming",b)})}}};var hc=!1,mc=function(a){if("cookie"==P(a,ac)){var b=P(a,U),c=nd(a),d=kc(P(a,Yb)),e=lc(P(a,W)),g=1E3*R(a,Zb),ca=P(a,Na);if("auto"!=e)zc(b,c,d,e,ca,g)&&(hc=!0);else{J(32);var l;a:{c=[];e=xa().split(".");if(4==e.length&&(l=e[e.length-1],parseInt(l,10)==l)){l=["none"];break a}for(l=e.length-2;0<=l;l--)c.push(e.slice(l).join("."));c.push("none");l=c}for(var k=0;k<l.length;k++)if(e=l[k],a.data.set(W,e),c=nd(a),zc(b,c,d,e,ca,g)){hc=!0;return}a.data.set(W,"auto")}}},nc=function(a){if("cookie"==P(a,ac)&&
!hc&&(mc(a),!hc))throw"abort";},Yc=function(a){if(a.get(Wc)){var b=P(a,W),c=P(a,$b)||xa(),d=Xc("__utma",c,b);d&&(J(19),a.set(Tc,(new Date).getTime(),!0),a.set(Rc,d.R),(b=Xc("__utmz",c,b))&&d.hash==b.hash&&a.set(Sc,b.R))}},nd=function(a){var b=Cc(P(a,Q)),c=lc(P(a,W)).split(".").length;a=jc(P(a,Yb));1<a&&(c+="-"+a);return["GA1",c,b].join(".")},Gc=function(a,b,c){for(var d=[],e=[],g,ca=0;ca<a.length;ca++){var l=a[ca];l.H[c]==b?d.push(l):void 0==g||l.H[c]<g?(e=[l],g=l.H[c]):l.H[c]==g&&e.push(l)}return 0<
d.length?d:e},lc=function(a){return 0==a.indexOf(".")?a.substr(1):a},kc=function(a){if(!a)return"/";1<a.length&&a.lastIndexOf("/")==a.length-1&&(a=a.substr(0,a.length-1));0!=a.indexOf("/")&&(a="/"+a);return a},jc=function(a){a=kc(a);return"/"==a?1:a.split("/").length};function Xc(a,b,c){"none"==b&&(b="");var d=[],e=Ca(a);a="__utma"==a?6:2;for(var g=0;g<e.length;g++){var ca=(""+e[g]).split(".");ca.length>=a&&d.push({hash:ca[0],R:e[g],O:ca})}if(0!=d.length)return 1==d.length?d[0]:Zc(b,d)||Zc(c,d)||Zc(null,d)||d[0]}function Zc(a,b){var c,d;null==a?c=d=1:(c=La(a),d=La(D(a,".")?a.substring(1):"."+a));for(var e=0;e<b.length;e++)if(b[e].hash==c||b[e].hash==d)return b[e]};var od=new RegExp(/^https?:\/\/([^\/:]+)/),pd=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;function Bc(a){a=a.get(Q);var b=Ic(a,0);return"_ga=1."+K(b+"."+a)}function Ic(a,b){for(var c=new Date,d=O.navigator,e=d.plugins||[],c=[a,d.userAgent,c.getTimezoneOffset(),c.getYear(),c.getDate(),c.getHours(),c.getMinutes()+b],d=0;d<e.length;++d)c.push(e[d].description);return La(c.join("."))}var Dc=function(a){J(48);this.target=a;this.T=!1};
Dc.prototype.ca=function(a,b){if(a.tagName){if("a"==a.tagName.toLowerCase()){a.href&&(a.href=qd(this,a.href,b));return}if("form"==a.tagName.toLowerCase())return rd(this,a)}if("string"==typeof a)return qd(this,a,b)};
var qd=function(a,b,c){var d=pd.exec(b);d&&3<=d.length&&(b=d[1]+(d[3]?d[2]+d[3]:""));a=a.target.get("linkerParam");var e=b.indexOf("?"),d=b.indexOf("#");c?b+=(-1==d?"#":"&")+a:(c=-1==e?"?":"&",b=-1==d?b+(c+a):b.substring(0,d)+c+a+b.substring(d));return b=b.replace(/&+_ga=/,"&_ga=")},rd=function(a,b){if(b&&b.action){var c=a.target.get("linkerParam").split("=")[1];if("get"==b.method.toLowerCase()){for(var d=b.childNodes||[],e=0;e<d.length;e++)if("_ga"==d[e].name){d[e].setAttribute("value",c);return}d=
M.createElement("input");d.setAttribute("type","hidden");d.setAttribute("name","_ga");d.setAttribute("value",c);b.appendChild(d)}else"post"==b.method.toLowerCase()&&(b.action=qd(a,b.action))}};
Dc.prototype.S=function(a,b,c){function d(c){try{c=c||O.event;var d;a:{var g=c.target||c.srcElement;for(c=100;g&&0<c;){if(g.href&&g.nodeName.match(/^a(?:rea)?$/i)){d=g;break a}g=g.parentNode;c--}d={}}("http:"==d.protocol||"https:"==d.protocol)&&sd(a,d.hostname||"")&&d.href&&(d.href=qd(e,d.href,b))}catch(k){J(26)}}var e=this;this.T||(this.T=!0,L(M,"mousedown",d,!1),L(M,"keyup",d,!1));c&&L(M,"submit",function(b){b=b||O.event;if((b=b.target||b.srcElement)&&b.action){var c=b.action.match(od);c&&sd(a,
c[1])&&rd(e,b)}})};function sd(a,b){if(b==M.location.hostname)return!1;for(var c=0;c<a.length;c++)if(a[c]instanceof RegExp){if(a[c].test(b))return!0}else if(0<=b.indexOf(a[c]))return!0;return!1};var p=/^(GTM|OPT)-[A-Z0-9]+$/,q=/;_gaexp=[^;]*/g,r=/;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g,t=function(a){function b(a,b){b&&(c+="&"+a+"="+K(b))}var c="https://www.google-analytics.com/gtm/js?id="+K(a.id);"dataLayer"!=a.B&&b("l",a.B);b("t",a.target);b("cid",a.ja);b("cidt",a.ka);b("gac",a.la);b("aip",a.ia);a.na&&b("m","sync");b("cycle",a.G);return c};var Jd=function(a,b,c){this.U=ed;this.aa=b;(b=c)||(b=(b=P(a,V))&&"t0"!=b?Wd.test(b)?"_gat_"+Cc(P(a,Na)):"_gat_"+Cc(b):"_gat");this.Y=b;Ed(new Od(100),a)&&(J(30),this.pa=!0)},Rd=function(a,b){var c=b.get(Wb);b.set(Wb,function(b){Pd(a,b);var d=c(b);Qd(a,b);return d});var d=b.get(Xb);b.set(Xb,function(b){var c=d(b);Id(a,b);return c})},Pd=function(a,b){b.get(a.U)||("1"==Ca(a.Y)[0]?b.set(a.U,"",!0):b.set(a.U,""+hd(),!0))},Qd=function(a,b){if(b.get(a.U)){var c=6E5;a.pa&&(c/=10);zc(a.Y,"1",b.get(Yb),b.get(W),
b.get(Na),c)}},Id=function(a,b){if(b.get(a.U)){var c=new ee,d=function(a){$a(a).F&&c.set($a(a).F,b.get(a))};d(hb);d(ib);d(Na);d(Q);d(Ad);d(a.U);c.set($a(ld).F,Td(b));var e=a.aa;c.map(function(a,b){e+=K(a)+"=";e+=K(""+b)+"&"});e+="z="+hd();ta(e);b.set(a.U,"",!0)}},Wd=/^gtm\d+$/;var fd=function(a,b){var c=a.b;if(!c.get("dcLoaded")){Nd(c,29);b=b||{};var d;b[U]&&(d=Cc(b[U]));d=new Jd(c,"https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&",d);Rd(d,c);c.set("dcLoaded",!0)}};var Sd=function(a){if(!a.get("dcLoaded")&&"cookie"==a.get(ac)){Nd(a,51);var b=new Jd(a);Pd(b,a);Qd(b,a);a.get(b.U)&&(a.set(Md,1,!0),a.set(gd,oc()+"/r/collect",!0))}};var Lc=function(){var a=O.gaGlobal=O.gaGlobal||{};return a.hid=a.hid||hd()};var ad,bd=function(a,b,c){if(!ad){var d;d=M.location.hash;var e=O.name,g=/^#?gaso=([^&]*)/;if(e=(d=(d=d&&d.match(g)||e&&e.match(g))?d[1]:Ca("GASO")[0]||"")&&d.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))zc("GASO",""+d,c,b,a,0),window._udo||(window._udo=b),window._utcp||(window._utcp=c),a=e[1],wa("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+hd(),"_gasojs");ad=!0}};var wb=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,pc=function(a){function b(a,b){d.b.data.set(a,b)}function c(a,c){b(a,c);d.filters.add(a)}var d=this;this.b=new Ya;this.filters=new Ha;b(V,a[V]);b(Na,sa(a[Na]));b(U,a[U]);b(W,a[W]||xa());b(Yb,a[Yb]);b(Zb,a[Zb]);b($b,a[$b]);b(Wc,a[Wc]);b(bc,a[bc]);b(cc,a[cc]);b(Ka,a[Ka]);b(dc,a[dc]);b(ec,a[ec]);b(ac,a[ac]);b(Ad,a[Ad]);b(n,a[n]);b(hb,1);b(ib,"j47");c(Qb,Ma);c(dd,cd);c(Rb,Oa);c(md,vb);c(Sb,nc);c(Uc,Yc);c(Tb,Ja);c(Vb,Ta);c(Vc,Hc);c(zd,yd);c(Ld,Sd);c(Wb,Pa);c(Xb,Sa);
c(Cd,Fd(this));Jc(this.b,a[Q]);Kc(this.b);this.b.set(jb,Lc());bd(this.b.get(Na),this.b.get(W),this.b.get(Yb))},Jc=function(a,b){if("cookie"==P(a,ac)){hc=!1;var c;b:{var d=Ca(P(a,U));if(d&&!(1>d.length)){c=[];for(var e=0;e<d.length;e++){var g;g=d[e].split(".");var ca=g.shift();("GA1"==ca||"1"==ca)&&1<g.length?(ca=g.shift().split("-"),1==ca.length&&(ca[1]="1"),ca[0]*=1,ca[1]*=1,g={H:ca,s:g.join(".")}):g=void 0;g&&c.push(g)}if(1==c.length){J(13);c=c[0].s;break b}if(0==c.length)J(12);else{J(14);d=lc(P(a,
W)).split(".").length;c=Gc(c,d,0);if(1==c.length){c=c[0].s;break b}d=jc(P(a,Yb));c=Gc(c,d,1);c=c[0]&&c[0].s;break b}}c=void 0}c||(c=P(a,W),d=P(a,$b)||xa(),c=Xc("__utma",d,c),void 0!=c?(J(10),c=c.O[1]+"."+c.O[2]):c=void 0);c&&(a.data.set(Q,c),hc=!0)}c=a.get(cc);if(e=E(M.location[c?"href":"search"],"_ga"))a.get(bc)?(c=e.indexOf("."),-1==c?J(22):(d=e.substring(c+1),"1"!=e.substring(0,c)?J(22):(c=d.indexOf("."),-1==c?J(22):(e=d.substring(0,c),c=d.substring(c+1),e!=Ic(c,0)&&e!=Ic(c,-1)&&e!=Ic(c,-2)?J(23):
(J(11),a.data.set(Q,c)))))):J(21);b&&(J(9),a.data.set(Q,K(b)));if(!a.get(Q))if(c=(c=O.gaGlobal&&O.gaGlobal.vid)&&-1!=c.search(/^(?:utma\.)?\d+\.\d+$/)?c:void 0)J(17),a.data.set(Q,c);else{J(8);c=O.navigator.userAgent+(M.cookie?M.cookie:"")+(M.referrer?M.referrer:"");d=c.length;for(e=O.history.length;0<e;)c+=e--^d++;a.data.set(Q,[hd()^La(c)&2147483647,Math.round((new Date).getTime()/1E3)].join("."))}mc(a)},Kc=function(a){var b=O.navigator,c=O.screen,d=M.location;a.set(lb,ya(a.get(ec)));if(d){var e=
d.pathname||"";"/"!=e.charAt(0)&&(J(31),e="/"+e);a.set(kb,d.protocol+"//"+d.hostname+e+d.search)}c&&a.set(qb,c.width+"x"+c.height);c&&a.set(pb,c.colorDepth+"-bit");var c=M.documentElement,g=(e=M.body)&&e.clientWidth&&e.clientHeight,ca=[];c&&c.clientWidth&&c.clientHeight&&("CSS1Compat"===M.compatMode||!g)?ca=[c.clientWidth,c.clientHeight]:g&&(ca=[e.clientWidth,e.clientHeight]);c=0>=ca[0]||0>=ca[1]?"":ca.join("x");a.set(rb,c);a.set(tb,fc());a.set(ob,M.characterSet||M.charset);a.set(sb,b&&"function"===
typeof b.javaEnabled&&b.javaEnabled()||!1);a.set(nb,(b&&(b.language||b.browserLanguage)||"").toLowerCase());if(d&&a.get(cc)&&(b=M.location.hash)){b=b.split(/[?&#]+/);d=[];for(c=0;c<b.length;++c)(D(b[c],"utm_id")||D(b[c],"utm_campaign")||D(b[c],"utm_source")||D(b[c],"utm_medium")||D(b[c],"utm_term")||D(b[c],"utm_content")||D(b[c],"gclid")||D(b[c],"dclid")||D(b[c],"gclsrc"))&&d.push(b[c]);0<d.length&&(b="#"+d.join("&"),a.set(kb,a.get(kb)+b))}};pc.prototype.get=function(a){return this.b.get(a)};
pc.prototype.set=function(a,b){this.b.set(a,b)};var qc={pageview:[mb],event:[ub,xb,yb,zb],social:[Bb,Cb,Db],timing:[Mb,Nb,Pb,Ob]};pc.prototype.send=function(a){if(!(1>arguments.length)){var b,c;"string"===typeof arguments[0]?(b=arguments[0],c=[].slice.call(arguments,1)):(b=arguments[0]&&arguments[0][Va],c=arguments);b&&(c=za(qc[b]||[],c),c[Va]=b,this.b.set(c,void 0,!0),this.filters.D(this.b),this.b.data.m={})}};
pc.prototype.ma=function(a,b){var c=this;u(a,c,b)||(v(a,function(){u(a,c,b)}),y(String(c.get(V)),a,void 0,b,!0))};var rc=function(a){if("prerender"==M.visibilityState)return!1;a();return!0},z=function(a){if(!rc(a)){J(16);var b=!1,c=function(){if(!b&&rc(a)){b=!0;var d=c,e=M;e.removeEventListener?e.removeEventListener("visibilitychange",d,!1):e.detachEvent&&e.detachEvent("onvisibilitychange",d)}};L(M,"visibilitychange",c)}};var td=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,sc=function(a){if(ea(a[0]))this.u=a[0];else{var b=td.exec(a[0]);null!=b&&4==b.length&&(this.c=b[1]||"t0",this.K=b[2]||"",this.C=b[3],this.a=[].slice.call(a,1),this.K||(this.A="create"==this.C,this.i="require"==this.C,this.g="provide"==this.C,this.ba="remove"==this.C),this.i&&(3<=this.a.length?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(qa(this.a[1])?this.X=this.a[1]:this.W=this.a[1])));b=a[1];a=a[2];if(!this.C)throw"abort";if(this.i&&(!qa(b)||""==b))throw"abort";
if(this.g&&(!qa(b)||""==b||!ea(a)))throw"abort";if(ud(this.c)||ud(this.K))throw"abort";if(this.g&&"t0"!=this.c)throw"abort";}};function ud(a){return 0<=a.indexOf(".")||0<=a.indexOf(":")};var Yd,Zd,$d,A;Yd=new ee;$d=new ee;A=new ee;Zd={ec:45,ecommerce:46,linkid:47};
var u=function(a,b,c){b==N||b.get(V);var d=Yd.get(a);if(!ea(d))return!1;b.plugins_=b.plugins_||new ee;if(b.plugins_.get(a))return!0;b.plugins_.set(a,new d(b,c||{}));return!0},y=function(a,b,c,d,e){if(!ea(Yd.get(b))&&!$d.get(b)){Zd.hasOwnProperty(b)&&J(Zd[b]);if(p.test(b)){J(52);a=N.j(a);if(!a)return!0;c=d||{};d={id:b,B:c.dataLayer||"dataLayer",ia:!!a.get("anonymizeIp"),na:e,G:!1};a.get("&gtm")==b&&(d.G=!0);var g=String(a.get("name"));"t0"!=g&&(d.target=g);G(String(a.get("trackingId")))||(d.ja=String(a.get(Q)),
d.ka=Number(a.get(n)),a=c.palindrome?r:q,a=(a=M.cookie.replace(/^|(; +)/g,";").match(a))?a.sort().join("").substring(1):void 0,d.la=a);a=d.B;c=(new Date).getTime();O[a]=O[a]||[];c={"gtm.start":c};e||(c.event="gtm.js");O[a].push(c);c=t(d)}!c&&Zd.hasOwnProperty(b)?(J(39),c=b+".js"):J(43);c&&(c&&0<=c.indexOf("/")||(c=(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+c),d=ae(c),a=d.protocol,c=M.location.protocol,("https:"==a||a==c||("http:"!=a?0:"http:"==c))&&B(d)&&(wa(d.url,void 0,
e),$d.set(b,!0)))}},v=function(a,b){var c=A.get(a)||[];c.push(b);A.set(a,c)},C=function(a,b){Yd.set(a,b);for(var c=A.get(a)||[],d=0;d<c.length;d++)c[d]();A.set(a,[])},B=function(a){var b=ae(M.location.href);if(D(a.url,"https://www.google-analytics.com/gtm/js?id="))return!0;if(a.query||0<=a.url.indexOf("?")||0<=a.path.indexOf("://"))return!1;if(a.host==b.host&&a.port==b.port)return!0;b="http:"==a.protocol?80:443;return"www.google-analytics.com"==a.host&&(a.port||b)==b&&D(a.path,"/plugins/")?!0:!1},
ae=function(a){function b(a){var b=(a.hostname||"").split(":")[0].toLowerCase(),c=(a.protocol||"").toLowerCase(),c=1*a.port||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";D(a,"/")||(a="/"+a);return[b,""+c,a]}var c=M.createElement("a");c.href=M.location.href;var d=(c.protocol||"").toLowerCase(),e=b(c),g=c.search||"",ca=d+"//"+e[0]+(e[1]?":"+e[1]:"");D(a,"//")?a=d+a:D(a,"/")?a=ca+a:!a||D(a,"?")?a=ca+e[2]+(a||g):0>a.split("/")[0].indexOf(":")&&(a=ca+e[2].substring(0,e[2].lastIndexOf("/"))+"/"+
a);c.href=a;d=b(c);return{protocol:(c.protocol||"").toLowerCase(),host:d[0],port:d[1],path:d[2],query:c.search||"",url:a||""}};var Z={ga:function(){Z.f=[]}};Z.ga();Z.D=function(a){var b=Z.J.apply(Z,arguments),b=Z.f.concat(b);for(Z.f=[];0<b.length&&!Z.v(b[0])&&!(b.shift(),0<Z.f.length););Z.f=Z.f.concat(b)};Z.J=function(a){for(var b=[],c=0;c<arguments.length;c++)try{var d=new sc(arguments[c]);d.g?C(d.a[0],d.a[1]):(d.i&&(d.ha=y(d.c,d.a[0],d.X,d.W)),b.push(d))}catch(e){}return b};
Z.v=function(a){try{if(a.u)a.u.call(O,N.j("t0"));else{var b=a.c==gb?N:N.j(a.c);if(a.A)"t0"!=a.c||N.create.apply(N,a.a);else if(a.ba)N.remove(a.c);else if(b)if(a.i){if(a.ha&&(a.ha=y(a.c,a.a[0],a.X,a.W)),!u(a.a[0],b,a.W))return!0}else if(a.K){var c=a.C,d=a.a,e=b.plugins_.get(a.K);e[c].apply(e,d)}else b[a.C].apply(b,a.a)}}catch(g){}};var N=function(a){J(1);Z.D.apply(Z,[arguments])};N.h={};N.P=[];N.L=0;N.answer=42;var uc=[Na,W,V];N.create=function(a){var b=za(uc,[].slice.call(arguments));b[V]||(b[V]="t0");var c=""+b[V];if(N.h[c])return N.h[c];b=new pc(b);N.h[c]=b;N.P.push(b);return b};N.remove=function(a){for(var b=0;b<N.P.length;b++)if(N.P[b].get(V)==a){N.P.splice(b,1);N.h[a]=null;break}};N.j=function(a){return N.h[a]};N.getAll=function(){return N.P.slice(0)};
N.N=function(){"ga"!=gb&&J(49);var a=O[gb];if(!a||42!=a.answer){N.L=a&&a.l;N.loaded=!0;var b=O[gb]=N;X("create",b,b.create);X("remove",b,b.remove);X("getByName",b,b.j,5);X("getAll",b,b.getAll,6);b=pc.prototype;X("get",b,b.get,7);X("set",b,b.set,4);X("send",b,b.send);X("requireSync",b,b.ma);b=Ya.prototype;X("get",b,b.get);X("set",b,b.set);if(!Ud()&&!Ba){a:{for(var b=M.getElementsByTagName("script"),c=0;c<b.length&&100>c;c++){var d=b[c].src;if(d&&0==d.indexOf("https://www.google-analytics.com/analytics")){J(33);
b=!0;break a}}b=!1}b&&(Ba=!0)}Ud()||Ba||!Ed(new Od(1E4))||(J(36),Ba=!0);(O.gaplugins=O.gaplugins||{}).Linker=Dc;b=Dc.prototype;C("linker",Dc);X("decorate",b,b.ca,20);X("autoLink",b,b.S,25);C("displayfeatures",fd);C("adfeatures",fd);a=a&&a.q;ka(a)?Z.D.apply(N,a):J(50)}};N.da=function(){for(var a=N.getAll(),b=0;b<a.length;b++)a[b].get(V)};var H=N.N,I=O[gb];I&&I.r?H():z(H);z(function(){Z.D(["provide","render",ua])});function La(a){var b=1,c,d;if(a)for(b=0,d=a.length-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b;return b};})(window);
// Copyright 2012 Google Inc. All rights reserved.
// Container Version: 278
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){


var __awct;(function(){var a=!1,b=[],c=function(a){var b=n("google_trackConversion"),c=a.gtm_onFailure;"function"==typeof b?b(a)||c():c()},d=function(){for(;0<b.length;)c(b.shift())};(function(a){__awct=a;__awct.a="awct";__awct.b=["google"];__awct.isVendorTemplate=!0})(function(e){var f={google_conversion_domain:"",google_conversion_id:e["47"],google_conversion_label:e["48"],google_conversion_value:e["49"]||0,google_remarketing_only:!1,
onload_callback:e["55"],gtm_onFailure:e["56"]};e["50"]&&(f.google_conversion_currency=e["50"]);e[""]&&(f.google_conversion_order_id=e[""]);b.push(f);a||(a=!0,ea("//www.googleadservices.com/pagead/conversion_async.js",function(){d();b={push:c}},function(){d();a=!1}))})})();

var __c;__c=function(a){return a["54"]};__c.a="c";__c.b=["google"];__c.isVendorTemplate=!0;



var __cegg;(function(){var a={};(function(a){__cegg=a;__cegg.a="cegg";__cegg.b=["nonGoogleScripts"];__cegg.isVendorTemplate=!0})(function(b){try{var c=b["53"];if(c)if(a.hasOwnProperty(c)&&!0===a[c])b["55"]();else{b[""]&&(w.CE_SNAPSHOT_NAME=b[""]);for(var d=c.toString();8>d.length;)d="0"+d;var e=d.replace(/(\d+)(\d{4})$/,"/pages/scripts/$1/$2.js");ea("//dnn506yrbagrg.cloudfront.net"+e+"?"+Math.floor((new Date).getTime()/
36E5),b["55"],b["56"]);a[c]=!0}else x(b["56"])}catch(f){x(b["56"])}})})();
var __pa;__pa=function(a){try{var b=n("_pa",{},!0);if(b.fired)a["55"]();else{a[""]&&(b.orderId=a[""]);a[""]&&(b.revenue=a[""]);a[""]&&(b.productId=a[""]);var c=ba(w.location.href).protocol;"https:"!=c&&(c="http:");r(c+"//tag.marinsm.com/serve/"+a["51"]+".js",a["55"],a["56"])}}catch(d){x(a["56"])}};
__pa.a="pa";__pa.b=["nonGoogleScripts"];__pa.isVendorTemplate=!0;

var Va=this;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Wa=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Xa=function(a){if(null==a)return String(a);var b=Wa.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Za=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Ga=function(a){if(!a||"object"!=Xa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Za(a,"constructor")&&!Za(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Za(a,b)},$a=function(a,b){var c=b||("array"==Xa(a)?[]:{}),d;for(d in a)if(Za(a,d)){var e=a[d];"array"==Xa(e)?("array"!=Xa(c[d])&&(c[d]=[]),c[d]=$a(e,c[d])):Ga(e)?(Ga(c[d])||(c[d]={}),c[d]=$a(e,c[d])):c[d]=e}return c};var La=null,ab=Math.random(),bb=null,cb=null,Sa=!1,db={},eb={},Ta={};var fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,S,sb,ub,vb,wb,xb,yb,zb,Ab,Bb,Cb,Db,Eb,Fb,Gb,Hb,Ib,Jb,Lb,Mb,Nb,Ob,Qb,Rb,Sb,Tb,Ub,Vb,Wb,Xb,Yb,Zb,$b,ac,bc,cc,dc,ec,fc,gc,hc,ic,jc,kc,lc,mc,nc,oc,pc,qc,rc,sc,tc,uc,wc,xc,yc,zc,Ac,Bc,Cc,Dc,Ec,Fc,Gc,Hc,Ic,Jc,Kc,Lc,Mc,Nc,Oc,Pc,Qc,Rc,Sc,Tc,Uc,Vc,Wc,Xc,Yc,Zc,$c,U,ad,bd,cd,dd,ed,fd,gd,hd,id,jd,kd,ld,od,pd,qd,rd,sd,vd,wd,xd,yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Yd,Zd,$d,ae,be,ce,de,ee,fe,ge,he,ie,je,ke,le,me,ne,oe,pe,qe,re,se,te,
ue,ve,we,xe,ye,ze,Ae,Be,Ce,De,Ee,Fe,Ge,He,Ie,Je,Ke,Le,Me,Ne,Oe,Pe,Qe,Re,Se,Te,Ue,Ve,We,Xe,Ye,Ze,$e,af,bf,cf,df,ef,ff,gf,hf,jf;
(function(){var a=function(a){return{toString:function(){return a}}};fb=a("");gb=a("0");hb="";ib=a("");jb=a("");kb=a("");lb=a("");mb=a("");nb=a("");ob=a("");pb=a("");qb=a("3");S=a("4");sb=a("");ub=a("");vb=a("");
wb=a("5");xb=a("6");yb=a("");zb=a("");Ab=a("");Bb=a("");Cb=a("");Db=a("");Eb=a("");Fb=a("");Gb=a("");Hb=a("");Ib=a("");Jb=a("");
Lb=a("");Mb=a("");Nb=a("");Ob=a("");Qb=a("");Rb=a("");Sb=a("7");Tb=a("");Ub=a("");Vb=a("");Wb=a("");Xb=a("");Yb=a("");Zb=a("");$b=a("");ac=a("");bc=a("");
cc=a("");dc=a("");ec=a("");fc=a("");gc=a("8");hc=a("");ic=a("9");jc=a("");kc=a("10");lc=a("11");mc=a("");nc=a("12");oc=a("");pc=a("");qc=a("13");rc=a("");sc=a("");
tc=a("");uc=a("14");wc=a("");xc=a("15");yc=a("");zc=a("16");Ac=a("");Bc=a("");Cc=a("");Dc=a("");Ec=a("");Fc=a("");Gc=a("17");Hc=a("");Ic=a("");Jc=a("18");
Kc=a("19");Lc=a("20");Mc=a("21");Nc=a("");Oc=a("");Pc=a("");Qc=a("");Rc=a("22");Sc=a("");Tc=a("");Uc=a("23");Vc=a("");Wc=a("55");Xc=a("56");Yc=a("");Zc=a("");$c=a("24");
U=a("25");ad=a("26");bd=a("");cd=a("");dd=a("27");ed=a("28");fd=a("");gd=a("");hd=a("29");id=a("");jd=a("");kd=a("");ld=a("");od=a("");pd=a("");qd=a("");rd=a("30");sd=a("");vd=a("");wd=
a("");xd=a("");yd=a("");zd=a("31");Ad=a("");Bd=a("");Cd=a("");Dd=a("");Ed=a("32");Fd=a("");Gd=a("");Hd=a("");Id=a("");Jd=a("33");Kd=a("");Ld=a("35");Md=a("");Nd=a("");Od=a("");Pd=a("");
Qd=a("");Rd=a("");Sd=a("");Td=a("");Ud=a("");Vd=a("");Wd=a("");Xd=a("");Yd=a("");Zd=a("");$d=a("");ae=a("");be=a("");ce=a("");de=a("36");ee=a("");fe=a("");ge=a("");he=a("");
ie=a("");je=a("");ke=a("");le=a("");me=a("");ne=a("");oe=a("");pe=a("");qe=a("");re=a("");se=a("37");te=a("38");ue=a("39");ve=a("");we=a("40");xe=
a("");ye=a("");ze=a("");Ae=a("");Be=a("");Ce=a("");De=a("");Ee=a("");Fe=a("");Ge=a("");He=a("");Ie=a("");Je=a("");Ke=a("");Le=a("");Me=a("");Ne=a("41");
Oe=a("42");Pe=a("");Qe=a("");Re=a("");Se=a("");Te="";Ue=a("");Ve=a("");We=a("");Xe=a("43");Ye=a("");Ze=a("44");$e=a("");af=a("");bf=a("");cf=a("");df=a("");ef=
a("45");ff=a("");gf=a("");hf=a("");jf=a("")})();var kf=function(){},O=function(a){return"function"==typeof a},xa=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},lf=function(a){return"number"==Xa(a)&&!isNaN(a)},mf=function(a){return/^[0-9]+$/.test(a)},nf=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},of=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},K=function(a){return Math.round(Number(a))||0},Da=function(a){return"false"==
String(a).toLowerCase()?!1:!!a},pf=function(a){var b=[];if(xa(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},H=function(){return new Date},qf=function(a,b){if(!lf(a)||!lf(b)||a>b)a=0,b=2147483647;return Math.round(Math.random()*(b-a)+a)},rf=function(){this.prefix="gtm.";this.values={}};rf.prototype.set=function(a,b){this.values[this.prefix+a]=b};rf.prototype.get=function(a){return this.values[this.prefix+a]};rf.prototype.contains=function(a){return void 0!==this.get(a)};
var sf=function(a,b,c){try{if(!a[yd])return a[Uc](a,b||kf,c||kf);c&&c()}catch(d){}return!1},tf=function(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b).push(c)}for(var d=of(b).split("&"),e=0;e<d.length;e++)if(d[e]){var f=d[e].indexOf("=");0>f?c(d[e],"1"):c(d[e].substring(0,f),d[e].substring(f+1))}},uf=function(a){var b=a?a.length:0;return 0<b?a[b-1]:""},Bf=function(a){return function(){return a("GTM-JD26")}},Cf=function(a){for(var b=0;b<a.length;b++)a[b]()},Df=H().getTime(),Fa=function(){return"gtm"+
Df++},Ha=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ef=function(a){return null!==a&&void 0!==a&&void 0!==a.length},Ff=function(a,b){0==b?a.Wa=!0:a.complete=!0;var c=a.g;a.s&&(a.s.Ha[c]=b);db[c]&&(db[c].state=b)},Gf=function(a,b){a.sort(function(a,d){return b(a,d)?-1:b(d,a)?1:0})};var w=window,J=document,Jf=navigator,Q=function(a,b){var c=w[a];w[a]=void 0===c?b:c;return w[a]},I=function(a,b,c,d){return(d||"http:"!=w.location.protocol?a:b)+c},Kf=function(a){var b=J.getElementsByTagName("script")[0]||J.body||J.head;b.parentNode.insertBefore(a,b)},Ka=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},r=function(a,b,c){var d=J.createElement("script");d.type="text/javascript";d.async=
!0;d.src=a;Ka(d,b);c&&(d.onerror=c);Kf(d);return d},ga=function(a,b){var c=J.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";Kf(c);Ka(c,b);void 0!==a&&(c.src=a);return c},G=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a},L=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},x=function(a){w.setTimeout(a,0)},Na=!1,
Oa=[],Lf=function(a){if(!Na){var b=J.createEventObject,c="complete"==J.readyState,d="interactive"==J.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Na=!0;for(var e=0;e<Oa.length;e++)Oa[e]()}Oa.push=function(){for(var a=0;a<arguments.length;a++)x(arguments[a]);return 0}}},Mf=0,Nf=function(){if(!Na&&140>Mf){Mf++;try{J.documentElement.doScroll("left"),Lf()}catch(a){w.setTimeout(Nf,50)}}},za=function(a){var b=J.getElementById(a);if(b&&sa(b,"id")!=a)for(var c=1;c<document.all[a].length;c++)if(sa(document.all[a][c],
"id")==a)return document.all[a][c];return b},sa=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},va=function(a){return a.target||a.srcElement||{}},Ra=function(a){var b=J.createElement("div");b.innerHTML="A<div>"+a+"</div>";for(var b=b.lastChild,c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},wa=function(a,b){for(var c={},d=0;d<b.length;d++)c[b[d]]=!0;for(var e=a,d=0;e&&!c[String(e.tagName).toLowerCase()]&&100>d;d++)e=e.parentElement;e&&!c[String(e.tagName).toLowerCase()]&&
(e=null);return e},Of=!1,Pf=[],Qf=function(){if(!Of){Of=!0;for(var a=0;a<Pf.length;a++)Pf[a]()}},Rf=function(a){a=a||w;var b=a.location.href,c=b.indexOf("#");return 0>c?"":b.substring(c+1)},Pa=function(a){window.console&&window.console.log&&window.console.log(a)};var aa=function(a,b,c,d,e){var f,g=(a.protocol.replace(":","")||w.location.protocol.replace(":","")).toLowerCase();switch(b){case "protocol":f=g;break;case "host":f=(a.hostname||w.location.hostname).split(":")[0].toLowerCase();if(c){var h=/^www\d*\./.exec(f);h&&h[0]&&(f=f.substr(h[0].length))}break;case "port":f=String(1*(a.hostname?a.port:w.location.port)||("http"==g?80:"https"==g?443:""));break;case "path":f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var k=f.split("/");0<=nf(d||[],k[k.length-
1])&&(k[k.length-1]="");f=k.join("/");break;case "query":f=a.search.replace("?","");if(e)a:{for(var l=f.split("&"),m=0;m<l.length;m++){var p=l[m].split("=");if(decodeURIComponent(p[0]).replace(/\+/g," ")==e){f=decodeURIComponent(p.slice(1).join("=")).replace(/\+/g," ");break a}}f=void 0}break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},Sf=function(a){var b="";a&&a.href&&(b=a.hash?a.href.replace(a.hash,""):a.href);return b},ba=function(a){var b=J.createElement("a");
a&&(b.href=a);return b};var ia=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var fa=function(a){var b=["veinteractive.com","ve-interactive.cn"];if(!a)return!1;var c=aa(ba(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1},Ca=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null};var Tf=new rf,Uf={},Wf={set:function(a,b){$a(Vf(a,b),Uf)},get:function(a){return P(a,2)},reset:function(){Tf=new rf;Uf={}}},P=function(a,b){if(2==b){for(var c=Uf,d=a.split("."),e=0;e<d.length;e++){if(void 0===c[d[e]])return;c=c[d[e]]}return c}return Tf.get(a)},Vf=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c};var Xf=Math.random(),Yf="0.100000">Xf;var Zf=function(a,b){Yf&&G("//www.googletagmanager.com/a?id=GTM-JD26&cv=278&v=t&n="+a+(void 0!==b?"&s="+encodeURIComponent(b):"")+"&l="+(H().getTime()-K(bb))+"&sr=0.100000&ps="+Xf+"&cb="+qf());},$f=kf;var ag=kf,bg=[],cg=!1,ca=function(a){return w["dataLayer"].push(a)},dg=function(a){var b=!1;return function(){!b&&O(a)&&x(Bf(a));b=!0}},jg=function(){for(var a=!1;!cg&&0<bg.length;){cg=!0;var b=bg.shift();if(O(b))try{b.call(Wf)}catch(ya){}else if(xa(b))a:{var c=b;if("string"==Xa(c[0])){for(var d=c[0].split("."),e=d.pop(),f=c.slice(1),g=Uf,h=0;h<d.length;h++){if(void 0===g[d[h]])break a;g=g[d[h]]}try{g[e].apply(g,f)}catch(ya){}}}else{var k=b,l=void 0;for(l in k)if(k.hasOwnProperty(l)){var m=l,
p=k[l];Tf.set(m,p);$a(Vf(m,p),Uf)}var q=!1,t=k.event,y=void 0;if(t){y=Df++;cb=t;if(!k["gtm.uniqueEventId"]){var u=y;Tf.set("gtm.uniqueEventId",u);$a(Vf("gtm.uniqueEventId",u),Uf)}var z=dg(k.eventCallback),E=k.eventTimeout;E&&w.setTimeout(z,Number(E));q=ag(y,t,z,k.eventReporter)}bb||(bb=k["gtm.start"])&&$f();var D=k,C=y,A=t,M=Uf;if(!q){var F=y,N=t;
}cb=null;a=q||a}var T=b,R=Uf;ig();cg=!1}return!a},kg=function(){var a=jg();try{var b=w["dataLayer"].hide;if(b&&void 0!==b["GTM-JD26"]&&b.end){b["GTM-JD26"]=!1;var c=!0,d;for(d in b)if(!0===b[d]){c=!1;break}c&&(b.end(),
b.end=null)}}catch(e){}return a};var ua=function(a,b,c){L(a,b,c,void 0)},ea=function(a,b,c){r(a,b,c)},Ua=function(a,b){w[a]=b},n=function(a,b,c){var d=w;b&&(void 0===d[a]||c&&!d[a])&&(d[a]=b);return d[a]},v=function(a,b,c){return("https:"==w.location.protocol?a:b)+c};var lg=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),mg={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},ng={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels",
"customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},og=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},pg=function(){var a=P("gtm.whitelist");
var b=a&&og(pf(a),mg),c=P("gtm.blacklist")||P("tagTypeBlacklist")||[];lg.test(w.location&&w.location.hostname)&&(c=pf(c),c.push("nonGooglePixels","nonGoogleScripts"));var d=c&&og(pf(c),ng),e={};return function(f){var g=f&&f[Uc];if(!g)return!0;if(void 0!==e[g.a])return e[g.a];var h=!0;if(a)a:{if(0>nf(b,g.a))if(g.b&&0<g.b.length)for(var k=0;k<g.b.length;k++){if(0>nf(b,
g.b[k])){h=!1;break a}}else{h=!1;break a}h=!0}var l=!1;if(c){var m;if(!(m=0<=nf(d,g.a)))a:{for(var p=g.b||[],q=new rf,t=0;t<d.length;t++)q.set(d[t],!0);for(t=0;t<p.length;t++)if(q.get(p[t])){m=!0;break a}m=!1}l=m}return e[g.a]=!h||l}};var _jsm=function(a){if(void 0!==a[hd])try{var b=w.google_tag_manager;return b&&b.e&&b.e(a[hd])}catch(c){}};_jsm.a="jsm";_jsm.b=["customScripts"];var _c=function(a){return a[ef]};_c.a="c";_c.b=["google"];var _k=function(a){for(var b=String(P("gtm.cookie")||J.cookie).split(";"),c=0;c<b.length;c++){var d=b[c].split("="),e=of(d[0]);if(e&&e==a[Ed]){var f=of(d.slice(1).join("="));return f&&a[lc]?decodeURIComponent(f):f}}};_k.a="k";_k.b=[];var Hf=function(a){var b=J;return qg?b.querySelectorAll(a):null},rg=!1;if(J.querySelectorAll)try{var sg=J.querySelectorAll(":root");sg&&1==sg.length&&sg[0]==J.documentElement&&(rg=!0)}catch(a){}var qg=rg;var tg=void 0,ug="",vg=0,wg=void 0,_et=function(a){var b,c=P("gtm.element"),d=P("event"),e=Number(H());if(tg===c&&ug===d&&vg>e-250)b=wg;else{var f;if(c){var g=c.innerText||c.textContent||"";g&&" "!=g&&(g=g.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));g&&(g=g.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));f=g}else f="";wg=b=f;tg=c;ug=d}vg=e;return b?b:a[qc]};_et.a="et";_et.b=["google"];var _eu=function(a){var b=String(P("gtm.elementUrl")||a[qc]||""),c=ba(b);return b};_eu.a="eu";_eu.b=["google"];var _e=function(){return cb};_e.a="e";_e.b=["google"];var xg=/(^|\.)doubleclick\.net$/i,yg=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ea=function(a){for(var b=String(J.cookie).split(";"),c=[],d=0;d<b.length;d++){var e=b[d].split("="),f=of(e[0]);if(f&&f==a){var g=of(e.slice(1).join("="));g&&(g=decodeURIComponent(g));c.push(g)}}return c},zg=function(a,b,c,d,e){if(xg.test(J.location.hostname)||"/"==c&&yg.test(d))return!1;var f=a+"="+b+"; ";c&&(f+="path="+c+"; ");e&&(f+="expires="+e.toGMTString()+"; ");d&&(f+="domain="+d+";");var g=J.cookie;J.cookie=f;return g!=
J.cookie||0<=nf(Ea(a),b)},Ag=function(a){if("none"==a)return 0;0==a.indexOf(".")&&(a=a.substr(1));return a.split(".").length},Bg=function(a){var b=a;b?(1<b.length&&b.lastIndexOf("/")==b.length-1&&(b=b.substr(0,b.length-1)),0!=b.indexOf("/")&&(b="/"+b),a=b):a="/";return"/"==a?1:a.split("/").length},Cg=function(){var a=aa(w.location,"host",!0).split(".");if(4==a.length&&/^[0-9]*$/.exec(a[3]))return["none"];for(var b=[],c=a.length-2;0<=c;c--)b.push(a.slice(c).join("."));b.push("none");return b};var Dg=function(a,b){this.f=a;this.j=b};Dg.prototype.toString=function(){var a=""+this.f;1<this.j&&(a=a+"-"+this.j);return a};var Eg=function(a,b){this.Fa=a;this.ka=b};Eg.prototype.toString=function(){return""+this.ka+"."+this.Fa};var Hg=function(a,b){var c=new Fg(null,a,b);Gg(c);return c},Fg=function(a,b,c){this.Oa=Math.floor(H().getTime()/864E5);this.ja=b||"auto";this.aa=c||"/";var d=Ag(this.ja),e=Bg(this.aa);this.F=a||new Dg(d,e);this.h=[];this.C=new rf},Jg=function(a,b,c){b&&(""==c.Fa?Ig(a,b):(a.C.contains(b)||a.h.push(b),a.C.set(b,c)))},Kg=function(a,b){for(var c=0;c<b.length;c++)Jg(a,b[c][0],b[c][1])},Ig=function(a,b){var c=nf(a.h,b);0<=c&&a.h.splice(c,1);a.C.set(b,void 0)},Lg=function(a){for(var b=[],c=0;c<a.h.length;c++){var d=
a.h[c];b.push([d,a.C.get(d)])}return b},Mg=function(a){for(var b=0,c=0;c<a.h.length;c++)b=Math.max(b,a.C.get(a.h[c]).ka);return 864E5*b};Fg.prototype.toString=function(){if(0==this.h.length)return"";for(var a=[],b=0;b<this.h.length;b++){var c=this.h[b];a.push(""+c+"."+this.C.get(c).toString())}return"GAX1."+this.F.toString()+"."+a.join("!")};
var Ng=function(a,b){for(var c=new Date,d=Bg(a.aa),e=[],f=0;f<a.h.length;f++){var g=a.h[f];a.C.get(g).ka<a.Oa&&e.push(g)}for(f=0;f<e.length;f++)Ig(a,e[f]);if(a.h.length>(b||10))return!1;c.setTime(Mg(a));if("auto"!=a.ja)return zg("_gaexp",a.toString(),a.aa,a.ja,c);for(var h=Cg(),k=0;k<h.length;k++)if("none"!=h[k]&&(a.F=new Dg(Ag(h[k]),d),zg("_gaexp",a.toString(),a.aa,h[k],c)))return!0;return!1},Gg=function(a){for(var b=a.F.f,c=a.F.j,d=Ea("_gaexp"),e=[],f=0;f<d.length;f++){var g=Og(a,d[f]);g&&e.push(g)}Gf(e,
function(a,d){var e=a.F,f=d.F;return e.f==f.f&&e.j==f.j?!1:e.f==b&&e.j==c?!0:f.f==b&&f.j==c?!1:e.f==b?f.f!=b||e.j<f.j:f.f==b?!1:e.j==c?f.f!=b&&(f.j!=c||e.f<f.f):f.j==c?!1:e.f<f.f||e.f==f.f&&e.j<f.j});a.F=0<e.length?e[0].F:new Dg(b,c);for(f=e.length-1;0<=f;f--)Kg(a,Lg(e[f]))},Og=function(a,b){var c=b.match(/GAX1\.([^.]+).(.*)/);if(c){var d;a:{var e=(c[1]||"").split("-");if(!(0==e.length||2<e.length)){var f=of(e[0]);if(0!=f.length){var g=2==e.length?of(e[1]):"1";if(mf(f)&&mf(g)){d=new Dg(K(f),K(g));
break a}}}d=void 0}if(d){for(var h=new Fg(d,a.ja,a.aa),k=(c[2]||"").split("!"),l=0;l<k.length;l++){var m=k[l].split(".");if(3==m.length){if(!mf(m[1]))return;Jg(h,m[0],new Eg(m[2],K(m[1])))}}return h}}};var _hid=function(){return Pg};_hid.a="hid";_hid.b=["google"];var _j=function(a){for(var b=String(a[Ed]).split("."),c=w,d=0;d<b.length;d++)c=c&&c[b[d]];return c};_j.a="j";_j.b=["google"];var _v=function(a){var b=P(a[Ed].replace(/\\\./g,"."),a[ic]);return void 0!==b?b:a[qc]};_v.a="v";_v.b=["google"];var _r=function(a){return qf(a[Cd],a[Ad])};_r.a="r";_r.b=["google"];var _f=function(a){var b=String(P("gtm.referrer")||J.referrer);if(!b)return b;var c=ba(b);return b};_f.a="f";_f.b=["google"];var _smm=function(a){var b=a[dd],c=a[zd]||{};return c.hasOwnProperty(b)?c[b]:a[qc]};_smm.a="smm";_smm.b=["google"];var Ba=function(a){var b=w.location,c;(c=a[fc]?a[fc]:P("gtm.url"))&&(b=ba(String(c)));var d=b.href,e=d.indexOf("#"),f=0>e?d:d.substr(0,e);a[Sb]&&(f=aa(b,a[Sb],a[qe],a[pc],a[de]));return f},_u=Ba;_u.a="u";_u.b=["google"];var _cn=function(a){return 0<=String(a[qb]).indexOf(String(a[S]))};_cn.a="cn";_cn.b=["google"];var _eq=function(a){return String(a[qb])==String(a[S])};_eq.a="eq";_eq.b=["google"];var _gt=function(a){return Number(a[qb])>Number(a[S])};_gt.a="gt";_gt.b=["google"];var _re=function(a){return(new RegExp(a[S],a[ad]?"i":void 0)).test(a[qb])};_re.a="re";_re.b=["google"];var _sw=function(a){return 0==String(a[qb]).indexOf(String(a[S]))};_sw.a="sw";_sw.b=["google"];var Pg=new String("undefined"),bh=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===Pg?b:a[d]);return c.join("")}};bh.prototype.toString=function(){return this.resolve("undefined")};bh.prototype.valueOf=bh.prototype.toString;var ch={},dh=function(a,b){var c=Df++;ch[c]=[a,b];return c},eh=function(a){var b=a?0:1;return function(a){var c=ch[a];if(c&&O(c[b]))c[b]();ch[a]=void 0}};var fh=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},gh=function(a,b){return a<b?-1:a>b?1:0};var hh;a:{var ih=Va.navigator;if(ih){var jh=ih.userAgent;if(jh){hh=jh;break a}}hh=""}var W=function(a){return-1!=hh.indexOf(a)};var kh=function(){W("iPod")},lh=function(){return W("iPhone")&&!W("iPod")&&!W("iPad")};var mh=function(a){mh[" "](a);return a};mh[" "]=function(){};var oh=function(a,b){var c=nh;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var ph=W("Opera"),qh=W("Trident")||W("MSIE"),rh=W("Edge"),sh;if(sh=W("Gecko"))sh=!(-1!=hh.toLowerCase().indexOf("webkit")&&!W("Edge"));var th=sh&&!(W("Trident")||W("MSIE"))&&!W("Edge"),uh=-1!=hh.toLowerCase().indexOf("webkit")&&!W("Edge");uh&&W("Mobile");W("Macintosh");W("Windows");W("Linux")||W("CrOS");var vh=Va.navigator||null;vh&&(vh.appVersion||"").indexOf("X11");W("Android");lh();W("iPad");kh();lh()||W("iPad")||kh();var wh=function(){var a=Va.document;return a?a.documentMode:void 0},xh;
a:{var yh="",zh=function(){var a=hh;if(th)return/rv\:([^\);]+)(\)|;)/.exec(a);if(rh)return/Edge\/([\d\.]+)/.exec(a);if(qh)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(uh)return/WebKit\/(\S+)/.exec(a);if(ph)return/(?:Version)[ \/]?(\S+)/.exec(a)}();zh&&(yh=zh?zh[1]:"");if(qh){var Ah=wh();if(null!=Ah&&Ah>parseFloat(yh)){xh=String(Ah);break a}}xh=yh}
var Bh=xh,nh={},Ch=function(a){return oh(a,function(){for(var b=0,c=fh(String(Bh)).split("."),d=fh(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{var k=/(\d*)(\D*)(.*)/.exec(g)||["","","",""],l=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==k[0].length&&0==l[0].length)break;b=gh(0==k[1].length?0:parseInt(k[1],10),0==l[1].length?0:parseInt(l[1],10))||gh(0==k[2].length,0==l[2].length)||gh(k[2],l[2]);g=k[3];h=l[3]}while(0==b)}return 0<=b})},Dh;
var Eh=Va.document;Dh=Eh&&qh?wh()||("CSS1Compat"==Eh.compatMode?parseInt(Bh,10):5):void 0;var Fh;if(!(Fh=!th&&!qh)){var Gh;if(Gh=qh)Gh=9<=Number(Dh);Fh=Gh}Fh||th&&Ch("1.9.1");qh&&Ch("9");var Qa=function(a,b){var c="";qh&&!Hh(a)&&(c='<script>document.domain="'+document.domain+'";\x3c/script>'+c);var d="<!DOCTYPE html><html><head><script>var inDapIF=true;\x3c/script>"+c+"</head><body>"+b+"</body></html>";if(Ih)a.srcdoc=d;else if(Jh){var e=a.contentWindow.document;e.open("text/html","replace");e.write(d);e.close()}else Kh(a,d)},Ih=uh&&"srcdoc"in document.createElement("iframe"),Jh=th||uh||qh&&Ch(11),Kh=function(a,b){qh&&Ch(7)&&!Ch(10)&&6>Lh()&&Mh(b)&&(b=Nh(b));var c=function(){a.contentWindow.goog_content=
b;a.contentWindow.location.replace("javascript:window.goog_content")};qh&&!Hh(a)?Oh(a,c):c()},Lh=function(){var a=navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);return a?parseFloat(a[1]):0},Hh=function(a){try{var b;var c=a.contentWindow;try{var d;if(d=!!c&&null!=c.location.href)b:{try{mh(c.foo);d=!0;break b}catch(e){}d=!1}b=d}catch(e){b=!1}return b}catch(e){return!1}},Ph=0,Oh=function(a,b){var c="goog_rendering_callback"+Ph++;window[c]=b;a.src="javascript:'<script>(function() {document.domain = \""+
document.domain+'";var continuation = window.parent.'+c+";window.parent."+c+" = null;continuation();})()\x3c/script>'"},Mh=function(a){for(var b=0;b<a.length;++b)if(127<a.charCodeAt(b))return!0;return!1},Nh=function(a){for(var b=unescape(encodeURIComponent(a)),c=Math.floor(b.length/2),d=[],e=0;e<c;++e)d[e]=String.fromCharCode(256*b.charCodeAt(2*e+1)+b.charCodeAt(2*e));1==b.length%2&&(d[c]=b.charAt(b.length-1));return d.join("")};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Rh=function(a,b,c,d){return function(){try{if(0<b.length){var e=b.shift(),f=Rh(a,b,c,d);if("SCRIPT"==String(e.nodeName).toUpperCase()&&"text/gtmscript"==e.type){var g=J.createElement("script");g.async=!1;g.type="text/javascript";g.id=e.id;g.text=e.text||e.textContent||e.innerHTML||"";e.charset&&(g.charset=e.charset);var h=e.getAttribute("data-gtmsrc");h&&(g.src=h,Ka(g,f));a.insertBefore(g,null);h||f()}else if(e.innerHTML&&0<=e.innerHTML.toLowerCase().indexOf("<script")){for(var k=[];e.firstChild;)k.push(e.removeChild(e.firstChild));
a.insertBefore(e,null);Rh(e,k,f,d)()}else a.insertBefore(e,null),f()}else c()}catch(l){x(d)}}};var Th=function(a,b,c){if(J.body){var d=
a[$c];d instanceof bh&&(d=d.resolve(dh(b,c)),b=kf);if(a[$e])try{Qa(ga(),"<script>var google_tag_manager=parent.google_tag_manager;\x3c/script>"+d),x(b)}catch(e){x(c)}else a[bf]?Sh(d,b,c):Rh(J.body,Ra(d),b,c)()}else w.setTimeout(function(){Th(a,b,c)},200)},_html=Th;_html.a="html";_html.b=["customScripts"];var _img=function(a,b,c){var d=Ra('<a href="'+a[Xe]+'"></a>')[0].href,e=a[wb];if(e)var f=d.charAt(d.length-1),g=0<=d.indexOf("?")?"?"==f||"&"==f?"":"&":"?",d=d+(g+e+"="+a[xb]);G(d,b,c)};_img.a="img";_img.b=["customPixels"];
var ei=function(a,b,c,d){var e=b+": "+c+(d?" !important":""),f=document;if(f.createStyleSheet){var g=bi(f),h=g.rules.length;g.addRule(a,e);return function(){g.removeRule?g.removeRule(h):g.deleteRule(h);g.addRule("x","-",h)}}var k=ci(a+"{"+e+"}",f);di(k,f);var l=k.parentNode;return function(){l.removeChild(k)}},fi=null,bi=function(a){if(fi)return fi;for(var b=a.styleSheets.length-1;0<=b;b--){var c=a.styleSheets[b],d=c.ownerNode;if(d&&d.parentNode&&"HEAD"==d.parentNode.tagName)return fi=c}0==a.styleSheets.length&&
a.createStyleSheet();return fi=a.styleSheets[0]},ci=function(a,b){var c=(b||document).createElement("style");void 0!==c.cssText?c.cssText=a:c.innerHTML=a;return c},di=function(a,b){var c=b||document,d=c.getElementsByTagName("head")[0];d||(d=c.createElement("head"),c.body.parentNode.insertBefore(d,c.body));d.appendChild(a)};var mi={},ni=void 0,oi=function(a){var b=mi[a];b||(b={id:a,v:[],W:0,Ia:null,za:void 0,Da:!1},mi[a]=b);ni=b},qi=function(a,b,c,d){var e=ni;if(!qg||!e)return!1;var f={id:e.id+":"+e.v.length,eb:b,U:[],Za:c,G:a,ua:0,sa:d||null,Na:0,V:!1};e.v.push(f);null===a?(f.V=!0,b(null)):pi(e);return!0},ri=function(a){var b=ei(a,"visibility","hidden",!0);return function(){O(b)&&b.apply();b=null}},si=function(a,b,c,d){var e=b;if(!Na){var f=ri(a.A);Oa.push(f);e=function(a,c){var d=b(a,c);f();return d}}return qi(a,e,
c,d)},pi=function(a){if(!a.Da){for(var b=a.W;b<a.v.length;b++){var c=a.v[b],d=b==a.W;if(!c.V&&!ti(d,c))break;c.V&&d&&a.W++}a.v.length>a.W?(a.Ia||(a.Ia=w.setTimeout(function(){a.Ia=null;pi(a)},80)),Na||a.za||(a.za=function(){x(function(){pi(a)})},L(J,"DOMContentLoaded",a.za))):ui(a)}},ui=function(a){for(var b=0;b<a.v.length;b++){var c=a.v[b];if(c.G)for(var d=Hf(c.G.A)||[],e=0;e<d.length;e++){var f=d[e];f.gtmProgressiveApplied&&f.gtmProgressiveApplied[c.id]||(vi(f,c.id),c.U.push(wi(f,c.id)))}}},ti=
function(a,b){var c=[];if(b.G){var d=xi(b.G,b.id),e=null;b.sa&&(e=xi(b.sa,b.id+"-t"));for(var f=0;f<d.length;f++){var g=d[f],h;if(null!=e&&(h=e.length>f?e[f]:null,!h&&!Na&&(null===b.sa.o||b.Na+c.length<b.sa.o)))break;c.push({element:g,Hb:h})}}if(!Na&&b.Za&&(!a||null==b.G.o||b.G.o!=b.ua+c.length))return!1;for(var k=0;k<c.length;k++){var l=c[k].element,m=c[k].Hb,p;b.ua++;vi(l,b.id);m&&(b.Na++,p=b.id+"-t",vi(m,p));var q=b.eb(l,m);O(q)&&b.U.push(q);b.U.push(wi(l,b.id));m&&p&&b.U.push(wi(m,p))}if(b.G.o&&
b.G.o==b.ua||Na)b.V=!0;return!0},vi=function(a,b){a.gtmProgressiveApplied||(a.gtmProgressiveApplied={});a.gtmProgressiveApplied[b]=!0},wi=function(a,b){return function(){a.gtmProgressiveApplied&&delete a.gtmProgressiveApplied[b]}},xi=function(a,b){for(var c=Hf(a.A)||[],d=[],e=0;e<c.length;e++){var f=c[e];if(!f.gtmProgressiveApplied||!f.gtmProgressiveApplied[b]){if(a.D&&!yi(f))break;d.push(f)}}return d},yi=function(a){if(Na)return!0;for(;a;){if(a.nextSibling)return!0;a=a.parentNode}return!1};var ja,zi,Ai,ra=/(Firefox\D28\D)/g.test(Jf.userAgent),Ci=function(a,b){return function(c){c=c||w.event;var d=va(c),e=!1;if(3!==c.which||"LINK_CLICK"!=a){"LINK_CLICK"==a&&(d=wa(d,["a","area"]),e=!d||!d.href||Bi(d.href)||2===c.which||null==c.which&&4==c.button||c.ctrlKey||c.shiftKey||c.altKey||!0===c.metaKey);var f="FORM_SUBMIT"==a?ja:Ai;if(c.defaultPrevented||!1===c.returnValue||c.X&&c.X()){if(d){var g={simulateDefault:!1},h=la(f,["wnc","nwnc"]);h&&na(a,d,g,f.wt,h)}}else{if(d){var g={},k,l=la(f,["wnc",
"nwnc","nwc","wc"]);(k=na(a,d,g,f.wt,l))||(oa(g.eventReport,f)?b=!0:e=!0);e=e||k||"LINK_CLICK"==a&&ra;g.simulateDefault=!k&&b&&!e;g.simulateDefault&&(e=ta(d,g)||e,!e&&c.preventDefault&&c.preventDefault());c.returnValue=k||!b||e;return c.returnValue}return!0}}}},na=function(a,b,c,d,e){var f=d||2E3,g={"gtm.element":b,"gtm.elementClasses":b.className,"gtm.elementId":b["for"]||sa(b,"id")||"","gtm.elementTarget":b.formTarget||b.target||""};switch(a){case "LINK_CLICK":g["gtm.triggers"]=e||"";g.event="gtm.linkClick";
g["gtm.elementUrl"]=b.href;g.eventTimeout=f;g.eventCallback=Di(b,c);g.eventReporter=function(a){c.eventReport=a};break;case "FORM_SUBMIT":g["gtm.triggers"]=e||"";g.event="gtm.formSubmit";g["gtm.elementUrl"]=Ei(b);g.eventTimeout=f;g.eventCallback=Fi(b,c);g.eventReporter=function(a){c.eventReport=a};break;case "CLICK":g.event="gtm.click";g["gtm.elementUrl"]=(b.attributes&&b.attributes.formaction?b.formAction:"")||b.action||b.href||b.src||b.code||b.codebase||"";break;default:return!0}return ca(g)},Ei=
function(a){var b=a.action;b&&b.tagName&&(b=a.cloneNode(!1).action);return b},qa=function(a){var b=a.target;if(!b)switch(String(a.tagName).toLowerCase()){case "a":case "area":case "form":b="_self"}return b},ta=function(a,b){var c=!1,d=/(iPad|iPhone|iPod)/g.test(Jf.userAgent),e=qa(a).toLowerCase();switch(e){case "":case "_self":case "_parent":case "_top":var f;f=(e||"_self").substring(1);b.targetWindow=w.frames&&w.frames[f]||w[f];break;case "_blank":d?(b.simulateDefault=!1,c=!0):(b.targetWindowName=
"gtm_autoEvent_"+H().getTime(),b.targetWindow=w.open("",b.targetWindowName));break;default:d&&!w.frames[e]?(b.simulateDefault=!1,c=!0):(w.frames[e]||(b.targetWindowName=e),b.targetWindow=w.frames[e]||w.open("",e))}return c},Di=function(a,b,c){return function(){b.simulateDefault&&(b.targetWindow?b.targetWindow.location.href=a.href:(c=c||H().getTime(),500>H().getTime()-c&&w.setTimeout(Di(a,b,c),25)))}},Fi=function(a,b,c){return function(){if(b.simulateDefault)if(b.targetWindow){var d;b.targetWindowName&&
(d=a.target,a.target=b.targetWindowName);J.gtmSubmitFormNow=!0;pa(a).call(a);b.targetWindowName&&(a.target=d)}else c=c||H().getTime(),500>H().getTime()-c&&w.setTimeout(Fi(a,b,c),25)}},la=function(a,b){for(var c=[],d=0;d<b.length;d++){var e=a[b[d]],f;for(f in e)e.hasOwnProperty(f)&&e[f]&&c.push(f)}return c.join(",")},Gi=function(a,b,c,d,e){var f=e;if(!f||"0"==f){if(a.l)return;a.l=!0;f="0"}var g=a.wt;b&&(!g||g>d)&&(a.wt=d);a[b?c?"wc":"wnc":c?"nwc":"nwnc"][f]=!0},oa=function(a,b){if(b.wnc["0"]||b.wc["0"])return!0;
for(var c=0;c<Hi.length;c++)if(a.passingRules[c]){var d=Ii[c],e=d&&d[0]&&d[0][0]||d[1]&&d[1][0];if(e&&"0"!=e&&(b.wc[e]||b.wnc[e]))for(var f=Hi[c][1],g=0;g<f.length;g++)if(a.resolvedTags[f[g]])return!0}return!1},Aa=function(a,b,c,d,e){var f,g,h=!1;switch(a){case "CLICK":if(J.gtmHasClickListenerTag)return;J.gtmHasClickListenerTag=!0;f="click";g=function(a){var b=va(a);b&&na("CLICK",b,{},d)};h=!0;break;case "LINK_CLICK":b&&!zi&&(zi=Sf(J.location));Gi(Ai,b||!1,c||!1,d,e);if(J.gtmHasLinkClickListenerTag)return;
J.gtmHasLinkClickListenerTag=!0;f="click";g=Ci(a,b||!1);break;case "FORM_SUBMIT":Gi(ja,b||!1,c||!1,d,e);if(J.gtmHasFormSubmitListenerTag)return;J.gtmHasFormSubmitListenerTag=!0;f="submit";g=Ci(a,b||!1);break;default:return}L(J,f,g,h)},Bi=function(a){if(!zi)return!0;var b=a.indexOf("#");if(0>b)return!1;if(0==b)return!0;var c=ba(a);return zi==Sf(c)},pa=function(a){try{if(a.constructor&&a.constructor.prototype)return a.constructor.prototype.submit}catch(b){}if(a.gtmReplacedFormSubmit)return a.gtmReplacedFormSubmit;
J.gtmFormElementSubmitter||(J.gtmFormElementSubmitter=J.createElement("form"));return J.gtmFormElementSubmitter.submit.call?J.gtmFormElementSubmitter.submit:a.submit};var _cl=function(a,b){Aa("CLICK");x(b)};_cl.a="cl";_cl.b=["google"];
var da=function(a,b){if(a.history&&a.history.pushState)Xi(a,b),Yi(a,b),Zi("pushState",a,b),Zi("replaceState",a,b);else{var c;var d=J.documentMode;if(d&&8>d)c=!1;else{var e=J.body,f="onhashchange"in e;f||(e.setAttribute("onhashchange","return;"),f="function"==typeof e.onhashchange);c=f}c?Xi(a,b):$i(a,b)}},Yi=function(a,b){L(a,"popstate",function(a){b({source:"popstate",state:a.state,u:Rf(a.target)})})},Zi=function(a,b,c){var d=b.history,e=d[a];if(O(e))try{d[a]=function(f,g,h){e.apply(d,[].slice.call(arguments,
0));c({source:a,state:f,u:Rf(b)})}}catch(f){}},Xi=function(a,b){L(a,"hashchange",function(a){b({source:"hashchange",state:null,u:Rf(a.target)})})},$i=function(a,b){var c=Rf(a);a.setInterval(function(){var d=Rf(a);c!==d&&(c=d,b({source:"polling",state:null,u:d}))},150)};
var aj=function(){var a={source:null,u:Rf(w),state:w.history.state||null};return function(b){var c=a,d={};d[c.source]=!0;d[b.source]=!0;if(!d.popstate||!d.hashchange||c.u!=b.u){var e={event:"gtm.historyChange","gtm.historyChangeSource":b.source,"gtm.oldUrlFragment":a.u,"gtm.newUrlFragment":b.u,"gtm.oldHistoryState":a.state,"gtm.newHistoryState":b.state};a=b;ca(e)}}},_hl=function(a,b){J.gtmHasHistoryListenerTag||(J.gtmHasHistoryListenerTag=!0,da(w,aj()));x(b)};_hl.a="hl";_hl.b=["google"];var Ia=function(a,b){var c=b||Va,d=c.onerror,e=!1;uh&&!Ch("535.3")&&(e=!e);c.onerror=function(b,c,h,k,l){d&&d(b,c,h,k,l);a({message:b,fileName:c,Sa:h,Xb:k,error:l});return e}};
var Y=[],cj={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},dj=function(a){return cj[a]},ej=/[\x00\x22\x26\x27\x3c\x3e]/g;var jj=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,tj={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b","\f":"\\f",
"\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},uj=function(a){return tj[a]};
Y[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(jj,uj)+"'"}};
var Cj=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,Dj={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10","\u0011":"%11","\u0012":"%12","\u0013":"%13",
"\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86","\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89",
"\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},Ej=function(a){return Dj[a]};Y[16]=function(a){return a};var Gj=345,Hj=[],Ij=[],Jj=[],Kj=new rf,Lj=[],Z=[],Hi=[],Ii=[],Mj=function(){this.L=[]};Mj.prototype.set=function(a,b){this.L.push([a,b]);return this};Mj.prototype.resolve=function(a,b){for(var c={},d=0;d<this.L.length;d++){var e=Nj(this.L[d][0],a,b),f=Nj(this.L[d][1],a,b);c[e]=f}return c};var Oj=function(a){this.index=a};Oj.prototype.resolve=function(a,b){var c=Jj[this.index];if(c&&!b(c)){var d=c[ed];if(a){if(a.get(d))return;a.set(d,!0)}c=Nj(c,a,b);a&&a.set(d,!1);return sf(c)}};
var _M=function(a){return new Oj(a)},Pj=function(a){this.resolve=function(b,c){for(var d=[],e=!1,f=0;f<a.length;f++){var g=Nj(Hj[a[f]],b,c);g===Pg&&(e=!0);d.push(g)}return e?new bh(d):d.join("")}},_T=function(a){return new Pj(arguments)},Qj=function(a){function b(b){for(var c=1;c<a.length;c++)if(a[c]==b)return!0;return!1}this.resolve=
function(c,d){var e=Nj(a[0],c,d);if(a[0]instanceof Oj&&b(8)&&b(16)){if(e===Pg)return e;var f=Fa();Kj.set(f,e);return'google_tag_manager["GTM-JD26"].macro(\''+f+"')"}for(var e=String(e),g=1;g<a.length;g++)e=Y[a[g]](e);return e}},_E=function(a,b){return new Qj(arguments)},Rj=function(a,b){this.w=a;this.ra=b},_R=function(a,b){return new Rj(a,b)},Nj=function(a,b,c){var d=a;if(a instanceof Oj||a instanceof Mj||a instanceof Pj||a instanceof Qj)return a.resolve(b,c);if(!(a instanceof Rj))if(xa(a))for(var d=
[],e=0;e<a.length;e++)d[e]=Nj(a[e],b,c);else if(a&&"object"==typeof a){var d={},f;for(f in a)a.hasOwnProperty(f)&&(d[f]=Nj(a[f],b,c))}return d},Sj=function(a,b){var c=b[a],d=c;if(c instanceof Oj||c instanceof Qj||c instanceof Pj||c instanceof Rj)d=c;else if(xa(c))for(var d=[],e=0;e<c.length;e++)d[e]=Sj(c[e],b);else if("object"==typeof c){var d=new Mj,f;for(f in c)c.hasOwnProperty(f)&&d.set(b[f],Sj(c[f],b))}return d},Uj=function(a,b){for(var c=b?b.split(","):[],d=0;d<c.length;d++){var e=c[d]=c[d].split(":");
0==a&&(e[1]=Hj[e[1]]);if(1==a)for(var f=Tj(e[0]),e=c[d]={},g=0;g<f.length;g++){var h=Ij[f[g]];e[h[0]]=h[1]}if(2==a)for(g=0;4>g;g++)e[g]=Tj(e[g]);3==a&&(c[d]=Hj[e[0]]);if(4==a)for(g=0;2>g;g++)if(e[g]){e[g]=e[g].split(".");for(var k=0;k<e[g].length;k++)e[g][k]=Hj[e[g][k]]}else e[g]=[];5==a&&(c[d]=e[0])}return c},Tj=function(a){var b=[];if(!a)return b;for(var c=0,d=0;d<a.length&&c<Gj;c+=6,d++){var e=a&&a.charCodeAt(d)||65;if(65!=e){var f;f=65<e&&90>=e?e-65:97<=e&&122>=e?e-97+26:95==e?63:48<=e?e-48+52:
62;1&f&&b.push(c);2&f&&b.push(c+1);4&f&&b.push(c+2);8&f&&b.push(c+3);16&f&&b.push(c+4);32&f&&b.push(c+5)}}return b},Vj=function(a,b,c){a.push.apply(a,Uj(b,c))};
var fg=function(){},dk=function(a){},ig=function(){},ek=function(a){},fk=function(a,b){},gk=function(a,b){},gg=function(a){};var hk,ik;var sk=function(a){return function(){}},tk=function(a){return function(){}};var uk=function(a){var b=this;this.g=a;this.complete=this.Wa=!1;this.qa=[];this.la=[];this.S=function(){if(b.s&&b.s.event){var c=b.s.event,d=b.g;}b.complete||Cf(b.qa);Ff(b,1);if(eb[a])for(var e=0;e<eb[a].length;e++)eb[a].shift().S()};this.R=function(){if(b.s&&b.s.event){var c=b.s.event,d=b.g;}b.complete||
Cf(b.la);Ff(b,2);if(eb[a])for(var e=0;e<eb[a].length;e++)eb[a].shift().R()};this.B=kf},vk=function(a,b){a.qa.push(b)},wk=function(a,b){a.la.push(b)},xk=function(a){this.M=[];this.Ga=[];this.Pa={};this.ya=[];this.Y=0;this.Va={};this.Xa={};this.Ha={};this.event=a};xk.prototype.addListener=function(a){this.ya.push(a)};
var yk=function(a,b,c,d,e,f){if(!c.complete){a.M[b]=c;void 0==d&&(d=[]);void 0==e&&(e=[]);void 0==f&&(f=[]);d=xa(d)?d.slice():["or",d];e=xa(e)?e.slice():[e];f=xa(f)?f.slice():[f];a.Pa[b]=d;a.Va[b]=0<e.length;a.Xa[b]=0<f.length;a.Y++;var g=function(){0<a.Y&&a.Y--;0<a.Y||Cf(a.ya)};vk(c,g);wk(c,g)}},zk=function(a,b,c){a.M[b]&&(vk(a.M[b],function(){c(b,!0)}),wk(a.M[b],function(){c(b,!1)}))},Ak=function(a,b){var c=!1;return function(d,e){var f;a:{for(var g=0;g<a.length;g++)if(a[g]instanceof Rj&&a[g].w===
d||a[g]===d){f=g;break a}f=-1}c||0>f||("or"==a[0]?e?(c=!0,b()):(a.splice(f,1),1==a.length&&(c=!0)):e?(a.splice(f,1),1==a.length&&(c=!0,b())):c=!0)}},Ek=function(a,b){var c=[],d=!1,e=function(b){var f,g,h=Z[b];if(a.event.c(h)){}else g=Bk(h,b,a);if(f=g){var k=Ck(b,!0);0<k.length&&e(k[0].w);c.push(f);var l=Ck(b,!1);0<l.length&&e(l[0].w)}else d=
!0};e(b);if(!d){for(var f=0;f<c.length;f++){var g=c[f],h=Ck(g.g,!0);if(0<h.length){var k=c[f-1],l=Dk(g);vk(k,l);0==h[0].ra&&wk(k,l)}var m=Ck(g.g,!1);0<m.length&&(l=Dk(c[f+1]),vk(g,l),0==m[0].ra&&wk(g,l))}a.Ga.push(c)}},Ck=function(a,b){var c=b?ne:Ee,d=Z[a],e=void 0===d[c]?[]:d[c];return xa(e)?e:[e]},Dk=function(a){return function(){a.B()}},Gk=function(a){for(var b={},c=0;c<a.length;c++){var d=a[c],e=[],f=function(a){var b=Ck(a,!0);0<b.length&&f(b[0].w);e.push(a);var c=Ck(a,!1);0<c.length&&f(c[0].w)};
f(d.g);b[d.g]=e}Fk(a,b);return b},Fk=function(a,b){for(var c=0;c<a.length;c++){var d=a[c].g,e;for(e in b)if(b.hasOwnProperty(e)&&e!=d&&-1<nf(b[e],d)){delete b[d];break}}};var Ik=function(a,b){return function(){a[Wc]=b.S;a[Xc]=b.R;var c=b.g,d=b.s&&b.s.Ha[c],e=db[c]&&db[c].state,f=d?void 0!==d:b.Wa||b.Yb,g=db[c]&&db[c].firingOption,h=g&&2==g,k=g&&1==g;if(!f&&void 0===e||!f&&!h||!h&&!k){Ff(b,0);var l=b.s?b.s.event:void 0;a=Hk(a,l?l.c:pg());if(l){var m=a;fk(l,c)}sf(a,b.S,b.R)}else h&&0==e||k&&0==d?eb[c].push(b):h&&1==e||k&&1==d?b.S():b.R()}},Hk=function(a,b){a=Nj(a,new rf,b);return a},Bk=function(a,b,c){var d=new uk(b);d.s=c;vk(d,sk(a));wk(d,tk(a));d.B=Ik(a,d);return d};var Lk=!1,Mk=!1;var _sp=function(a,b,c){r("//www.googleadservices.com/pagead/conversion_async.js",function(){var d=w.google_trackConversion;O(d)?d({google_conversion_id:a[U],google_conversion_label:a[kd],google_custom_params:a[gc]||{},google_remarketing_only:!0,onload_callback:b})||c():c()},c)};_sp.a="sp";_sp.b=["google"];
var Ok=!1,_ua=function(a,b,c){function d(a){var b=[].slice.call(arguments,0);b[0]=p+b[0];w[l()].apply(window,b)}function e(b,c){void 0!==a[c]&&d("set",b,a[c])}function f(a,b){return void 0===b?b:a(b)}function g(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&d("set",a+c,b[c])}function h(){var b=function(a,b,c){if(!Ga(b))return!1;for(var e=Ha(Object(b),c,[]),f=0;e&&f<e.length;f++)d(a,e[f]);return!!e&&0<e.length},c;a[zc]?c=P("ecommerce"):
a[yc]&&(c=a[yc].ecommerce);if(!Ga(c))return;c=Object(c);var e=Ha(a[Rc],"currencyCode",c.currencyCode);void 0!==e&&d("set","&cu",e);b("ec:addImpression",c,"impressions");if(b("ec:addPromo",c[c.promoClick?"promoClick":"promoView"],"promotions")&&c.promoClick){d("ec:setAction","promo_click",c.promoClick.actionField);return}for(var f="detail checkout checkout_option click add remove purchase refund".split(" "),g=0;g<f.length;g++){var h=c[f[g]];if(h){b("ec:addProduct",h,"products");d("ec:setAction",f[g],
h.actionField);break}}}function k(a,b,c){var d=0;if(void 0!==a)for(var e in a)if(a.hasOwnProperty(e)&&(c&&y[e]||!c&&void 0===y[e])){var f=u[e]?Da(a[e]):a[e];"anonymizeIp"!=e||f||(f=void 0);b[e]=f;d++}return d}Q("GoogleAnalyticsObject",a[Ed]||"ga");var l=function(){return w.GoogleAnalyticsObject},m=Q(l(),function(){var a=w[l()];a.q=a.q||[];a.q.push(arguments)});m.l=Number(H());var p="",q="";"string"!=typeof a[Re]?(q=Fa(),p=q+"."):""!==a[Re]&&
(q=a[Re],p=q+".");var t=!1;var y={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,storage:!0},u={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useBeacon:!0};
var z={name:q};k(a[Rc],z,!0);m("create",a[gb],z);d("set","&gtm","GTM-JD26");e("nonInteraction",Jd);g("dimension",a[uc]);
var E={};k(a[Rc],E,!1)&&d("set",E);var D;a[rd]&&d("require","linkid","linkid.js");d("set","hitCallback",function(){if(O(a[Yc]))a[Yc]();else{var c=a[Rc],d=c&&c.hitCallback;O(d)&&d()}b()});if(a[Ne]){a[Gc]&&(d("require","ec","ec.js"),h());var C={hitType:"event",eventCategory:String(a[Kc]),eventAction:String(a[Jc]),eventLabel:f(String,a[Lc]),eventValue:f(K,a[Mc])};k(D,C,!1);d("send",C);}else if(a[Oe]){
C={hitType:"social",socialNetwork:String(a[ue]),socialAction:String(a[se]),socialTarget:String(a[te])},k(D,C,!1),d("send",C);}else if(a[Qe]){}else if(a[Pe]){}else if(a[oc]){}else if(a[mc]){}else if(a[Me]){}else{a[Gc]&&(d("require","ec","ec.js"),h());if(a[xc]&&!a[Ic]){var R="_dc_gtm_"+String(a[gb]).replace(/[^A-Za-z0-9-]/g,"");d("require","displayfeatures",void 0,{cookieName:R})}D?d("send","pageview",D):d("send","pageview");}if(!Ok){var V=a[kc]?"u/analytics_debug.js":"analytics.js";a[fd]&&!a[kc]&&(V="internal/"+V);
Ok=!0;r(I("https:","http:","//www.google-analytics.com/"+V,t),function(){w[l()].loaded||c()},c)}};_ua.a="ua";_ua.b=["google"];var Pk=function(){var a=[];return function(b,c){if(void 0===a[b]){var d=Lj[b]&&Nj(Lj[b],new rf,c),e=d;if(d)if(d[pb]&&xa(d[S]))for(var f=d[S],e=!1,g=0;!e&&g<f.length;g++)d[S]=f[g],e=sf(d);else e=sf(d);a[b]=[e,d]}return a[b]}},ck=function(a,b){for(var c=b[0],d=0;d<c.length;d++)if(!a.P(c[d],a.c)[0])return!1;for(var e=b[2],d=0;d<e.length;d++)if(a.P(e[d],a.c)[0])return!1;return!0},Qk=!1,ag=function(a,b,c,d){switch(b){case "gtm.js":if(Qk)return!1;Qk=!0;break;case "gtm.sync":if(P("gtm.snippet")!=ab)return!1}P("tagTypeBlacklist");
for(var e={id:a,name:b,ha:c||kf,fa:Tj(),pa:Tj(),P:Pk(),c:pg()},f=[],g=0;g<Hi.length;g++)if(ck(e,Hi[g])){f[g]=!0;for(var h=e,k=Hi[g],l=k[1],m=0;m<l.length;m++)h.fa[l[m]]=!0;for(var p=k[3],m=0;m<p.length;m++)h.pa[p[m]]=!0}else f[g]=!1;fk(e);var t=[];for(var y=0;y<Gj;y++)if(e.fa[y]&&!e.pa[y])if(e.c(Z[y])){}else{t[y]=Z[y];}e.T=t;for(var u=new xk(e),z=0;z<Gj;z++)if(e.fa[z]&&!e.pa[z])if(e.c(Z[z])){}else{var E=e.T[z],D=Bk(E,z,u);yk(u,z,D,E[rc],E[ne],E[Ee]);if(E[fb])break}u.addListener(e.ha);for(var C=[],
A=0;A<u.M.length;A++){var M=u.M[A];if(M){var B=u.Pa[A],F=u.Va[A],N=u.Xa[A];if(0!=B.length||F||N){if(0<B.length)for(var T=Ak(B,M.B),R=0;R<B.length;R++)B[R]instanceof Rj&&B[R].w!=A&&zk(u,B[R].w,T);(F||N)&&Ek(u,A)}else C.push(A)}}for(A=0;A<C.length;A++)u.M[C[A]].B();for(A=0;A<u.Ga.length;A++){for(var ya=u.Ga[A],V=ya,ka=[],ha=0;ha<V.length;ha++){var tb=V[ha],rb=tb.g,Pb=db[rb],td=Pb.firingOption;0!=td&&(1==td&&void 0!==tb.s.Ha[rb]||2==td&&void 0!==Pb.state)&&ka.push(tb)}var ud=Gk(ka),vc=void 0;for(vc in ud)if(ud.hasOwnProperty(vc)){for(var vf=
void 0,ij=void 0,md=ud[vc],dl=md[0],kj=md[md.length-1],lj,Ja=0;Ja<V.length;Ja++){var nd=V[Ja];!vf&&nd.g==dl&&0<Ja&&(vf=V[Ja-1]);nd.g==kj&&Ja<V.length-1&&(ij=V[Ja+1]);if(-1<nf(md,nd.g))if(lj=V.splice(Ja,1)[0],nd.g==kj)break;else Ja--}if(lj){var mj=Number(vc),ma=vf,wf=ij;if(ma){var el=ma.qa[0],fl=ma.la[0],nj=ma;nj.qa=[];nj.la=[];vk(ma,el);wk(ma,fl)}if(ma&&wf){var xf=Dk(wf);vk(ma,xf);var yf=Ck(ma.g,!1);0<yf.length&&yf[0].w!=mj&&0==yf[0].ra&&wk(ma,xf);var zf=Ck(wf.g,!0);0<zf.length&&zf[0].w!=mj&&0==zf[0].ra&&
wk(ma,xf)}}}0<ya.length&&ya[0].B()}0<u.Y||Cf(u.ya);d&&O(d)&&d({passingRules:f,resolvedTags:e.T});
if("gtm.js"==b||"gtm.sync"==b)a:{}for(var qj in e.T)if(e.T.hasOwnProperty(qj)){var rj=e.T[qj],Af;if(!(Af=void 0==rj[ed])){var sj=rj[ed];Af=!("function"!=typeof String.prototype.startsWith?0===sj.indexOf("_implicit"):sj.startsWith("_implicit"))}if(Af)return!0}return!1};var Rk={macro:function(a){if(Kj.contains(a))return Kj.get(a)}};Rk.dataLayer=Wf;Rk.onHtmlSuccess=eh(!0);Rk.onHtmlFailure=eh(!1);Rk.callback=function(a){Ta.hasOwnProperty(a)&&O(Ta[a])&&Ta[a]();delete Ta[a]};Rk.jb=function(){var a=w.google_tag_manager;a||(a=w.google_tag_manager={});a["GTM-JD26"]||(a["GTM-JD26"]=Rk);La=a};(function(){var a=function(a){var b=Q("google_tag_manager",{}),d=b[a];d||(d=b[a]={},d.nwnc={},d.nwc={},d.wnc={},d.wc={},d.wt=null,d.l=!1);return d};Ai=a("linkClickMap");ja=a("formSubmitMap")})();
Hj.push.apply(Hj,function(){for(var a=[_jsm,'Page Hash','(function(){return ',_u,'Page Fragment','fragment',_E(_M(0),8,16),'?\x22#\x22+',':\x22\x22})();',_T(2,6,7,6,8),'Signup Registration Form Check','(function(){return document.getElementsByClassName(\x22gtm_signup_register_form\x22).length})();',_T(11),'Page Subdomain','(function(){return/(.*)\\.heroku\\.com/.exec(','Page Hostname','host',_E(_M(3),8,16),')[1]})();',_T(14,17,18),'Is Vimeo on Page','(function(){var c\x3d\x22vimeo.com/video\x22,b\x3ddocument.getElementsByTagName(\x22iframe\x22),a;for(a\x3d0;a\x3cb.length;a++)if(-1\x3cb[a].getAttribute(\x22src\x22).indexOf(c))return!0;return!1})();',_T(21),'Is VidYard on Page','(function(){var c\x3d\x22play.vidyard.com\x22,b\x3ddocument.getElementsByTagName(\x22iframe\x22),a;for(a\x3d0;a\x3cb.length;a++)if(-1\x3cb[a].getAttribute(\x22src\x22).indexOf(c))return!0;return!1})();',_T(24),'Page Path with Fragment','(function(){return window.location.pathname+window.location.search+window.location.hash})();',_T(27),'Check if Old History Fragment equals New History Fragment',_v,'Old History Fragment','gtm.oldUrlFragment',_E(_M(8),8,16),'\x3d\x3d\x3d','New History Fragment','gtm.newUrlFragment',_E(_M(9),8,16),'?!1:!0})();',_T(2,33,34,37,38),'Set Cookie','(function(){return function(d,e,f,b,c){if(d\x26\x26e){var a;b\x3db?\x22; path\\x3d\x22+b:\x22\x22;c\x3dc?\x22; domain\\x3d\x22+c:\x22\x22;a\x3d\x22\x22;f\x26\x26(a\x3dnew Date,a.setTime(a.getTime()+f),a\x3d\x22; expires\\x3d\x22+a.toUTCString());document.cookie\x3dd+\x22\\x3d\x22+e+a+b+c}}})();',_T(41),'Is Newsletter Checked','(function(){return document.getElementById(\x22list_93478\x22).checked?\x22checked\x22:\x22unchecked\x22})();',_T(44),_eq,'History Source','gtm.historyChangeSource',_M(13),'popstate',_M(10),'true',_re,'Page Path','path',_M(14),'/articles/getting-started-.*',true,_e,'_event',_M(15),'gtm.historyChange','115433_117','gtm.js','115433_2147479553','Page URL',_M(16),'https://signup.heroku.com/account/accept/ok','115433_81',_ua,__c,'UA - Rollup Tracking Id','1','UA-39697570-1',_M(17),false,'3',_smm,'Logged In State',_k,'Session Cookie','heroku_session',_M(18),'LoggedIn',{73:84},'NotLoggedIn',_M(19),'Internal Campaign IDs','query','c',_M(20),{73:87,77:91},'cookieDomain','page','Cookie Domain - Auto','auto',_M(21),'Replace PII in URL','(function(){var e\x3d[\x22email\x22,\x22ehash\x22,\x22email_id\x22,\x22authuser\x22],a\x3d',_E(_M(7),8,16),',b\x3ddocument.createElement(\x22a\x22);b.href\x3da;if(b.search){var a\x3db.search.replace(\x22?\x22,\x22\\x26\x22),c,d;for(c\x3d0;c\x3ce.length;c++)d\x3de[c],d\x3dnew RegExp(\x22\\x26\x22+d+\x22[^\\x26#]*\x22,\x22g\x22),a\x3da.replace(d,\x22\\x26\x22);a\x3d\x22\\x26\x22\x3d\x3d\x3da[0]?a.slice(1):\x22piiremoved\x22;b.search\x3da}return b.pathname+b.search+b.hash})();',_T(99,100,101),_M(22),{93:97,94:103},'\x26tid','\x26cd1','\x26cd3',{105:75,106:87,107:91,93:97,94:103},5,'trackEvent','115433_10','Event Category','eventCat',1,_M(23),'Event Action','eventAction',_M(24),'Event Label','eventLabel',_M(25),'Event Value','eventValue',_M(26),'Event Interaction','eventInteraction',_M(27),{73:87},'\x26t','\x26ec','\x26ea','\x26el','\x26ev','\x26ni','event',{105:75,129:135,130:115,131:118,132:121,133:124,134:127,106:87,93:97,94:103},6,'trackPageview','115433_11',{93:97,94:56},{105:75,106:87,107:91,93:97,94:56},7,_M(3),'www.heroku.com','115433_15','devcenter.heroku.com','115433_21','signup.heroku.com','115433_50','https://signup.heroku.com/account','115433_63',_sw,'https://signup.heroku.com/account/accept/','https://signup.heroku.com/account/accept','115433_82',__pa,'PerfectAudience - Site Id','51b6483a434bba0f0c000016',_M(28),18,'UA - Subdomains Tracking Id',_M(4),'devcenter','www','dashboard','id','addons','beta','blog','dataclips','discussion','events','help','toolbelt','jobs','lp','waza','partners','postgres','redeem','status','success','signup','elements','engineering','connect','redis','sso','kb','data','UA-39697570-3','UA-39697570-4','UA-39697570-5','UA-39697570-6','UA-39697570-7','UA-39697570-11','UA-39697570-12','UA-39697570-13','UA-39697570-14','UA-39697570-15','UA-39697570-16','UA-39697570-17','UA-39697570-18','UA-39697570-19','UA-39697570-20','UA-39697570-21','UA-39697570-22','UA-39697570-23','UA-39697570-25','UA-39697570-26','UA-39697570-31','UA-39697570-32','UA-39697570-33','UA-39697570-34','UA-39697570-36','UA-39697570-38','UA-39697570-40','UA-39697570-41',{163:191,164:192,165:193,166:194,167:195,168:196,169:197,170:198,171:199,172:200,173:201,174:202,175:203,176:204,177:205,178:206,179:207,180:208,181:209,182:210,183:211,184:212,185:213,186:214,187:215,188:216,189:217,190:218},'false',_M(29),'115433_101','115433_118','2',{73:87,224:91},'\x26cd2',{105:221,106:87,226:91,93:97,94:103},30,'/virtual/registration/registered',{93:97,94:229},{105:75,106:87,107:91,93:97,94:229},34,__awct,'1.00','USD','992316833','Y-wFCP-02wUQoZuW2QM','_url',_M(30),45,'https://signup.heroku.com/nodese','115433_71',52,'blog.heroku.com','115433_8','elements.heroku.com','115433_75',__cegg,'00338119',57,_img,'//pixel.mathtag.com/event/img?mt_id\x3d814352\x26mt_adid\x3d131453\x26v1\x3d\x26v2\x3d\x26v3\x3d\x26s1\x3d\x26s2\x3d\x26s3\x3d','gtmcb',_r,'_random',_M(31),68,'https://signup.heroku.com/java','115433_85','//pixel.mathtag.com/event/img?mt_id\x3d848607\x26mt_adid\x3d131453\x26v1\x3d\x26v2\x3d\x26v3\x3d\x26s1\x3d\x26s2\x3d\x26s3\x3d',75,'//pixel.mathtag.com/event/img?mt_id\x3d849890\x26mt_adid\x3d131453\x26v1\x3d\x26v2\x3d\x26v3\x3d\x26s1\x3d\x26s2\x3d\x26s3\x3d',77,_j,'Page Title','document.title',_M(32),'(\\d+\\sError|^Page not found)','115433_79','ErrorPage',_f,'Referrer',_M(33),{105:75,129:135,130:270,131:67,132:273,134:76,106:87,93:97,94:103},80,'115433_105',{105:221,129:135,130:270,131:67,132:273,134:76,106:87,93:97,94:103},84,'115433_107',{105:221,129:135,130:115,131:118,132:121,133:124,134:127,106:87,93:97,94:103},86,'115433_109',{105:221,106:87,226:91,93:97,94:56},88,'115433_112',{105:221,106:87,226:91,93:97,94:229},90,'trackSocial','115433_119','Social Network','socialNetwork',2,_M(34),'Social Action','socialAction',_M(35),'Social Target','socialTarget',_M(36),'\x26sn','\x26sa','\x26st','social',{105:75,129:303,300:293,301:296,302:299,106:87,93:97,94:103},95,'115433_120',{105:221,129:303,300:293,301:296,302:299,106:87,93:97,94:103},96,'115433_122',_sp,'',98,_cn,'Click Value','gtm.element.value',_M(37),'Keep Me Up to Date','hello\\.heroku\\.com\\/keepmeuptodate','gtm.click','115433_129','Form','Submit','Keep me up to Date: Newsletter - ',_M(12),_T(323,324),{105:75,129:135,130:321,131:322,132:325,134:76,106:87,93:97,94:103},103,'Click Element','gtm.element',_M(38),'hello.heroku.com/unsubscribe','115433_130','Click',_et,'Click Text',_M(39),{105:75,129:135,130:321,131:333,132:336,134:76,106:87,93:97,94:103},104,'Re-subscribe','hello\\.heroku\\.com\\/unsubscribe','115433_132','Newsletter Re-subscribe',{105:74,129:135,130:321,131:339,132:342,134:76,106:87,93:97,94:103},105,'www\\.heroku\\.com(\\/$|\\/home)','115433_59','UA - Rollup Homepage','/home','/index.html','/',{348:350,349:350},_M(40),{94:352},{105:75,94:352},108,'115433_141',_hl,109,'115433_142',110,'115433_143',_cl,111,'115433_144',112,'115433_145',113,_html,'\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l4ajt\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl4ajt\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',35,'dashboard.heroku.com','115433_136','redis.heroku.com','115433_137','postgres.heroku.com','115433_138','dataclips.heroku.com','115433_139','\n\n\x3cscript type\x3d\x22text/gtmscript\x22\x3epiAId\x3d\x2237622\x22;piCId\x3d\x2230300\x22;(function(){function a(){var b\x3ddocument.createElement(\x22script\x22);b.type\x3d\x22text/javascript\x22;b.src\x3d(\x22https:\x22\x3d\x3ddocument.location.protocol?\x22https://pi\x22:\x22http://cdn\x22)+\x22.pardot.com/pd.js\x22;var a\x3ddocument.getElementsByTagName(\x22script\x22)[0];a.parentNode.insertBefore(b,a)}window.attachEvent?window.attachEvent(\x22onload\x22,a):window.addEventListener(\x22load\x22,a,!1)})();\x3c/script\x3e\n\n',37,'https://www.heroku.com/pricing','115433_57','\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622301\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',40,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622287\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;\x26amp;mt_nsync\x3d1\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',41,'https://signup.heroku.com',_gt,_M(2),'0','115433_60','\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622288\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',42,'https://devcenter.heroku.com/start','115433_61','\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622290\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',43,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d622289\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',44,'\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l4sun\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl4sun\x26amp;p_id\x3dTwitter\x22\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dl4sun\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',46,'\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l5cdw\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl5cdw\x26amp;p_id\x3dTwitter\x22\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dl5cdw\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',47,'\x3cnoscript\x3e\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none\x22 src\x3d\x22https://www.facebook.com/tr?id\x3d1835809346650227\x26amp;ev\x3dPageView\x26amp;noscript\x3d1\x22\x3e\x3c/noscript\x3e',48,'https://www.heroku.com/connect','115433_65','https://www.heroku.com/thanks','115433_66','\x3cscript data-gtmsrc\x3d\x22//platform.twitter.com/oct.js\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e\n\x3cscript type\x3d\x22text/gtmscript\x22\x3etwttr.conversion.trackPid(\x22l4iup\x22);\x3c/script\x3e\n\x3cnoscript\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dl4iup\x26amp;p_id\x3dTwitter\x22\x3e\n  \x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dl4iup\x26amp;p_id\x3dTwitter\x22\x3e\n\x3c/noscript\x3e',49,'\n\n\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d687393\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x26amp;skipsync\x3d13\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',53,'id.heroku.com','115433_3','engineering.heroku.com','115433_53','\x3cscript type\x3d\x22text/gtmscript\x22\x3e!function(){function f(a){var c\x3d/[?\x26]?([^\x3d]c)\x3d([^\x26]*)/;a\x3dc.exec(a)||[];return a\x3ddecodeURIComponent(a[2])}function g(a){var c\x3d\x22; \x22+document.cookie;a\x3dc.split(\x22; \x22+a+\x22\\x3d\x22);return 2\x3d\x3da.length?a.pop().split(\x22;\x22).shift():void 0}function h(a,c){var b\x3d\x22\x22,b\x3dnew Date;b.setTime(b.getTime()+12096E5);b\x3d\x22; expires\\x3d\x22+b.toGMTString();document.cookie\x3da+\x22\\x3d\x22+c+b+\x22;domain\\x3d.heroku.com;path\\x3d/\x22}var e\x3d\x22campaign\x22,d\x3dg(e);\x22undefined\x22\x3d\x3dtypeof d\x26\x26(d\x3df(document.location.search),\x22undefined\x22!\x3d\x3dd\x26\x26h(e,d))}();\x3c/script\x3e',60,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d805084\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',65,'\x3cscript data-gtmsrc\x3d\x22//pixel.mathtag.com/event/js?mt_id\x3d805085\x26amp;mt_adid\x3d131453\x26amp;v1\x3d\x26amp;v2\x3d\x26amp;v3\x3d\x26amp;s1\x3d\x26amp;s2\x3d\x26amp;s3\x3d\x22 type\x3d\x22text/gtmscript\x22\x3e\x3c/script\x3e',66,'status.heroku.com','115433_31','toolbelt.heroku.com','115433_34','partners.heroku.com','115433_38','\x3cscript type\x3d\x22text/gtmscript\x22\x3e(function(){var a\x3dfunction(a){a\x3dnew RegExp(\x22[; ]\x22+a+\x22\\x3d([^\\\\s;]*)\x22);if(a\x3d(\x22 \x22+document.cookie).match(a))return unescape(a[1])};if(!a(\x22jbfp\x22)){var c\x3dMath.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);document.cookie\x3d\x22jbfp\\x3d\x22+(new Date).getTime()+\x22-\x22+c+\x22;domain\\x3dheroku.com;path\\x3d/;max-age\\x3d31536000\x22}var c\x3ddocument.referrer,b\x3da(\x22jbfp\x22),d\x3da(\x22heroku_session\x22),a\x3ddocument.createElement(\x22img\x22),b\x3d\x22https://jambox-p.herokuapp.com/e?url\\x3d\x22+escape(document.location.href)+\n\x22\\x26fp\\x3d\x22+b+\x22\\x26li\\x3d\x22+d;c\x26\x26(b+\x3d\x22\\x26ref\\x3d\x22+escape(c));a.src\x3db})();\x3c/script\x3e',78,_M(5),'115433_115','\x3cscript type\x3d\x22text/gtmscript\x22\x3e(function(c,e,g){e\x3dc(e);var f\x3d{iframes:[],eventMarker:{},getIframeSrc:function(a){return a.attr(\x22src\x22).split(\x22?\x22)[0]},getIframeId:function(a){return a.attr(\x22id\x22)},removeUndefinedIframes:function(a){var b\x3dc(a).attr(\x22id\x22);a\x3dc(a).attr(\x22src\x22);if(-1\x3d\x3d\x3da.indexOf(\x22player_id\x22))return!1;if(this.eventMarker[b])return!0;this.eventMarker[b]\x3d{progress25:!1,progress50:!1,progress75:!1,videoPlayed:!1,videoPaused:!1,videoResumed:!1,videoSeeking:!1,videoCompleted:!1,timePercentComplete:0};return!0},initIframes:function(){var a\x3d\nc(\x27iframe[src*\\x3d\x22player.vimeo.com/video\x22]\x27);this.iframes\x3dc.grep(a,c.proxy(this.removeUndefinedIframes,this))},onMessageReceived:function(a){if(/^https?:\\/\\/player\\.vimeo\\.com/.test(a.originalEvent.origin)){a\x3dJSON.parse(a.originalEvent.data);var b\x3dc(\x22#\x22+a.player_id);switch(a.event){case \x22ready\x22:this.initIframes();this.onReady();break;case \x22playProgress\x22:this.onPlayProgress(a.data,b);break;case \x22seek\x22:this.onSeek(b);break;case \x22play\x22:this.onPlay(b);break;case \x22pause\x22:this.onPause(b);break;case \x22finish\x22:this.onFinish(b)}}},\npost:function(a,b,d){a\x3dJSON.stringify({method:a,value:b});b\x3dc(d).attr(\x22src\x22).split(\x22?\x22)[0];d.contentWindow.postMessage(a,b)},handleOnReady:function(a,b){this.post(\x22addEventListener\x22,\x22play\x22,b);this.post(\x22addEventListener\x22,\x22seek\x22,b);this.post(\x22addEventListener\x22,\x22pause\x22,b);this.post(\x22addEventListener\x22,\x22finish\x22,b);this.post(\x22addEventListener\x22,\x22playProgress\x22,b)},onReady:function(){c.each(this.iframes,c.proxy(this.handleOnReady,this))},onFinish:function(a){var b\x3dthis.getIframeId(a);this.eventMarker[b].videoCompleted||\n(this.sendEvent(a,\x22Completed video\x22),this.eventMarker[b].videoCompleted\x3d!0)},onSeek:function(a){var b\x3dthis.getIframeId(a);this.eventMarker[b].videoSeeking||(this.sendEvent(a,\x22Skipped video forward or backward\x22),this.eventMarker[b].videoSeeking\x3d!0)},onPlay:function(a){var b\x3dthis.getIframeId(a);this.eventMarker[b].videoPlayed||(this.sendEvent(a,\x22Started video\x22),this.eventMarker[b].videoPlayed\x3d!0);!this.eventMarker[b].videoResumed\x26\x26this.eventMarker[b].videoPaused\x26\x26(this.sendEvent(a,\x22Resumed video\x22),\nthis.eventMarker[b].videoResumed\x3d!0)},onPause:function(a){var b\x3dthis.getIframeId(a);99\x3ethis.eventMarker[b].timePercentComplete\x26\x26!this.eventMarker[b].videoPaused\x26\x26(this.sendEvent(a,\x22Paused video\x22),this.eventMarker[b].videoPaused\x3d!0)},onPlayProgress:function(a,b){var d\x3dthis.getIframeId(b),c;this.eventMarker[d].timePercentComplete\x3dMath.round(100*a.percent);24\x3cthis.eventMarker[d].timePercentComplete\x26\x26!this.eventMarker[d].progress25\x26\x26(c\x3d\x22Played video: 25%\x22,this.eventMarker[d].progress25\x3d!0);49\x3cthis.eventMarker[d].timePercentComplete\x26\x26\n!this.eventMarker[d].progress50\x26\x26(c\x3d\x22Played video: 50%\x22,this.eventMarker[d].progress50\x3d!0);74\x3cthis.eventMarker[d].timePercentComplete\x26\x26!this.eventMarker[d].progress75\x26\x26(c\x3d\x22Played video: 75%\x22,this.eventMarker[d].progress75\x3d!0);c\x26\x26this.sendEvent(b,c)},sendEvent:function(a,b){var c\x3dthis.getIframeSrc(a);g.push({event:\x22trackEvent\x22,eventCat:\x22Vimeo\x22,eventAction:b,eventLabel:c,eventValue:void 0,eventInteraction:!1})}};e.on(\x22message\x22,c.proxy(f.onMessageReceived,f))})(jQuery,window,dataLayer);\x3c/script\x3e',93,_M(6),'gtm.dom','115433_116','\x3cscript type\x3d\x22text/gtmscript\x22\x3e!function(r){function t(a){var b\x3d[0,25,50,75,90],n\x3db.slice(0),f\x3d[0,0],g\x3d0,h\x3d!1,m\x3dc.create();a.on(\x22timeupdate\x22,function(b){var d,c\x3d0;d\x3dMath.floor(b);if(!(h||\x22object\x22!\x3dtypeof a.metadata||d\x3c\x3df[1])){f[1]\x3db;b\x3dm.insertOne(f);d\x3dm;var e,k\x3dnull,l\x3d[];for(e\x3d0;e\x3cd.length;++e)!k||k[1]\x3cd[e][0]?(k\x26\x26l.push(k),k\x3d[d[e][0],d[e][1]]):d[e][1]\x3ek[1]\x26\x26(k[1]\x3dd[e][1]);d\x3d(k\x26\x26l.push(k),l);for(e\x3d0;e\x3cd.length;++e)c+\x3dd[e][1]-d[e][0];(m.remove(b),c\x3dc/a.metadata.chapters_attributes[g].video_attributes.length_in_seconds*100,c\x3e\x3dn[0])\x26\x26\n\x22undefined\x22!\x3d\x3dtypeof dataLayer\x26\x26\x22function\x22\x3d\x3d\x3dtypeof dataLayer.push\x26\x26dataLayer.push({event:\x22trackEvent\x22,eventCat:\x22Vidyard\x22,eventAction:\x22Played video: \x22+n.shift()+\x22%\x22,eventLabel:a.metadata.chapters_attributes[g].video_attributes.name,eventValue:void 0,eventInteraction:!0})}});a.on(\x22beforeSeek\x22,function(a){!1\x3d\x3d\x3dh\x26\x26(f[1]\x3da.start);h\x3d!0});a.on(\x22play\x22,function(a){m.insertOne(f.slice(0));f[0]\x3da;f[1]\x3da;h\x3d!1});a.on(\x22chapterComplete\x22,function(){n\x3db.slice(0);g\x3da.getCurrentChapter();f\x3d[0,0];m\x3dc.create();h\x3d!1})}\nvar c\x3dfunction(){this._compare\x3dfunction(a,b){return a[0]\x3cb[0]?-1:a[0]\x3eb[0]?1:a[1]\x3cb[1]?-1:a[1]\x3eb[1]?1:0}};c.create\x3dfunction(){return new c};c.prototype\x3d[];c.prototype.constructor\x3dArray.prototype.constructor;c.prototype.insertOne\x3dfunction(a){var b\x3dthis.bsearch(a);return this.splice(b+1,0,a),b+1};c.prototype.remove\x3dfunction(a){return this.splice(a,1),this};c.prototype.bsearch\x3dfunction(a){if(!this.length)return-1;for(var b,c,f,g\x3d0,h\x3dthis.length;1\x3ch-g;){if(b\x3dMath.floor((g+h)/2),c\x3dthis[b],f\x3dthis._compare(a,\nc),0\x3d\x3d\x3df)return b;0\x3cf?g\x3db:h\x3db}return 0\x3d\x3d\x3dg\x26\x260\x3cthis._compare(this[0],a)?-1:g};var l,p\x3d!0;try{l\x3dnew r.players}catch(a){throw Error(\x22The Vidyard API must be loaded before this script can execute\x22);}for(var q in l)l.hasOwnProperty(q)\x26\x26(t(l[q]),p\x3d!1);p\x26\x26console.warn(\x22No Vidyard Players found. (include this script below player embed codes)\x22)}(Vidyard);\x3c/script\x3e',94,'\x3cimg src\x3d\x22//bat.bing.com/action/0?ti\x3d5116236\x26amp;Ver\x3d2\x22 height\x3d\x220\x22 width\x3d\x220\x22 style\x3d\x22display:none; visibility: hidden;\x22\x3e',97,'\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22https://analytics.twitter.com/i/adsct?txn_id\x3dnuf3v\x26amp;p_id\x3dTwitter\x26amp;tw_sale_amount\x3d0\x26amp;tw_order_quantity\x3d0\x22\x3e\n\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none;\x22 alt\x3d\x22\x22 src\x3d\x22//t.co/i/adsct?txn_id\x3dnuf3v\x26amp;p_id\x3dTwitter\x26amp;tw_sale_amount\x3d0\x26amp;tw_order_quantity\x3d0\x22\x3e',102,'\x3cimg height\x3d\x221\x22 width\x3d\x221\x22 style\x3d\x22display:none\x22 src\x3d\x22https://www.facebook.com/tr?id\x3d998836190199866\x26amp;ev\x3dPageView\x26amp;noscript\x3d1\x22\x3e',106,'\x3cimg src\x3d\x22https://traffic.outbrain.com/network/trackpxl?advid\x3d 54996\x26amp;action\x3dview \x22 height\x3d\x221\x22 width\x3d\x221\x22 border\x3d\x220\x22 alt\x3d\x22\x22\x3e',107,'GA - Subdomains Tracking Id','UA-2989055-26','UA-2989055-24','UA-2989055-19','UA-2989055-36','UA-2989055-38','UA-2989055-37','UA-2989055-22',{165:450,163:451,174:452,183:453,184:454,186:455,181:456},'GA - Rollup Tracking Id','UA-2989055-1','Virtual Path','virtualPath','DOM Ready','Event','Click Classes','gtm.elementClasses','Click ID','gtm.elementId','Click Target','gtm.elementTarget','Click URL','gtm.elementUrl','Form Element','Form Classes','Form ID','Form Target','Form URL','Form Text',_c,'Container ID','GTM-JD26',_hid,'HTML ID'],b=[],c=0;c<a.length;c++)b[c]=Sj(c,a);return b}());Vj(Ij,0,"23:0,28:1,23:3,28:4,7:5,29:9,28:10,29:12,28:13,28:15,7:16,29:19,28:20,29:22,28:23,29:25,28:26,29:28,28:29,23:30,28:31,32:32,28:35,32:36,29:39,28:40,29:42,28:43,29:45,23:46,28:47,32:48,3:49,4:50,3:51,4:52,23:53,28:54,7:55,3:56,4:57,26:58,23:59,28:60,3:61,4:62,4:64,28:66,3:67,4:68,23:70,34:58,23:71,28:72,46:73,54:74,0:75,17:76,16:76,23:78,28:79,23:80,28:81,32:82,11:76,27:83,31:85,13:86,28:88,7:89,36:90,14:92,44:76,28:95,54:96,28:98,29:102,22:104,10:76,12:76,1:108,30:58,15:76,40:109,4:110,41:58,2:58,28:112,32:113,9:114,19:115,28:116,32:117,18:118,28:119,32:120,20:121,28:122,32:123,21:124,28:125,32:126,33:127,14:128,1:136,40:137,4:138,22:140,1:141,40:142,3:143,4:144,4:146,4:148,4:150,23:152,4:153,4:154,23:156,28:157,54:158,51:159,40:160,28:161,27:162,31:219,13:220,3:221,4:220,0:221,14:225,1:227,40:228,22:230,1:231,40:232,23:233,49:234,50:235,47:236,48:237,28:238,52:239,40:240,4:241,40:243,4:244,4:246,23:248,53:249,40:250,23:251,43:252,5:253,23:254,28:255,6:256,40:257,4:258,43:260,40:261,43:262,40:263,23:264,28:265,32:266,3:267,4:268,19:270,18:67,23:271,28:272,20:273,33:76,1:274,40:275,1:277,40:278,1:280,40:281,1:283,40:284,1:286,40:287,4:288,42:58,28:290,32:291,9:292,39:293,28:294,32:295,37:296,28:297,32:298,38:299,1:304,40:305,1:307,40:308,3:87,4:86,23:310,25:236,8:311,40:312,23:313,28:314,32:315,3:316,4:317,4:318,4:319,19:321,18:322,20:325,1:326,15:58,40:327,28:328,32:329,3:330,4:331,18:333,23:334,28:335,20:336,1:337,40:338,4:339,4:340,0:74,18:339,20:342,1:343,40:344,4:345,28:347,27:56,31:351,13:56,22:353,1:354,30:76,40:355,23:357,40:358,40:360,23:362,40:363,40:365,40:367,23:368,24:369,40:370,4:371,4:373,4:375,4:377,24:379,40:380,4:381,24:383,40:384,24:385,40:386,4:387,23:388,3:389,4:390,24:392,40:393,4:394,24:396,40:397,24:398,40:399,24:400,40:401,24:402,40:403,24:404,40:405,4:406,4:408,24:410,40:411,24:412,40:413,4:414,4:416,24:418,40:419,24:420,40:421,24:422,40:423,4:424,4:426,4:428,35:58,24:430,40:431,3:432,24:434,40:435,3:436,4:437,24:439,40:440,24:441,40:442,24:443,40:444,24:445,40:446,24:447,40:448,28:449,31:457,28:458,54:459,28:460,32:461,28:462,28:463,28:464,32:465,28:466,32:467,28:468,32:469,28:470,32:471,28:472,28:473,28:474,28:475,28:476,28:477,23:478,28:479,45:480,23:481,28:482");Vj(Jj,1,"c,j,BD,EY,Bk,BAD,BAM,BAw,AAAO,AAAy,BAABB,BAAAG,BAAAY,AAACAD,EAAAAAG,AAAAAAAD,EAAAAAAg,AAAAAAAAwD,AAAAAAAAAAe,AAAAAAAAAghD,EAAAAAAAAAAc,AAAAAAAAQBAAG,BAAAAAAAAAAAY,AAACAAAAAAAAAA4,AAACAAAAAAAAAAgG,AAACAAAAAAAAAAgw,AAACAAAAAAAAAAgAG,AAACAAAAAAAAAAgAw,AAAAAAAAQBAAAAAAAAAgB,AAAAAAAAAgAAAAAAAAAA4B,EAAAAAAAAAAAAAAAAAAAAAAI,AAAAAAAAAAAAAAAAAAAAAAAAAw,AAAAAAAAAAAAAAAAAAAAAAAAAAAO,AAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAH,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAA0,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAEG,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAY,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4B,AAAAAAAAAgAAAAAAAAAAQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD,AAAAAAAAQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw,AAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB,AAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQ,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIg,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAB,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC,AAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIE,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAI,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwB,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG");Vj(Lj,1,"AAAAgM,AAAAgw,AAAAAA5,AAAAgAAM,AAAAgAAU,AAAAgAAAD,AAAAgAAEAAAAAAB,AAAAgAAEAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAM,AAAAgAAAAAAAAAAAAAU,AAAAgAAAAAAAAAAAAAk,AAAAgAAABAAAAAAAAAAB,AAAAAAAABAAAAAAAAAAG,AAAAgAAABAAAAAAAAAAI,AAAAgAAAAAAAAAAAAAAAAG,AAAAAAAABAAAAAAAAAACAAAAB,AAAAgAAAAAAAAAAAAAEAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAI,AAAAgAAABAAAAAAAAAAAAAAAAAE,AAAAAAhAAAAAAAAAAAAAAAAAAAAw,AAAAgAAEAAAAAAAAAAAAAAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkB,AAAAAAhABAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAAAgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgB,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAC,AAAAAAhABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAAAhABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAI,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAg,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAB,AAAAAAAABAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAI,AAAAAAAABAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4,AAAAAAAABAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAAAgAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ,AAAAgAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg,AAAAggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI,AAAAggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB,AAAAgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC");Vj(Z,1,"AAAAAAAAMcAgh_,AAAAAAAAMcAAgZGJJP,AAAAAAAAMcAgBbAAAgD,AAAAAAAAIBAAAAAAAAAQG,AAAAAAAAMYAAhbAAAAAAA4B,AAAAAAAAMcAgBbAAAAAAAAO,AAAAAAAAIBAAAAAAAAAAAAw3,AAAAAAAAIBAAAAAAAAAQCAAAC,AAAAAAAAIBAAAAAAAAAAAAAAwB,AAAAAAAAIAAAAAAAAAAAAAAAAOD,AAAAAAAAIAAAAAAAAAAAAAAAAKZ,AAAAAAAAIAAAAAAAAAAAAAAAAKhB,AAAAAAAAMcAAgZGAACAAAAAAAAAAzD,AAAAAAAAMYAAgZGAACAAAIAAAAAAzM,AAAAAAAAMYAAgZGJJDAAAIAAAAAAAw,AAAAAAAAMYAABbAAAgAAAYAAAAAAAAD,AAAAAAAAMYAABbAAAAAAAYCAAAAAAAM,AAAAAAAAMEAAgZEAACAAAAAAAAAAAAgI5,AAAAAAAAMAAAgZEAACAAAIAAAAAAAAgIJD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAwD,AAAAAAAAMcAAgJGAACAAAAAAAAAAgAAAAAA4H,AAAAAAAAMcAAgJGAACAAAAAAAAAAgAAAAAAICyB,AAAAAAAAMYAAgJGAACAAAAAAAAAAgAAAAAAICA4D,AAAAAAAAMcAABTAAAAAAAAAAAAAAAAAAAAAAAAAAe,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgB,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgC,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAk,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABw,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAG,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAY,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgB,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAG,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAH,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAw,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAM,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAw,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAD,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAM,AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAw");Vj(Hi,2,"P:B::,Q:BAAAfB::,AB:C::,AC:E::,QE:IkAAgAgkD::,QI:IgAAAAglD::,QQ:IgAAAAggD::,Q:Q:AAE:,P:Q:AAE:,w:gI::ZgACABggD,Qg:ABAAAgFAE::Ig,QAI:ACAAAAQ::,QAQ:AEAAAAgmD::,QAg:AEAAAAAkD::,QAAB:AQ::,QAAC:AAB::,QAAC:AAC:AAE:,AB:AAE:AAE:,AC:AAI:AAE:,w:AAQ:AAE:,AAAE:AAg::,AAAE:AAAB:AAE:,QAAI:AAAC::,AAAwB:AAAE::,AAAAD:AAAI::,AAAAN:AAAQ::,QAAAQ:AAAgAEg::,QAAAAI:AAAAAC::,QAAAAw:AAAAAIC::,QAAAAAB:AAAAAQ::,QAAAAAC:AAAAAAI::,QAAAAAE:AAAAAAI::,QAAAAAI:AAAAAAg::,QAAAAAQ:AAAAAAgE::,QAAAAAg:AAAAAAAE::,QAAAAAAB:AAAAAAAE::,QAAAAAAC:AAAAAAAE::,QAAAAAAE:AAAAAAAI::,AAAAAAAY:AAAAAAAQ::,QAB::gAC:IgAAABg,QAAAg:::AAAAAB,QAAAAB:::AAAAAB,QAAAAC:::AAAAAB,QAAAAE:::AAAAAB");Vj(Ii,4,"63:,65.356.359.361.364.366.65:,111:,139:,145.145.145.145.145.145.145.145.145:,147.147.147.147.147.147.147.147:,149.149.149.149.149.149:,222:,223:,69.69:69.69.69.69.69.69.69.69.69.69,151.151.151.151.151:151.151,242.242:,245.245.245.245.245.245.245:,247.247.247.247.247:,259:,269:,276:,279:,282:,285:,289:,306:,309:,320:,332:,341:,346.346.346:,382:,391.391:,395:,407:,409:,415:,417.417:,425:,427:,429:,433:,438:,:155.155.155.155,:372,:374,:376,:378");for(var Sk=0;Sk<Z.length;Sk++){var Tk=Z[Sk],Uk=1;Tk[Ld]?Uk=2:Tk[We]&&(Uk=0);db[Sk]={firingOption:Uk,state:void 0};eb[Sk]=[]}Rk.jb();
(function(a){})("async");
(function(){var a=Q("dataLayer",[]),b=Q("google_tag_manager",{}),b=b["dataLayer"]=b["dataLayer"]||{};Oa.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Pf.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var c=a.push;a.push=function(){var b=[].slice.call(arguments,0);c.apply(a,b);for(bg.push.apply(bg,b);300<this.length;)this.shift();return jg()};bg.push.apply(bg,a.slice(0));x(kg)})();var bl=w;
if("interactive"==J.readyState&&!J.createEventObject||"complete"==J.readyState)Lf();else{L(J,"DOMContentLoaded",Lf);L(J,"readystatechange",Lf);if(J.createEventObject&&J.documentElement.doScroll){var cl=!0;try{cl=!bl.frameElement}catch(a){}cl&&Nf()}L(bl,"load",Lf)}"complete"===J.readyState?Qf():L(w,"load",Qf);
(function(a){})("async");(function(){})();var _vs="res_ts:1481147357031000,srv_cl:141575379,ds:live,cv:278";
})()
;
(function(){var e=window,h=document,k="replace";var m=function(a,c,d,b,g){c=encodeURIComponent(c)[k](/\(/g,"%28")[k](/\)/g,"%29");a=a+"="+c+"; path="+(d||"/")+"; ";g&&(a+="expires="+(new Date((new Date).getTime()+g)).toGMTString()+"; ");b&&"none"!=b&&(a+="domain="+b+";");b=h.cookie;h.cookie=a;return b!=h.cookie},p=function(a){var c=h.body;try{c.addEventListener?c.addEventListener("click",a,!1):c.attachEvent&&c.attachEvent("onclick",a)}catch(d){}};var q=function(a,c,d,b){this.get=function(){for(var b=void 0,c=[],d=h.cookie.split(";"),l=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),f=0;f<d.length;f++){var n=d[f].match(l);n&&c.push(decodeURIComponent(n[1][k](/%28/g,"(")[k](/%29/g,")")))}for(d=0;d<c.length;d++)c[d]&&(b=c[d]);return b};this.set=function(g){return m(a,g,b,c,1E3*d)};this.remove=function(){return m(a,"",b,c,-100)}};var t=function(a,c){var d=void 0;if("function"==typeof a.get&&"function"==typeof a.set){var b=c||{},g=b.hasOwnProperty("cookieName")?b.cookieName:"_gali",r=b.hasOwnProperty("cookieTimeout")?b.cookieTimeout:30,s=b.hasOwnProperty("levels")?b.levels:3,b=a.get("cookieDomain"),l=a.get("cookiePath"),f=new q(g,b,r,l);d||(d=f.get());d&&a.set("&linkid",d);p(function(a){a=a||e.event;a=a.target||a.srcElement;for(var b,c=0;a&&c<=s;c++){if(b=a.getAttribute("id")){a=b;100<a.length?f.remove():a?f.set(a):f.remove();
return}a=a.parentElement}f.remove()})}};(function(){e.gaplugins=e.gaplugins||{};e.gaplugins.LinkId=t;var a=e.GoogleAnalyticsObject||"ga";e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)};e[a]("provide","linkid",t)})();})();
/*
 * The Typekit service used to deliver this font or fonts for use on websites
 * is provided by Adobe and is subject to these Terms of Use
 * http://www.adobe.com/products/eulas/tou_typekit. For font license
 * information, see the list below.
 *
 * proxima-nova:
 *   - http://typekit.com/eulas/00000000000000003b9ad1b1
 *   - http://typekit.com/eulas/00000000000000003b9ad1b2
 *   - http://typekit.com/eulas/00000000000000003b9ad1b9
 *   - http://typekit.com/eulas/00000000000000003b9ad1ba
 *
 * © 2009-2016 Adobe Systems Incorporated. All Rights Reserved.
 */

if(!window.Typekit)window.Typekit={};window.Typekit.config={"a":"620292","c":[".tk-proxima-nova","\"proxima-nova\",sans-serif"],"dl":"AAAAggAAAAq-RZC89C2Dnyx1LEL-mU6YAAAAAw","f":"//use.typekit.net/c/d9b070/1w;proxima-nova,2,2clzCG:W:i4,2clzC6:W:i7,2clzCF:W:n4,2clzC5:W:n7/{format}{/extras*}","fc":[{"id":139,"family":"proxima-nova","src":"{scheme}://{hostname}/af/03034e/00000000000000003b9ad1b1/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"normal","subset_id":2}},{"id":140,"family":"proxima-nova","src":"{scheme}://{hostname}/af/5a684a/00000000000000003b9ad1b2/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"700","style":"italic","subset_id":2}},{"id":175,"family":"proxima-nova","src":"{scheme}://{hostname}/af/edab9a/00000000000000003b9ad1b9/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"400","style":"normal","subset_id":2}},{"id":176,"family":"proxima-nova","src":"{scheme}://{hostname}/af/1b9fb4/00000000000000003b9ad1ba/27/{format}{?primer,subset_id,fvd,token}","descriptors":{"weight":"400","style":"italic","subset_id":2}}],"fi":[139,140,175,176],"fn":["proxima-nova",["i4","i7","n4","n7"]],"hn":"use.typekit.net","ht":"tk","js":"1.18.13","kt":"lpc2yow","l":"typekit","p":"p.typekit.net","ps":1,"token":"auB9iJZpTdJZdiefLu7/Jmk0gDhWatUXyO7wjrjH5e+TtV9YNSabgYK8W7oL3zQ+ZnxXNi4FfpNCg4N6GwpG2h+kSB0oV456t1OafkpEdUG8Dg0oCkVvnVanwLP/fHeOkm7nWfposDGW05SqrX1dn+AFCZcPzZ8QZqFvNfyPsZqFFbXAITXe6rjKsOKcZs/BqLks29ueIZ1GjePBgywH4A==","type":"configurable"};
/*{"k":"1.18.13","auto_updating":true,"last_published":"2016-05-06 10:25:37 UTC"}*/
;(function(window,document,undefined){if(!document.querySelector){document.documentElement.className+=" wf-inactive";return;}function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function k(a,b,c){k=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return k.apply(null,arguments)}var m=Date.now||function(){return+new Date};function ca(a){this.g=a||"-"}ca.prototype.b=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.g)};function da(){var a=[{name:"font-family",value:n.c[p+1]}];this.g=[n.c[p]];this.b=a}function ea(a){for(var b=a.g.join(","),c=[],d=0;d<a.b.length;d++){var e=a.b[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"};function r(a,b){return(a&65535)*b+(((a>>>16)*b&65535)<<16)};function t(a,b){this.b=b||Array(Math.ceil(a/32));if(!b)for(var c=0;c<this.b.length;c++)this.b[c]=0}t.prototype.set=function(a){if(Math.floor(a/32+1)>this.b.length)throw Error("Index is out of bounds.");var b=Math.floor(a/32);this.b[b]|=1<<a-32*b};t.prototype.has=function(a){if(Math.floor(a/32+1)>this.b.length)throw Error("Index is out of bounds.");var b=Math.floor(a/32);return!!(this.b[b]&1<<a-32*b)};function fa(a,b,c){this.b=a;this.i=b;this.g=new t(a,c)}var ga=[2449897292,4218179547,2675077685,1031960064,1478620578,1386343184,3194259988,2656050674,3012733295,2193273665];
fa.prototype.has=function(a){if("string"!==typeof a&&"number"!==typeof a)throw Error("Value should be a string or number.");for(var b="number"===typeof a,c=0;c<this.i;c++){var d;if(b)d=r(a&4294967295,3432918353),d=d<<15|d>>>17,d=r(d,461845907),d^=ga[c]||0,d=d<<13|d>>>19,d=r(d,5)+3864292196,d^=4,d^=d>>>16,d=r(d,2246822507),d^=d>>>13,d=r(d,3266489909),d^=d>>>16,d=(d>>>0)%this.b;else{d=ga[c]||0;var e,f,g=a.length%4,h=a.length-g;for(f=0;f<h;f+=4)e=(a.charCodeAt(f+0)&4294967295)<<0|(a.charCodeAt(f+1)&
4294967295)<<8|(a.charCodeAt(f+2)&4294967295)<<16|(a.charCodeAt(f+3)&4294967295)<<24,e=r(e,3432918353),e=e<<15|e>>>17,e=r(e,461845907),d^=e,d=d<<13|d>>>19,d=r(d,5)+3864292196;e=0;switch(g){case 3:e^=(a.charCodeAt(f+2)&4294967295)<<16;case 2:e^=(a.charCodeAt(f+1)&4294967295)<<8;case 1:e^=(a.charCodeAt(f+0)&4294967295)<<0,e=r(e,3432918353),e=e<<15|e>>>17,e=r(e,461845907),d^=e}d^=a.length;d=r(d^d>>>16,2246822507);d=r(d^d>>>13,3266489909);d=((d^d>>>16)>>>0)%this.b}if(!this.g.has(d))return!1}return!0};function ha(a){a.length%4&&(a+=Array(5-a.length%4).join("="));a=a.replace(/\-/g,"+").replace(/\_/g,"/");if(window.atob)a=window.atob(a);else{a=a.replace(/=+$/,"");if(1==a.length%4)throw Error("'atob' failed: The string to be decoded is not correctly encoded.");for(var b=0,c,d,e=0,f="";d=a.charAt(e++);~d&&(c=b%4?64*c+d:d,b++%4)?f+=String.fromCharCode(255&c>>(-2*b&6)):0)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d);a=f}c=[];for(b=0;b<a.length;b+=4)c.push(a.charCodeAt(b)<<
24|a.charCodeAt(b+1)<<16|a.charCodeAt(b+2)<<8|a.charCodeAt(b+3)<<0);a=c.shift();b=c.shift();this.b=new fa(a,b,c)}ha.prototype.has=function(a){if(""===a)return!0;for(a=a.split(".");a.length;){var b=a.join("."),c="*."+b;if(this.b.has(b)||this.b.has(c)||this.b.has(encodeURIComponent(b))||this.b.has(encodeURIComponent(c)))return!0;a.shift()}return!1};function u(a,b,c,d){b=a.b.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.b.createTextNode(d));return b}function v(a,b,c){a=a.b.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}
function ia(a,b){a.b.body?b():a.b.addEventListener?a.b.addEventListener("DOMContentLoaded",b):a.b.attachEvent("onreadystatechange",function(){"interactive"!=a.b.readyState&&"complete"!=a.b.readyState||b()})}function y(a){a.parentNode&&a.parentNode.removeChild(a)}
function z(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ja(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function A(a,b){var c=u(a,"style");c.setAttribute("type","text/css");c.styleSheet?(v(a,"head",c),c.styleSheet.cssText=b):(c.appendChild(document.createTextNode(b)),v(a,"head",c))}
function ka(a,b,c){var d=a.b.getElementsByTagName("head")[0];if(d){var e=u(a,"script",{src:b}),f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(f=!0,c&&c(null),e.onload=e.onreadystatechange=null,"HEAD"==e.parentNode.tagName&&d.removeChild(e))};d.appendChild(e);setTimeout(function(){f||(f=!0,c&&c(Error("Script load timeout")))},5E3)}};function la(a,b,c){this.g=a.g.document.documentElement;this.j=b;this.m=c;this.b=new ca("-");this.o=!1!==b.events;this.i=!1!==b.classes}function B(a){if(a.i){var b=ja(a.g,a.b.b("wf","active")),c=[],d=[a.b.b("wf","loading")];b||c.push(a.b.b("wf","inactive"));z(a.g,c,d)}C(a,"inactive")}function C(a,b,c){if(a.o&&a.j[b])try{if(c)a.j[b](c.b,D(c));else a.j[b]()}catch(d){console.error('Typekit: Error in "'+b+'" callback',d)}if(a.m[b])if(c)a.m[b](c.b,D(c));else a.m[b]()};function ma(a,b,c){c=c||{};this.b=a;this.g=b;this.weight=c.weight||"400";this.style=c.style||"normal";this.A=c.primer||void 0;this.B=c.subset_id||void 0}function E(a){return("tk-"+a.b).slice(0,26)+"-"+D(a)}function F(a,b){return new ma(b,a.g,{weight:a.weight,style:a.style,A:a.A,B:a.B})}function D(a){return a.style.charAt(0)+a.weight.charAt(0)};function na(){var a=document,b=navigator.userAgent;if(/MSIE|Trident/.test(b)&&(a.documentMode?9>a.documentMode:1))b="i";else{a:{if(/AppleWebKit/.test(b)&&/Android/.test(b)&&!/OPR|Chrome|CrMo|CriOS/.test(b)&&(a=/Android ([^;)]+)/.exec(b))&&a[1]){a=parseFloat(a[1]);a=3.1<=a&&4.1>a;break a}a=!1}if(!a)a:{if(/Silk/.test(b)&&/Linux|Ubuntu|Android/.test(b)&&(b=/Silk\/([\d\._]+)/.exec(b))&&b[1]){a=2<=parseFloat(b[1]);break a}a=!1}b=a?"j":"k"}return b};function G(a){this.b=a}function H(a,b){return a.b.replace(/\{([^\{\}]+)\}/g,function(a,d){if("?"==d.charAt(0)){for(var e=d.slice(1).split(","),f=[],g=0;g<e.length;g++)b[e[g]]&&f.push(e[g]+"="+encodeURIComponent(b[e[g]]));return f.length?"?"+f.join("&"):""}return encodeURIComponent(b[d]||"")})};function I(){this.b=[]}function oa(a,b){for(var c=0;c<b.length;c++)a.b.push(b[c])}function J(a,b){for(var c=0;c<a.b.length;c++)b(a.b[c],c,a)}
function qa(a,b){if("i"===b){var c={},d=new I;J(a,function(a){c[a.b]||(c[a.b]={});c[a.b][a.weight]||(c[a.b][a.weight]=[]);c[a.b][a.weight].push(a)});for(var e in c){for(var f=[400,300,200,100,500,600,700,800,900],g=0;g<f.length;g++){var h=f[g];if(c[e][h]){oa(d,c[e][h]);break}}f=[700,800,900,600,500,400,300,200,100];for(g=0;g<f.length;g++){var l=f[g];if(c[e][l]&&h!==l){oa(d,c[e][l]);break}}}J(a,function(a){a=F(a,a.b.replace(/(-1|-2)$/,"").slice(0,28)+"-"+D(a));d.b.push(a)});return d}return"x"===b?
new I:a}function ra(a,b,c,d){for(var e=[],f=0;f<b.length;f++){var g=b[f],h=H(new G(a.g),{scheme:"https",hostname:c,format:g,primer:a.A,subset_id:a.B,fvd:D(a),extension:sa(g),token:d});"i"===g?e.push("url("+h+")"):e.push("url("+h+') format("'+ta(g)+'")')}return e.join(",")}
function ua(a,b,c,d,e){if("x"===b)return"";var f=[];f.push("font-family:"+(e?E(a):a.b));b="k"===b?ra(a,["l","d","a"],c,d):ra(a,[b],c,d);f.push("src:"+b);f.push("font-weight:"+a.weight);f.push("font-style:"+a.style);return"@font-face{"+f.join(";")+";}"}function ta(a){switch(a){case "d":return"woff";case "i":return"eot";case "l":return"woff2";default:return"opentype"}}function sa(a){switch(a){case "d":return"woff";case "i":return"eot";case "l":return"woff2";default:return"otf"}}
function K(a,b,c,d,e){var f=[];J(a,function(a){f.push(ua(a,b,c,d,e))});return f.join("")};function L(a,b){this.g=a;this.i=b;this.b=u(this.g,"span",{"aria-hidden":"true"},this.i)}function M(a){v(a.g,"body",a.b)}
function N(a){return"display:block !important;position:absolute !important;top:-9999px !important;left:-9999px !important;font-size:300px !important;width:auto !important;height:auto !important;line-height:normal !important;margin:0 !important;padding:0 !important;font-variant:normal !important;white-space:nowrap !important;font-family:"+a.b+" !important;font-weight:"+a.weight+" !important;font-style:"+a.style+" !important;"};function va(a,b,c,d,e,f,g,h){this.C=a;this.G=b;this.u=c;this.b=d;this.v=g||"BESbswy";this.g={};this.H=e||3E3;this.F=h;this.w=f||null;this.i=new L(this.u,this.v);this.j=new L(this.u,this.v);this.m=new L(this.u,this.v);this.o=new L(this.u,this.v);a=this.F?E(this.b):this.b.b;this.i.b.style.cssText=N(F(this.b,a+",serif"));this.j.b.style.cssText=N(F(this.b,a+",sans-serif"));this.m.b.style.cssText=N(F(this.b,"serif"));this.o.b.style.cssText=N(F(this.b,"sans-serif"));M(this.i);M(this.j);M(this.m);M(this.o)}
var O={J:"serif",I:"sans-serif"},P=null;function wa(){if(null===P){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);P=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return P}va.prototype.start=function(){this.g.serif=this.m.b.offsetWidth;this.g["sans-serif"]=this.o.b.offsetWidth;this.D=m();xa(this)};function ya(a,b,c){for(var d in O)if(O.hasOwnProperty(d)&&b===a.g[O[d]]&&c===a.g[O[d]])return!0;return!1}
function xa(a){var b=a.i.b.offsetWidth,c=a.j.b.offsetWidth,d;(d=b===a.g.serif&&c===a.g["sans-serif"])||(d=wa()&&ya(a,b,c));d?m()-a.D>=a.H?wa()&&ya(a,b,c)&&(!a.w||a.w.hasOwnProperty(a.b.b))?Q(a,a.C):Q(a,a.G):za(a):Q(a,a.C)}function za(a){setTimeout(k(function(){xa(this)},a),50)}function Q(a,b){setTimeout(k(function(){y(this.i.b);y(this.j.b);y(this.m.b);y(this.o.b);b(this.b)},a),0)};function Aa(a,b,c,d,e,f,g){this.i=a;this.u=b;this.b=d;this.m=c;this.g=e||3E3;this.o=f||void 0;this.j=g}Aa.prototype.start=function(){var a=this.m.g.document,b=this,c=m(),d=new Promise(function(d,e){function h(){m()-c>=b.g?e():a.fonts.load(b.b.style+" "+b.b.weight+" 300px "+(b.j?E(b.b):b.b.b),b.o).then(function(a){1<=a.length?d():setTimeout(h,25)},function(){e()})}h()}),e=new Promise(function(a,c){setTimeout(c,b.g)});Promise.race([e,d]).then(function(){b.i(b.b)},function(){b.u(b.b)})};function R(a,b,c,d){this.v=a;this.b=b;this.g=0;this.o=this.m=!1;this.w=c;this.u=d}var S=null;
function Ba(a,b,c){var d={},e=b.b.length;if(!e&&c)B(a.b);else{a.g+=e;c&&(a.m=c);var f=[];J(b,function(b){var c=a.b;c.i&&z(c.g,[c.b.b("wf",b.b,D(b),"loading")]);C(c,"fontloading",b);c=null;if(null===S)if(window.FontFace){var e=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),q=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);S=e?42<parseInt(e[1],10):q?!1:!0}else S=!1;S?c=new Aa(k(a.i,a),k(a.j,a),a.v,b,a.w,"BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",
a.u):c=new va(k(a.i,a),k(a.j,a),a.v,b,a.w,d,"BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006",a.u);f.push(c)});for(b=0;b<f.length;b++)f[b].start()}}R.prototype.i=function(a){var b=this.b;b.i&&z(b.g,[b.b.b("wf",a.b,D(a),"active")],[b.b.b("wf",a.b,D(a),"loading"),b.b.b("wf",a.b,D(a),"inactive")]);C(b,"fontactive",a);this.o=!0;Ca(this)};
R.prototype.j=function(a){var b=this.b;if(b.i){var c=ja(b.g,b.b.b("wf",a.b,D(a),"active")),d=[],e=[b.b.b("wf",a.b,D(a),"loading")];c||d.push(b.b.b("wf",a.b,D(a),"inactive"));z(b.g,d,e)}C(b,"fontinactive",a);Ca(this)};function Ca(a){!--a.g&&a.m&&(a.o?(a=a.b,a.i&&z(a.g,[a.b.b("wf","active")],[a.b.b("wf","loading"),a.b.b("wf","inactive")]),C(a,"active")):B(a.b))};function T(a,b){this.b=a;this.g=[];this.m=b;this.j=this.u=null;this.o=new I;this.i=null}T.prototype.supportsConfiguredBrowser=function(){return!0};T.prototype.init=function(){if(0<this.g.length){for(var a=[],b=0;b<this.g.length;b++)a.push(ea(this.g[b]));A(this.b,a.join(""))}};
T.prototype.load=function(a,b,c){var d=this;c=c||{};a=c.timeout;var e=!!c.async,f=na(),g=qa(this.o,f);c=new la(this.b,c,{active:function(){if(e){var a=K(g,f,d.m,d.i,!1);A(d.b,a)}if(d.v){var a=d.v,b=d.b,c=new G("{scheme}://{hostname}/p.gif{?s,k,app,ht,h,f,a,js,_}"),h=(window.__adobewebfontsappname__||a.app||"").toString().substr(0,20),b=b.g.location.hostname||b.i.location.hostname,l=[],w=[];window.Typekit?(window.Typekit.fonts||(window.Typekit.fonts=[]),w=window.Typekit.fonts):window.TypekitPreview&&
(window.TypekitPreview.fonts||(window.TypekitPreview.fonts=[]),w=window.TypekitPreview.fonts);for(var x=0;x<a.b.length;x++){for(var pa=!1,Y=0;Y<w.length;Y++)if(a.b[x]===w[Y]){pa=!0;break}pa||(l.push(a.b[x]),w.push(a.b[x]))}l.length&&Da(H(c,{scheme:"https",hostname:a.o,s:a.j,k:a.m,app:h,ht:a.i,h:b,f:l.join("."),a:a.g,js:a.version,_:(+new Date).toString()}))}},inactive:function(){if(e){var a=K(g,f,d.m,d.i,!1);A(d.b,a)}}});if(this.j){var h=location.hostname;if(!this.j.has(h)){console.error('Typekit: the domain "'+
h+'" isn\'t in the list of published domains for kit "'+this.u+'".');B(c);return}}if(g.b.length){h=K(g,f,this.m,this.i,e);A(this.b,h);var l=new R(this.b,c,a,e);ia(d.b,function(){Ba(l,g,b)})}else B(c)};function U(a,b){this.j=a;this.g=b;this.b=[]}U.prototype.i=function(a){this.b.push(a)};U.prototype.load=function(a,b){var c=a,d=b||{};"string"==typeof c?c=[c]:c&&c.length||(d=c||{},c=[]);if(c.length)for(var e=this,f=c.length,g=0;g<c.length;g++)Ea(this,c[g],function(){--f||Fa(e,d)});else Fa(this,d)};function Ea(a,b,c){b=H(a.j,{id:b});ka(a.g,b,c)}
function Fa(a,b){if(a.b.length){for(var c=new la(a.g,b,{}),d=0;d<a.b.length;d++)a.b[d].init();c.i&&z(c.g,[c.b.b("wf","loading")]);C(c,"loading");for(c=0;c<a.b.length;c++)a.b[c].load(null,c==a.b.length-1,b);a.b=[]}};function Da(a){var b=new Image(1,1),c=!1;b.src=a;b.onload=function(){c=!0;b.onload=null};setTimeout(function(){c||(b.src="about:blank",b.onload=null)},3E3)};var Ga=new function(){var a=window;this.g=this.i=a;this.b=this.g.document};window.Typekit||(window.Typekit={});if(!window.Typekit.load){var V=new U(new G("//"+(window.Typekit.config||{}).hn+"/{id}.js"),Ga);window.Typekit.load=function(){V.load.apply(V,arguments)};window.Typekit.addKit=function(){V.i.apply(V,arguments)}}var W,n=window.Typekit.config||{};W=new T(Ga,n.hn);
W.v=new function(){var a=n.ps,b=n.ht,c=n.fi,d=n.a,e=n.kt,f=n.js,g=n.l;this.o=n.p;this.j=a;this.i=b;this.b=c||[];this.g=d||null;this.m=e||null;this.version=f||null;this.app=g||null};if(n.fc)for(var X=n.fc,Z=0;Z<X.length;Z++)W.o.b.push(new ma(X[Z].family,X[Z].src,X[Z].descriptors));if(n.dl){var Ha=n.dl;try{W.j=new ha(Ha)}catch(a){}}n.kt&&(W.u=n.kt);n.token&&(W.i=n.token);if(n.c)for(var p=0;p<n.c.length;p+=2)W.g.push(new da);window.Typekit.addKit(W);
if(1===Math.round(30*Math.random())){var Ia=window.Typekit.load,Ja=[];window.Typekit.load=function(a){a=a||{};var b=a.active||function(){},c=a.fontactive||function(){},d=(new Date).getTime();a.active=function(){b();if(!window.XDomainRequest){var a=new Image,c=function(a){a=JSON.stringify({fonts:Ja,augmentations:[],font_loading:window.FontFace?"native":"non-native",active_duration:(new Date).getTime()-d,javascript_version:n.js,kit_type:"configurable",ad_blocker:a});if(!window.XDomainRequest){var b=
new XMLHttpRequest;b.open("POST","https://performance.typekit.net/");b.send(a)}};a.src="https://p.typekit.net/p.gif?";a.onload=function(){for(var a=!1,b=0;b<document.styleSheets.length;b++)if(null===document.styleSheets[b].href&&/ghostery-purple-box/.test(document.styleSheets[b].ownerNode.textContent)){a=!0;break}c(a)};a.onerror=function(){c(!0)}}};a.fontactive=function(a,b){var g,h;c(a,b);a:{g=b.charAt(0);h=b.charAt(1);/[1-9]/.test(h)||(h=4);g="i"===g?"italic":"o"===g?"oblique":"normal";h+="00";
for(var l=n.fc,q=0;q<l.length;q++)if(l[q].family===a&&l[q].descriptors.weight===h&&l[q].descriptors.style===g){g=l[q].id;break a}g=0}Ja.push({id:g,duration:(new Date).getTime()-d,dynamic:!1})};Ia(a)}}if(window.WebFont)try{window.Typekit.load()}catch(a){};}(this,document));

var piScriptNum=0;var piScriptObj=new Array();function checkNamespace(c){var d=c.split(".");var b=window;for(var e=0;e<d.length;e++){var a=d[e];if(!b[a]){b[a]={}}b=b[a]}}function piTracker(a){checkNamespace("pi.tracker");pi.tracker.visitor_id=piGetCookie("visitor_id"+(piAId-1000));pi.tracker.pi_opt_in=piGetCookie("pi_opt_in"+(piAId-1000));if(pi.tracker.pi_opt_in!="false"||(typeof(pi.tracker.title)!="undefined"&&pi.tracker.notify_pi)){var n=piGetParameter(document.URL,"pi_campaign_id");if(n!=null){pi.tracker.campaign_id=n}else{if(typeof(piCId)!="undefined"&&piCId!=""&&piCId!=null){pi.tracker.campaign_id=piCId}else{pi.tracker.campaign_id=null}}pi.tracker.account_id=piAId;pi.tracker.title=encodeURIComponent(document.title);if(typeof(piPoints)!="undefined"){pi.tracker.pi_points=piPoints}if(typeof(a)!="undefined"){pi.tracker.url=encodeURIComponent(a)}else{pi.tracker.url=encodeURIComponent(document.URL)}pi.tracker.referrer=document.referrer;if(pi.tracker.referrer==null){pi.tracker.referrer=piGetParameter(document.URL,"referrer")}pi.tracker.referrer=encodeURIComponent(pi.tracker.referrer);var r=piGetParameter(document.URL,"pi_ad_id");if(r!=null){pi.tracker.pi_ad_id=r}var b=piGetParameter(document.URL,"creative");if(b!=null){pi.tracker.creative=b}var o=piGetParameter(document.URL,"matchtype");if(o!=null){pi.tracker.matchtype=o}var w=piGetParameter(document.URL,"keyword");if(w!=null){pi.tracker.keyword=w}var y=piGetParameter(document.URL,"network");if(y!=null){pi.tracker.network=y}var h=piGetParameter(document.URL,"device");if(h!=null){pi.tracker.device=h}if(typeof(piIncludeInActivities)!="undefined"){pi.tracker.pi_include_in_activies=piIncludeInActivities}if(typeof(piProfileId)!="undefined"){pi.tracker.pi_profile_id=piProfileId}var x=piGetParameter(document.URL,"pi_profile_id");if(x!=null){pi.tracker.pi_profile_id=x}var k=piGetParameter(document.URL,"pi_email");if(k!=null){pi.tracker.pi_email=k}var d=piGetParameter(document.URL,"pi_list_email");if(d!=null){pi.tracker.pi_list_email=d}var l=piGetParameter(document.URL,"utm_campaign");if(l!=null){pi.tracker.utm_campaign=encodeURIComponent(l)}var c=piGetParameter(document.URL,"utm_medium");if(c!=null){pi.tracker.utm_medium=encodeURIComponent(c)}var s=piGetParameter(document.URL,"utm_source");if(s!=null){pi.tracker.utm_source=encodeURIComponent(s)}var t=piGetParameter(document.URL,"utm_content");if(t!=null){pi.tracker.utm_content=encodeURIComponent(t)}var p=piGetParameter(document.URL,"utm_term");if(p==null){p=piGetParameter(document.URL,"_kk")}if(p!=null){pi.tracker.utm_term=encodeURIComponent(p)}var q=piGetParameter(document.URL,"gclid");if(q!=null){pi.tracker.gclid=q}var g="ver=3";for(property in pi.tracker){g+="&"+property+"="+pi.tracker[property]}var u=false;try{u=location.protocol+"//"}catch(v){}if(u==null){u="http://"}if(typeof(piTUrl)=="string"&&(piTUrl.indexOf("localhost")!=-1||piTUrl.indexOf("app.dev.pardot")!==-1)){var m=u+piTUrl+"/analytics?"}else{var m=u+"pi.pardot.com/analytics?"}var f=document.getElementsByTagName("head")[0];piScriptObj[piScriptNum]=document.createElement("script");piScriptObj[piScriptNum].type="text/javascript";piScriptObj[piScriptNum].src=m+g;f.appendChild(piScriptObj[piScriptNum]);piScriptObj[piScriptNum].onload=function(){return}}piScriptNum++}function piGetParameter(d,b){var b=b+"=";if(d.length>0){var c=d.indexOf(b);if(c!=-1){c+=b.length;var a=d.indexOf("&",c);if(a==-1){a=d.length}return decodeURIComponent(d.substring(c,a))}}return null}function piGetCookie(a){if(document.cookie.length>0){c_start=document.cookie.indexOf(a+"=");if(c_start!=-1){c_start=c_start+a.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}function piSetCookie(b,c,a){var d=new Date();d.setDate(d.getDate()+a);document.cookie=b+"="+escape(c)+((a==null)?"":";expires="+d.toGMTString()+";path="+escape("/"))}piTracker();(function(){function b(g){if(document.querySelectorAll){return document.querySelectorAll("."+g)}var f=document.getElementsByTagName("a");var h=new Array();for(i=0;i<f.length;i++){var e=f[i].getAttribute("class");if(!e){e=f[i].className}ecl=e.split(" ");for(j=0;j<ecl.length;j++){if(ecl[j].toLowerCase()==g.toLowerCase()){h.push(f[i])}}}return h}function a(e){if(typeof document.getElementsByClassName!=="function"){return b(e)}else{return document.getElementsByClassName(e)}}function c(){var f,g,h;f=a("pardotTrackClick");for(g=0;g<f.length;g++){h=f[g];var e=function(l){var k=(l.currentTarget)?l.currentTarget:l.srcElement;if(k){var m=k.getAttribute("href");if(m){d(m);if(l.preventDefault){l.preventDefault()}else{l.returnValue=false}return false}}};if(h.addEventListener){h.addEventListener("click",e,false)}else{if(h.attachEvent){h.attachEvent("onclick",e)}}}}function d(l){var k="pi.pardot.com/analytics?";var h={url:encodeURIComponent(l),title:"",referrer:pi.tracker.url};var f;for(f in pi.tracker){if(pi.tracker.hasOwnProperty(f)&&!h.hasOwnProperty(f)){h[f]=pi.tracker[f]}k+="&"+f+"="+h[f]}var e="analyticsCB"+(new Date()).getTime();k+="&piClickCallback="+e;pi[e]=function(){window.location=l};var g=document.createElement("script");g.type="text/javascript";g.src=("https:"==document.location.protocol?"https://":"http://")+k;var m=document.getElementsByTagName("script")[0];m.parentNode.insertBefore(g,m)}c()})();
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
