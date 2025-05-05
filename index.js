

console.log("in my index.js");
const express =require("express");
const app =express();
const PORT =3000;
const pg=require("pg");
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_notes_db');

app.listen(PORT, () => {
    console.log(`i am listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send('does this work');
});

const init = async (req, res) => {
try {
    await client.connect();
    console.log('conected to  database');
} catch (error) {
    console.error(error);
}
}

init();
