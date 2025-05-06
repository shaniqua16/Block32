const express = require("express");
const pg = require("pg");
const client = new pg.Client(
  "postgresql://shaniquawhitley:@Bettyboo1@localhost:5432/iceCream_db"
);

const init = async () => {
  try {
    await client.connect();
    console.log("conected to  database");
    let SQL = `
                DROP TABLE IF EXISTS flavors;
                CREATE TABLE flavors(
                    id SERIAL PRIMARY KEY
                    name  VARCHAR (250) NOT NULL,
                    is_favorite BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT now(),
                    updated_at TIMESTAMP DEFAULT now()
                );
                INSERT INTO flavors (name, is_favorite) VALUES
                ('Classic Vanilla', TRUE),
                ('Rich Chocolate', FALSE),
                ('Strawberry Swirl', TRUE),
                ('Mint Chocolate Chip', FALSE),
                ('Cookie Dough', TRUE);
                `;
    await client.query(SQL);
    await client.end();
    console.log("tables created and seeded");
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
};
init();
