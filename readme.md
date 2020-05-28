# electron-launch-page

让你可以自定义启动页，用来优雅的加载展示你的 electron 应用。

## Demo

/demo 文件夹下包含一个完整的使用 electron-launch-page 的示例。

launch1.html: 不透明loading
![avatar](https://github.com/Shaman05/electron-launch-page/blob/master/demo/111111.gif?raw=true)

launch2.html: 不透明loading，使用进度
![avatar](https://github.com/Shaman05/electron-launch-page/blob/master/demo/222222.gif?raw=true)

launch3.html: 透明的loading
![avatar](https://github.com/Shaman05/electron-launch-page/blob/master/demo/333333.gif?raw=true)

## Installation

    npm install electron-launch-page

## Usage

主进程：

    const Elp = require('electron-launch-page');
    Elp.main.start({
        //主窗口 BrowserWindow
        mainWin,
        //自定义的启动页
        launchUrl: path/to/your-launch.html,
        //启动窗口大小，根据 your-launch.html 配置
        width: 480,
        height: 320
    });

渲染进程中涉及2个页面：

1. 在自定义的启动页里，如果需要加进度条的交互，参考如下代码：

        const Elp = require('electron-launch-page');
        Elp.render.launch({
            onProgress(progress) {
                processBar.style.width = progress + '%';
            }
        });

   如果启动页只展示 loading 效果，则可以不用添加与 electron-launch-page 相关的代码。

2. 在应用的主页里，当页面资源加载完成调用 Elp.render.ready()

        const Elp = require('electron-launch-page');
        //模拟页面加载耗时2秒
        setTimeout(()=> {
            Elp.render.ready();
        }, 2000);

## Method & Options

### Elp.main.start(options)

* mainWin [必须]

    Object: 主窗口 BrowserWindow

    `在使用 electron-launch-page 的时候，创建 mainWin 应该启动参数 show: false`

* launchUrl [必须]

    String: 自定义启动页面路径 file path

* transparent [可选]

    Boolean: 是否启动透明窗口，用法同 BrowserWindow 的 transparent

* width [可选]

    Number: 启动窗口的宽度

* height [可选]

    Number: 启动窗口的高度

### Elp.render.launch(options)

* onProgress(progress) [可选]

    Function: 启动进度，progress 是 0~100 数值

* speed [可选]

    String: 'slow'|'normal'[默认]|'fast' 可结合实际情况选用

当你的启动界面不需要进度条交互时，Elp.render.launch() 可不传参数。

### Elp.render.ready()

用于主窗口资源（本地、远程）加载完成，页面可完全展示时调用。
