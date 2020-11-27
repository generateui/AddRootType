#!/usr/bin/env node

var fs = require('fs');
// arg0: node
// arg1: this filename
const [,, ...args] = process.argv;

if (args.length == 0) {
    console.log("adds given type to json schema file");
    console.log("\t--type|-t: object|array");
    console.log("\t--typeName|-tn: name of the type");
    console.log("\t--file|-f filepath to the json schema file");
	return;
}
if (args.length != 6) {
    throw new Error("expected 6 arguments");
}

// parse the commandline options
var type = "";
var typeName = "";
var filePath = "";
for (var i = 0; i < 6; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    console.log(typeof arg);
    if (arg == "--type" || arg == "-t") {
        type = nextArg;
    } else if (arg == "--typeName" || arg == "-tn") {
        typeName = nextArg;
    } else if (arg == "--file" || arg == "-f") {
        filePath = nextArg;
    }
}
console.log(type);
console.log(typeName);
console.log(filePath);
var fileContent = fs.readFileSync(filePath, 'utf8');
var obj = JSON.parse(fileContent);

// add the root-level properties to the json schema
obj["type"] = type;
obj["items"] = { $ref: `#/definitions/${typeName}` };

var generated = JSON.stringify(obj, null, 2);
fs.writeFileSync(filePath, generated, 'utf8');
