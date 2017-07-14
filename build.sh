#!/bin/bash
#Build Script

#Rebuild LETjs using jison
jison grammar/LET.jison grammar/LET.jisonlex -o grammar/LET.js

#Rebuild bundle.js for HTML frontend using browserify
browserify docs/main.js -o docs/bundle.js
