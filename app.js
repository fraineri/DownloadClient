const fs = require('fs')
const https =  require('https')


https.get('https://www.google.com', (res)=>{
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
//    console.log(downloadContent)
  })

//  res.pipe(fs.createWriteStream('test.jpg'))


})
