'use strict';

var toml = `
[a.b] #

c.d = { e.f = 0.0 } #
`;

var TOML=$('TOML',()=>require('.'));
var parsed=$('TOML.parse',()=>TOML.parse(toml,'',true,{comment:true}));
var stringified=$('TOML.stringify',()=>TOML.stringify(parsed,{newline:'\n'}));
stringified===toml||$('TOML.stringify');

function $(msg,fn){try{return fn();}catch{throw Error(`@ltd/j-toml/package.json#scripts.test -- ${msg}`);}}
