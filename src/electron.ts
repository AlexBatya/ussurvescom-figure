const { app, BrowserWindow, ipcMain, remote, Menu, dialog } = require('electron');
import fs from 'fs';
import path from 'path';
import weight from './electron/weight';

const template = [
  {
    label: "Файл",
    submenu: [
      {
        label: "Открыть",
        click: async () => {
            const linkArray: any = await dialog.showOpenDialog({});
            const link: any = linkArray.filePaths[0];  
            console.log(link.toString('cp1251'));
            // const result: any = await weight(link);
            // console.log(result.time)
        }
      },
    ]
  },
]

function noteWindow(){
  let noteWindow = new BrowserWindow({
    // transparent: true,
    frame: false,
    width: 350,
    height: 250,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  noteWindow.loadFile('./note.html')
}

function createWindow () {
  // Create the browser window.
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  
  let win = new BrowserWindow({
    icon: path.join(__dirname, 'logo.ico'),
    // transparent: true,
    title: 'Уссурвеском-Графики',
    width: 1000,
    height: 800,
    webPreferences: {
      encoding: 'UTF-8',
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // and load the index.html of the app.
  win.loadFile('./index.html');
}

app.on('ready', createWindow);

ipcMain.on('newWindow', async () => {
  noteWindow();
})

ipcMain.on('closeNote', () => {
  app.quit(); 
})