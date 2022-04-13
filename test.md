# My JS Tutorial 
## In this tutorial I will show you how to write hello world 
```javascript 
 rn 
 ```
```javascript 
 function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(data); proc.stdin.end();
} 
 ```
```javascript 
 const clipboardy = require('clipboardy');

// Copy
clipboardy.writeSync('🦄');

// Paste
clipboardy.readSync();
//🦄 
 ```