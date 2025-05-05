const express = require('express');
const app = express();
const port = 3000;
const pg = require("pg");
const client=new pg.Client("postgresql://shaniquawhitley:@Bettyboo1@localhost:5432/acme_notes_db?schema=public");

const init = async () => {
    try {
        const SQL = `
        DROP TABLE IF EXIST flavors;
        CREATE TABLE flavors(
        id SERIAL PRIMARY KEY,
            name VARCHAR (100) NOT NULL,
            is_flavor BOOLEAN DEFAULT FALSE,
            created_at ,
            updated_at ,
        )
        `
    } catch (error) {
        
    }
}