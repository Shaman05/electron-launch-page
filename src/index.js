/**
 * Created by ChenChao on 2020/4/21.
 *
 */

const { ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const {
	version
} = require('../package');
let launchWin = null;

module.exports = {
	version,
	//主进程访问
	main: {
		start(options) {
			let { mainWin, launchUrl, width, height, transparent } = options;
			let launchOptions = {
				width,
				height,
				frame: false,
				show: false,
				transparent,
				skipTaskbar: true,
				webPreferences: {
					nodeIntegration: true
				}
			};
			launchWin = new BrowserWindow(launchOptions);
			launchWin.loadURL(launchUrl);
			// launchWin.webContents.openDevTools();
			launchWin.on('close', () => {
				launchWin = null;
			});
			ipcMain.on('launch ready', ()=> {
				launchWin.show();
			});
			ipcMain.on('main ready', ()=> {
				launchWin.webContents.send('do finish');
			});
			ipcMain.on('do finish', ()=> {
				launchWin.close();
				mainWin.show();
			});
		}
	},
	//渲染进程访问
	render: {
		launch(options) {
			let { onProgress, speed } = options || {};
			let _onProgress = onProgress || function() {};
			let _speed = speed;
			if(['slow', 'normal', 'fast'].indexOf(speed) > -1){
				_speed = { 'slow': 1, 'normal': 2.5, 'fast': 5}[_speed];
			}
			let progress = 0;
			let animate = requestAnimationFrame(function go() {
				progress += Math.random() * _speed;
				if (progress >= 80) {
					cancelAnimationFrame(animate);
				} else {
					animate = requestAnimationFrame(go);
					_onProgress(progress);
				}
			});
			ipcRenderer.send('launch ready');
			ipcRenderer.on('do finish', ()=> {
				cancelAnimationFrame(animate);
				_onProgress(100);
				setTimeout(()=> {
					ipcRenderer.send('do finish');
				}, 100);
			});
		},
		ready() {
			ipcRenderer.send('main ready');
		}
	}
};
