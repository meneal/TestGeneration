var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var faker = require("faker");
var fs = require("fs");
faker.locale = "en";
var mock = require('mock-fs');
var _ = require('underscore');
var random = require('random-js');


var phoneNumberAlias1 = 0;
var phoneNumberAlias2 = 0;
var rangeUpper = 0;
var rangeLower = 0;
var max = 999;
var min = 213;
var filePathAlias = 0;



function main()
{
	random = new random();
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["subject.js"];
	}
	var filePath = args[0];

	constraints(filePath);

	generateTestCases()

	//fakeDemo();

}


function fakeDemo()
{
	console.log( faker.phone.phoneNumber() );
	console.log( faker.phone.phoneNumberFormat() );
	console.log( faker.phone.phoneFormats() );

}

var functionConstraints =
{
}

var mockFileLibrary = 
{
	pathExists:
	{
		'path/fileExists': {file1: 'text'}
	},
	fileWithContent:
	{
		pathContent: 
		{	
  			file1: 'text',
		}
	},
	fileEmpty:
	{
		pathContent:
		{
			file1: '',
		}

	}
};

function generateTestCases()
{

	var content = "var subject = require('./subject.js')\nvar mock = require('mock-fs');\n";
	for ( var funcName in functionConstraints )
	{
		//console.log("func name is " + funcName);
		var params = {};

		// initialize params
		for (var i =0; i < functionConstraints[funcName].params.length; i++ )
		{
			var paramName = functionConstraints[funcName].params[i];
			//params[paramName] = '\'' + faker.phone.phoneNumber()+'\'';
			params[paramName] = '\'\'';
		}

		//console.log( params );

		// update parameter values based on known constraints.
		var constraints = functionConstraints[funcName].constraints;
		// Handle global constraints...
		var fileWithContent = _.some(constraints, {mocking: 'fileWithContent' });
		var pathExists      = _.some(constraints, {mocking: 'fileExists' });
		var fileEmpty       = _.some(constraints, {mocking: 'fileEmpty' });
		var formatArg       = _.some(constraints, {ident: 'options'});
		var blacklistArg    = _.some(constraints, {ident: 'phoneNumber'});
	
		if(!fileWithContent && !pathExists){
			for( var c = 0; c < constraints.length; c++ )
			{
				var constraint = constraints[c];
				if( params.hasOwnProperty( constraint.ident ) ){
					params[constraint.ident] = constraint.inverse || constraint.value || constraint.noVal;
					var args = Object.keys(params).map( function(k) {return params[k]; }).join(",");
					if(formatArg){
						var array = args.split(',');
						content += "subject." + funcName + "(" + array[0] + ',' + array[1] + ",'" + array[2] + "')\n";

					}else if(blacklistArg){
						var number = faker.phone.phoneNumberFormat();
						var array = number.split('-');
						array[0] = args;
						var fin = array.join('');
						content += "subject." + funcName + "('" +  fin +  "')\n"; 
						
					}else{
						// Emit simple test case.
						content += "subject.{0}({1});\n".format(funcName, args );
					}
				}
			}
		}else{
			for( var c = 0; c < constraints.length; c++ )
			{
				var constraint = constraints[c];
				if( params.hasOwnProperty( constraint.ident ) ){
					params[constraint.ident] = constraint.inverse || constraint.value;
			
				}
			}

			// Prepare function arguments.
			var args = Object.keys(params).map( function(k) {return params[k]; }).join(",");

			if( pathExists || fileWithContent)
			{
				content += generateMockFsTestCases(pathExists,fileWithContent,!fileEmpty,funcName,args);
				content += generateMockFsTestCases(!pathExists,fileWithContent,fileEmpty,funcName,args);
				content += generateMockFsTestCases(pathExists,fileWithContent,fileEmpty,funcName, args);
				content += generateMockFsTestCases(!pathExists,fileWithContent,!fileEmpty,funcName,args);
				content += generateMockFsTestCases(pathExists,!fileWithContent,fileEmpty,funcName,args)
			}else{
				// Emit simple test case.
				content += "subject.{0}({1});\n".format(funcName, args );
			}
		}

	}


	fs.writeFileSync('test.js', content, "utf8");

}

function generateMockFsTestCases (pathExists,fileWithContent, fileEmpty, funcName,args) 
{
	var testCase = "";
	// Insert mock data based on constraints.
	var mergedFS = {};
	if( pathExists )
	{
		for (var attrname in mockFileLibrary.pathExists) { mergedFS[attrname] = mockFileLibrary.pathExists[attrname]; }
	}
	if( fileWithContent )
	{
		for (var attrname in mockFileLibrary.fileWithContent) { mergedFS[attrname] = mockFileLibrary.fileWithContent[attrname]; }
	}
	if( fileEmpty )
	{
		for (var attrname in mockFileLibrary.fileEmpty) { mergedFS[attrname] = mockFileLibrary.fileEmpty[attrname]; }
	}
	
	testCase += 
	"mock(" +
		JSON.stringify(mergedFS)
		+
	");\n";
    

	testCase += "\tsubject.{0}({1});\n".format(funcName, args );
	testCase+="mock.restore();\n";
	return testCase;
}

