



var express = require('express');
var router = express.Router();
var fs = require('fs');
var async = require('async');

var csv = require('fast-csv');
var json2csv = require('json2csv');
var parse = require('csv-parser');

var getFileName = require('path');



//Getting the files paths in the directory to pass it to the next function to merge the files
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
//merge call
concatCSVAndOutput(filesnames, 'outputfile.csv')
    .then(() => {console.log('MERGE DONE!');});


//-------------------------------------------------------------------

//reads the files and adds new column next to the data of the file that is being read

function concatCSVAndOutput(csvFilePaths, outputFilePath) {
  const promises = csvFilePaths.map((path) => {
    return new Promise((resolve) => {
      const dataArray = [];
      return csv
          .parseFile(path, {headers: true}) //you can use {headers: true, skipLines: 3} or any number instead of 3 if you have longer header
          .on('data', function(data) {

	   //getting the file's name without its extention to put it in the new Column next to its data	
            data.newColumn=getFileName.basename(path,getFileName.extname(path)); 


            dataArray.push(data);
          })
          .on('end', function() {
            resolve(dataArray);
          });
    });
  });

  return Promise.all(promises)
      .then((results) => {

	//writing process
	  
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

