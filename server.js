const fs = require('fs')
const child = require('child_process')
const chokidar = require('chokidar')

//const watcher = fs.watch('/')

let currentChild = child.fork('./src/index.js')




let watcher = chokidar.watch('./src/');


watcher.on('all', function (){

    if (currentChild) {
        currentChild.kill()
    }
    // reset the child process
    currentChild = child.fork('./src/index.js')

});