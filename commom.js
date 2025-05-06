const pg = require('pg');

const client = new pg.Client('postgresql://shaniquawhitley:@Bettyboo1@localhost:5432/iceCream_db');

module.exports = client;
