const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const fs = require('fs')
const https =  require('https')
const dialog = require('electron').dialog;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('app/index.html')
  getfolder()
}

app.on('ready', createWindow)

https.get('https://www.openoffice.org/es/producto/pix/calc-big.png', (res)=>{
  const {statusCode} = res
  let fileSize = res.headers['content-length']
  let rawData = ''
  let chunckSize = 0
  let downloadContent = 0;

//  console.log(chunckSize);
//  console.log("Cont-Len: "+res.headers['content-length']/1024);
  let count = 0
  res.on('data',(chunck)=>{
    chunckSize = chunck.byteLength
    rawData+=chunck
    downloadContent+=chunckSize
    console.log(Math.round(100*downloadContent/fileSize)+"%");
    console.log(rawData);
  })
  res.on('end',()=>{
    res.pipe(fs.createWriteStream('test.png'))
  })


})


function getfolder() {
    var path = dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    alert(path);
}
