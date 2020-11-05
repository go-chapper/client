'use strict'

import {
    app,
    protocol,
    BrowserWindow,
    ipcMain,
    screen,
    globalShortcut,
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path')

let win

protocol.registerSchemesAsPrivileged([
    { scheme: 'chapper', privileges: { secure: true, standard: true } },
])

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().size
    win = new BrowserWindow({
        width: Math.round(width * 0.75),
        height: Math.round(height * 0.75),
        title: 'Chapper',
        frame: false,
        backgroundColor: '#0d0d0e',
        webPreferences: {
            devTools: isDevelopment,
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('chapper')
        win.loadURL('chapper://./index.html')
    }

    // Immediatly close the dev tools when they somehow got opened
    win.webContents.on('devtools-opened', () => {
        if (isDevelopment) {
            return
        }
        return
        // win.webContents.closeDevTools()
    })

    win.on('closed', () => {
        win = null
    })
}

app.setAsDefaultProtocolClient('chapper')

// App handlers
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }

    createWindow()
    registerShortcuts()
})

app.on('open-url', (event, url) => {
    console.log(event, url)
})

// IPC handlers
ipcMain.on('vue-close-app', () => {
    win.close()
})

ipcMain.on('vue-toggle-app', () => {
    if (win.isMaximized()) {
        win.unmaximize()
        return
    }
    win.maximize()
})

ipcMain.on('vue-minimize-app', () => {
    win.minimize()
})

function registerShortcuts() {
    // Prevent dev tools from being opened via Shortcut in production
    globalShortcut.register('Control+Shift+I', () => {
        if (isDevelopment) {
            win.webContents.toggleDevTools()
        }
        return
    })
}

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
