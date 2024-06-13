const { app, BrowserWindow } = require('electron');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        frame: false,
        closable: false,
        kiosk: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.maximize();
    mainWindow.loadFile('main.html');
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
  
  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });