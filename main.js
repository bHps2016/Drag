'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron
var menubar = require('menubar')
var path = require('path')
const child_process = require('child_process');

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

var menu = menubar({
    dir: __dirname,
    index: `file://${__dirname}/app/menue.html`, // fix
    width: 530, 
    height: 320
})

// To avoid being garbage collected
var mainWindow
var workerProcess

app.on('ready', () => {
    workerProcess = child_process.exec('node ./server.js ',
        function (error, stdout, stderr) {
            if (error) {
                console.log('Signal received: '+error.signal);
            }
            console.log('stdout: ' + stdout);
        }
    )
    var mainWindow = new BrowserWindow({width: 660, height: 660})
    mainWindow.loadURL(`file://${__dirname}/app/menue.html`)
    mainWindow.webContents.openDevTools()
})

app.on('window-all-closed', function () {
    workerProcess.kill('SIGINT');
    app.quit();
});
