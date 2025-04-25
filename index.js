console.log("in my indexe.js");
const express =require("express");
const app =express();
const PORT =3000;
const pg=require("pg");
const client=new pg.Client()

app.listen(PORT, () => {
    console.log(`i am listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send('does this work');
});

const init = async (req, res) => {
try {
    
} catch (error) {
    console.error(error);
}
}

init();
