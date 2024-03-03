const { app, BrowserWindow, ipcMain, remote, Menu } = require('electron');
import fs from 'fs';
import path from 'path';

const template = [
  {
    label: "Файл",
    submenu: [
      {
        label: "Открыть",
      },
      {
        label: "Соси",
      },
      {
        label: "Дрочи",
      }
    ]
  },
  {
    label: "Настройки",
    submenu: [
      {
        label: "Иди"
      },
      {
        label: "На"
      },
      {
        label: "Хуй"
      }
    ]
  }
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
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
  let win = new BrowserWindow({
    icon: path.join(__dirname, 'logo.ico'),
    // transparent: true,
    title: 'Ussurvescom-figures',
    // frame: true,
    width: 800,
    height: 650,
    // maxWidth: 250,
    // maxHeight: 250,
    // minWidth: 250,
    // minHeight: 250,
    // x: 1000,
    // y: 700,
    webPreferences: {
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