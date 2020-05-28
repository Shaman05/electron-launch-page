/**
 * Created by ChenChao on 2020/4/21.
 *
 */

const path = require('path');
const { app, BrowserWindow } = require('electron');
const Elp = require('../dist');

app.on('ready', ()=> {
	//创建应用主窗口
	let mainWin = new BrowserWindow({
		width: 640,
		height: 480,
		webPreferences: {
			nodeIntegration: true
		},
		show: false
	});
	
	//启用 electron-launch-page
	Elp.main.start({
		//主窗口
		mainWin,
		//指定启动页，切换 launch2.html, launch3.html 可查看不同效果
		launchUrl: path.join(__dirname, 'launch1.html'),
		//launch3.html 开启 transparent: true
		transparent: true,
		//启动窗口大小
		width: 480,
		height: 320
	});
	
	mainWin.loadURL(path.join(__dirname, 'main.html'));
	mainWin.on('close', () => {
		mainWin = null;
	});
});

app.on('window-all-closed', ()=> {
	app.quit();
});
