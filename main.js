'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron
var menubar = require('menubar')
var path = require('path')
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

var menu = menubar({
    dir: __dirname,
    // index: 'menubar.html'
    index: `file://${__dirname}/app/menue.html`, // fix
    width: 264, 
    height: 320
})

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {

    let mainWindow = new BrowserWindow({width: 660, height: 660})

    mainWindow.loadURL(`file://${__dirname}/app/main.html`)

    mainWindow.webContents.openDevTools()

})