



var express = require('express');
var router = express.Router();
var fs = require('fs');
var async = require('async');

var csv = require('fast-csv');
var json2csv = require('json2csv');
var parse = require('csv-parser');

var getFileName = require('path');



const directory = './Files/';
const path = require('path');

let filesnames=[];

fs.readdirSync(directory).forEach(file => {
	
  if (fs.lstatSync(path.resolve(directory, file)).isDirectory()) {
    console.log('Directory: ' + file);
  } else {
	
	let csvpath='./Files/'+file;
    console.log(csvpath);
	filesnames.push(csvpath);
	
	
  }
});







//------------------------------------------------------------------
concatCSVAndOutput(filesnames, 'outputfile.csv')
    .then(() => {console.log('MERGE DONE!');});


//-------------------------------------------------------------------

function concatCSVAndOutput(csvFilePaths, outputFilePath) {
  const promises = csvFilePaths.map((path) => {
    return new Promise((resolve) => {
      const dataArray = [];
      return csv
          .parseFile(path, {headers: true})
          .on('data', function(data) {


            data.OPID=getFileName.basename(path,getFileName.extname(path)); 


            dataArray.push(data);
          })
          .on('end', function() {
            resolve(dataArray);
          });
    });
  });

  return Promise.all(promises)
      .then((results) => {

        const csvStream = csv.format({headers: true});
        const writableStream = fs.createWriteStream(outputFilePath);

        writableStream.on('finish', function() {
          console.log('DONE!');
        });

        csvStream.pipe(writableStream);
        results.forEach((result) => {
          result.forEach((data) => {
            csvStream.write(data);
          });
        });
        csvStream.end();

      });
}

