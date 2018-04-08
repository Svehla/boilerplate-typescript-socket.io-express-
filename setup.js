// file is inspired by this example
// https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f
const fs = require('fs');
fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('.env'));
