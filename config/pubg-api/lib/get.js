
const CircularJSON = require('circular-json');
const fs = require('fs');






































































































































































































































function get(axios, url) {
    const key = process.env.API_KEY_PUBG;

    const config = JSON.parse(fs.readFileSync('./config/pubg-api/lib/config.json'));
    config.headers.Authorization = config.headers.Authorization.replace('<api-key>', key);
    console.log(config.headers);

    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: config.headers
        })
            .then(response => {
                response = response.data.data
                console.log(response.statusCode)
                console.log(`Get from '${url}' was successful\n${response}`);
                resolve(response);
            })
            .catch(error => {
                console.log(`Error while getting data from '${url}'\n${error}`);
                console.log(error.response)
                if (error.response.status === 404){ 
                    console.log(`player does not exist!`)
                    resolve(null);
                    reject(new Error("Player does not exist!"))
                }
                reject(error);

            });

    });

}


module.exports = get;
