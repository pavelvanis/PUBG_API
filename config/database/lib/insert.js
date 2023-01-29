function insert(database, data) {
    const playerData = data

    database.insert(playerData, (err, value) => {
        if (err) {
            console.error(err);
            console.log('Error while data was loading into db')
        } else {
            console.log(`New '${typeof value}' was inserted`);
            database.persistence.compactDatafile();
        }
    });
}








module.exports = insert;