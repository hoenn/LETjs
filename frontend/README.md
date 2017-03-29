###HTML Front End

To use this graphical front end simply open ```index.html``` in your browser.

##Recompilation

Parsing code relies on node modules that don't natively run in the browser. The module [browserify](https://github.com/substack/node-browserify) is capable of enabling this functionality. Any changes to ```main.js```, responsible for parsing, will require recompliation of ```bundle.js```

#Installing browserify on your system

```$ npm install -g browserify ```

```$ browserify main.js -o bundle.js```
