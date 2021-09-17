# merge-csv-with-newcolumns-nodejs
How to merge csv files together and add a new column which contains the name of the file next to its data



Imagine you have two files that you wanna merge:

AD.CSV:

<pre>
NAME 	  LAST	  NUM
HANNA   CINDY   12345678 
MACMI   LOUIS	  12345678 

HHU.CSV:

NAME	  LAST	  NUM
LINWO   HOMES   12345678
SONAK   ABHIN   12345678
</pre>

AND NOW YOU WANT TO ADD THE FILE NAME NEXT TO ITS DATA AFTER MERGING; THEREFORE, THE RESULT FILE WILL LOOK LIKE THIS:

<pre>
NAME	  LAST	  NUM         newColumn
HANNA   CINDY	  12345678    AD
MACMI   LOUIS	  12345678    AD
LINWO   HOMES   12345678    HHU
SONAK   ABHIN   12345678    HHI

</pre>
You can subtitute the newColumn with your prefrence. 


Check out the code for more info

required modules:

npm init\
npm install fast-csv\
npm i csv-parse\
npm install -g async\
npm install express


