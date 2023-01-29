const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const axios = require('axios');

const database = require('./config/database/database')
const pubg_api = require('./config/pubg-api/pubg-api');

require('dotenv').config()
const app = express();

const PORT = 3000;

const line = '---------------------------------'
const doubleLine = '================================='

app.listen(PORT, () => console.log(`${doubleLine}\nListening at ${PORT}\n${line}`))
app.use(express.static('public'))


const playerDatabase = new Datastore({ filename: './db/players.db', autoload: true });
const seasonDatabase = new Datastore({ filename: './db/seasons.db', autoload: true });


//#region examples

/* const season = [
    {
        currentSeason: false,
        id: 7
    },
    {
        currentSeason: false,
        id: 6
    },
    {
        currentSeason: false,
        id: 5
    },
    {
        currentSeason: true,
        id: 8
    }
]; */
/* const player = {
    player: 'Double',
    id: 68448
}; */
//database.insert(playerDatabase, player);
//database.insert(seasonDatabase, season);
/* const currentSeason = {
    currentSeason: true
}
 */

/* const headers = {
    'Authorization': `Bearer ${key}`,
    'Accept': 'application/vnd.api+json'
};

/* pubg_api.getPlayerID(axios, url_seasons).then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
})

pubg_api.getPlayerID(axios, url_player).then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
})

pubg_api.get(axios, url_seasons).then(response => {
    const data = response;
    console.log(response);
    console.log(`Response type is '${typeof response}'`)

    data.forEach(season => {
        // Zkontrolujeme, zda objekt obsahuje atribut isCurrentSeason
        console.log(`Inserting...`)
          // Pokud ano, uložíme objekt do db s pouze id a isCurrentSeason atributy
          seasonDatabase.insert({
            id: season.id,
            isCurrentSeason: season.attributes.isCurrentSeason
          });

      });
}).catch(error => {
    console.error(error);
}) */

//#endregion


/* const season = '2023-1';
const player = 'LordKnedlik';
const data = {
    player : player,
    season: season
}

 pubg_api.url('player', data, url => {
    console.log(url)
}) 
 */

const data = {
    "type": "player",
    "id": "account.bd274520e6e04b9298025305886b7308",
    "attributes": {
        "name": "LordKnedlik",
        "stats": null,
        "titleId": "pubg",
        "shardId": "steam",
        "patchVersion": ""
    }
};

/* pubg_api.get(axios, `https://api.pubg.com/shards/steam/players?filter[playerNames]=LordKnedlik`).then(response => {

    console.log(response);
    //console.log(`id: ${response.id} name: ${response.data.attributes}`);

    for (const item of response) {
        const { id, attributes: { name, shardId } } = item;
        console.log({ id, name, shardId });
        database.insert(playerDatabase, { id, name, shardId });
    }
})
 */

/* pubg_api.url('seasons',{}, url => {
    pubg_api.get(axios, url).then(response => console.log(response))
})
 */
//database.insert(playerDatabase, data, { id: 'id', name: 'player.attribute.name', shardId: 'player.attribute.shardId' })


function findID(player) {
    return new Promise((resolve, reject) => {
        database.find(playerDatabase, { name: player }, 'id').then(response => {
            if (response) {
                console.log(`OK`);
                resolve(response);
            } else {
                resolve(null);
                reject(new Error(`Player is not in database!`))
            }
        }).catch(err => console.error(err))
    })
}

function getID(player) {
    return new Promise((resolve, reject) => {
        pubg_api.url('player', { player: player }, url => {
            pubg_api.get(axios, url).then(response => {
                if (response) {
                    console.log(response);
                    for (const item of response) {
                        const { id, attributes: { name, shardId } } = item;
                        console.log({ id, name, shardId });
                        database.insert(playerDatabase, { id, name, shardId });
                    }
                    resolve(response);
                } else {
                    resolve(false);
                    reject(new Error(`Player ${player} does not exist!`))
                }
            }).catch(err => console.error(err));
        })
    })
}

function searchSeason(platform, season) {
    seasonDatabase.find({ id: { $regex: new RegExp(`${platform}.*${season}$`) } }, (err, docs) => {
        if (err) {
            console.error(err);
        } else {
            docs.forEach((doc) => {
                console.log(`Season id: ${doc.id}`);
                return doc.id
            });
        }
    });
};

app.get('/player', async (req, res) => {
    const player = req.query.p;
    const season = req.query.s;
    const platform = 'pc'

    console.log(`GET is procecesing...\nplayer: ${player}\nseason: ${season}`);

    searchSeason(platform, season);


    await findID(player).then(response => {
        return new Promise((resolve, reject) => {
            if (response) {
                resolve(response);
            } else {
                getID(player).then(response => {
                    if (response) {
                        resolve(response);
                        console.log(`Get from api:  ${response}`)
                    } else {
                        resolve(false);
                        reject(new Error(`${player} is doesnt exist`))
                    }
                })
            }
        })
    }).then(response => {
        if (!response) {
            res.status(404);
            res.send('Player does not exist')
        } else {
            console.log(`${player} is exist\n${line}`);

            //pubg_api.url()

        }
    });

})



//getData();

async function getData() {

    await database.find(playerDatabase, { name: player }, 'id').then((res) => {
        if (res) {
            console.log(`Players id: ${res} '${typeof res}'`);
        } else {
            console.log('Searching in api..')

            pubg_api.get(axios, url_player).then(response => {
                if (response === null) {
                    console.log(`Player ${player} does not exist!`)
                    data = false;
                }
                else {
                    database.insert(playerDatabase, response)
                    console.log(`Response type is '${typeof response}'`)
                    console.log(response);
                }
            }).catch(err => console.error(err));

            database.find(seasonDatabase, { isCurrentSeason: true }, 'id').then((res) => {
                console.log(res);
                season = res;

            })

            /* pubg_api.get(axios, url_seasons).then(response => {
                console.log(response);
                console.log(`Response type is '${typeof response}'`)
                data += response;
            }).catch(error => {
                console.error(error);
            }) */
        }
    }).catch(err => console.error(err))



    /*         await pubg_api.get(axios, player_season_stats).then(response => {
                console.log(response);
            }) */


}