function constraints(filePath)
{
   var buf = fs.readFileSync(filePath, "utf8");
	var result = esprima.parse(buf, options);

	traverse(result, function (node) 
	{
		if (node.type === 'FunctionDeclaration') 
		{
			var funcName = functionName(node);
			console.log("Line : {0} Function: {1}".format(node.loc.start.line, funcName ));

			var params = node.params.map(function(p) {return p.name});

			functionConstraints[funcName] = {constraints:[], params: params};

			// Check for expressions using argument.
			traverse(node, function(child)
			{
				if( child.type === 'BinaryExpression' && child.operator == "==")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						functionConstraints[funcName].constraints.push( 
							{
								ident: child.left.name,
								value: rightHand,
								inverse: rightHand * -10 
							});
					}
				}


				if( child.type === 'BinaryExpression' && child.operator == "<")
                {
                    if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
                    {
                        // get expression from original source code:
                        var rightHand = buf.substring(child.right.range[0], child.right.range[1])
                        functionConstraints[funcName].constraints.push( 
                            {
                                ident: child.left.name,
                                value: random.integer(rightHand - 10, rightHand -1),
                                inverse: random.integer(rightHand, rightHand)
                            });
                    }
                }

				if( child.type == "CallExpression" && 
					 child.callee.property &&
					 child.callee.property.name =="readFileSync" )
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							{
								// A fake path to a file
								ident: params[p],
								value: "'pathContent/file1'",
								mocking: 'fileWithContent'
							});
						}
					}
				}

				if( child.type == "CallExpression" &&
					 child.callee.property &&
					 child.callee.property.name =="existsSync")
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							{
								// A fake path to a file
								ident: params[p],
								value: "'path/fileExists'",
								mocking: 'fileExists'
							});
						}
					}
				}

				if(child.type == "LogicalExpression" && child.operator == "||"){
					if(child.left.type == "UnaryExpression"){
						if(child.left.argument.type == "Identifier"  && params.indexOf(child.left.argument.name) > -1){
							functionConstraints[funcName].constraints.push(
							{
								ident: child.left.argument.name,
								value: child.left.prefix,
								inverse: !child.left.prefix
							});
						}
					}
				}


				if(child.type == "LogicalExpression" && child.operator == "||"){
					if(child.right.type == "UnaryExpression"){
						if(child.right.argument.type == "MemberExpression"){
							if(child.right.argument.object.type == "Identifier" && params.indexOf(child.right.argument.object.name) > -1){
								functionConstraints[funcName].constraints.push(
								{
									ident: child.right.argument.object.name,
									value: child.right.argument.object.name,
									inverse: child.right.argument.property.name
								});
							}
						}
					}
				}

				

				//begin large block to pull nested aliases
				if(child.type == "VariableDeclarator" && child.init.type == "CallExpression"){
					if(params.indexOf(child.init.arguments[0].name) > -1){
						phoneNumberAlias1 = child.id.name;
					}
				}


				if(child.type == "VariableDeclarator" && child.init.type == "CallExpression"){
					if(child.init.callee.type == "MemberExpression"){
						if(child.init.callee.object.name == phoneNumberAlias1){
							phoneNumberAlias2 = child.id.name;
							rangeUpper = child.init.arguments[0].value;
							rangeLower = child.init.arguments[1].value;
						}
					}
				}


				if(child.type == "IfStatement" && child.test.type == "BinaryExpression"){
					if(child.test.left.type == "Identifier" && child.test.left.name == phoneNumberAlias2){
						functionConstraints[funcName].constraints.push(
						{
							ident: "phoneNumber",
							value: child.test.right.value,
						});
					}
				}

				if(child.type == "IfStatement" && child.test.type == "BinaryExpression"){
					if(child.test.left.type == "Identifier" && child.test.left.name == phoneNumberAlias2){
						var randArea = Math.floor(Math.random() * (max-min + 1)) + min;
						functionConstraints[funcName].constraints.push(
						{
							ident: "phoneNumber",
							value: randArea 
						});
					}
				}
				//end aliasing block


			});

			console.log( functionConstraints[funcName]);

		}
	});
}

function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

function traverseWithCancel(object, visitor)
{
    var key, child;

    if( visitor.call(null, object) )
    {
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            child = object[key];
	            if (typeof child === 'object' && child !== null) {
	                traverseWithCancel(child, visitor);
	            }
	        }
	    }
 	 }
}

function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "";
}


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();