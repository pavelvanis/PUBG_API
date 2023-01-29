const get = require('./lib/get');
const find = require('./lib/findData');
const fs = require('fs');


function url(name, value, callback) {
    console.log(`Parsing url..\nparametr: [${Object.keys(value)}]; value: [${Object.values(value)}]`);
    const data = JSON.parse(fs.readFileSync('./config/pubg-api/lib/config.json'));
  
    for (const [key, val] of Object.entries(value)) {
      console.log(`parametr: ${key} value: ${val}`)
      const p = '${' + key + '}';
      data.url[name] = data.url[name].replace(p, val);     
      console.log(data.url[name])
    }
    callback(data.url[name]);
  }


module.exports = {
    get,
    find,
    url
};

