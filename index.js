
const express =require("express");
const client = require('./commom')

const app =express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(require('morgan')('dev'));
    




    app.get("/api/flavors", async (req, res,next) => {
        try {
            const SQL= `
            SELECT * FROM flavors ORDER BY created_at DESC;
            `;
            const response = await client.query(SQL);
            res.status(200).send(response.rows);
        } catch (error) {
         next(error);
        }
      })

      app.get("/api/flavors/:id", async (req, res,next) => {
        try {
            const SQL= `
            SELECT * FROM flavors WHERE id =$1; 
            
            `;
           const response = await client.query(SQL, [req.params.id]);
           res.status(200).send(response.rows[0]);
        } catch (error) {
          next(error);
        }
    
      })

      app.post("/api/flavors", async (req, res,next) => {
        try {
            const { name, is_favorite } = req.body;
            const SQL= `
            INSERT INTO flavors(name, is_favorite) VALUES ($1, $2)
            RETURNING *;
            `;
            
            const favoriteFlag = is_favorite === undefined ? false : is_favorite;
            const values = [name, favoriteFlag];
            const response = await client.query(SQL, values);
            res.status(201).send(response.rows[0]);

        } 
       
        catch (error) {
          next(error);
        }
      });
     
        
      app.delete("/api/flavors/:id", async (req, res,next) => { 
        try {
            const {id}= req.params;
            const SQL= `
            DELETE FROM flavors WHERE id = $1
            `;
            await client.query(SQL, [id]);
            res.sendStatus(204); 
        } catch (error) {
          next(error);
        }
      });

      app.put("/api/flavors/:id", async(req, res, next)=>{
        try {
            const { id } = req.params;
            const { name, is_favorite } = req.body; 
            const SQL= `
            UPDATE flavors
                SET name = $1, is_favorite = $2, updated_at = now()
                WHERE id = $3
                RETURNING *
                `;
               const response= await client.query(SQL, [name, is_favorite, id]); 
        res.status(200).json(response.rows[0]); 
        } catch (error) {
            next(error);
        }
    })


const init = async () => {
    try {
        await client.connect();
        app.listen(PORT, () => {
            console.log(`i am listening on port ${PORT}`);
        });
    }catch (error) {
        console.error(error);
    };
}
   init(); 
