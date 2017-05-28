// 'use strict';
const {app, BrowserWindow,Menu,Tray} = require('electron')
const path = require('path')
const url = require('url')
// require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 300,
        height: 450,
        show: false,
        icon:__dirname + '/img/icon.ico',
        resizable: false,
        webSecurity: true,
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'onePage.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.once('ready-to-show', function() {
        win.show();
        win.focus();
    });
    // Emitted when the window is closed.
    win.on('close', function (event) {
        if( !app.isQuiting){
            event.preventDefault();
            win.hide();
            win.loadURL(url.format({
                pathname: path.join(__dirname, 'onePage.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
        return false;
    });
    win.on('minimize',function(event){
        event.preventDefault();
        win.hide();
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'onePage.html'),
            protocol: 'file:',
            slashes: true
        }));

    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit()
}
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
    createWindow()
}

});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.








app.on('ready', function()  {
    tray = new Tray(__dirname + '/img/icon.ico');
    var contextMenu = Menu.buildFromTemplate([

        { label: 'Show App', click:  function(){
            win.show();
        } },
        { label: 'Quit', click:  function(){
            app.isQuiting = true;
            app.quit();

        } }
    ]);
    tray.setToolTip('Battery Saver.');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show();
    });
});


global.openMainWindow = function(){
    win.show();
}