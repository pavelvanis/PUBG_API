

function find(database, request, parametr) {
    return new Promise((resolve, reject) => {
        database.findOne(request, (err, doc) => {
            if (err) {
                console.log('Error while finding players id!')
                reject(err);
            } else {
                if (doc) {
                    if (doc[parametr]) {
                        console.log(`Item was succesfuly found! - ${parametr}: ${doc[parametr]}`)
                        resolve(doc[parametr]);
                    }else {
                        console.log(`Item was found, but parametr ${parametr} is not exist in this document!`);
                        resolve(null);
                    }
                } else {
                    console.log(`Item with parametr: '${parametr}' was not found in database!`);
                    resolve(null);
                }
            }
        })
    })
}

module.exports = find;