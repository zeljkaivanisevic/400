import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'
import connect from './db.js'


const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())
app.use(express.json()) // automatski dekodiraj JSON poruke

/* čitanje postova iz MongoDB */
/* čitanje postova iz MongoDB uz pretragu i filtriranje */




app.get('/posts', async (req, res) => {
    let query = req.query
    let filter = {}
    if (query.createdBy) {
    filter["createdBy"] = new RegExp('^' + query.createdBy) 
    }
    console.log("Filter za Mongo", filter)
    let db = await connect()
    let cursor = await db.collection("posts").find(filter).sort({postedAt: -1})
    let results = await cursor.toArray()
    // Premještanje atributa _id u id
    results.forEach(e => {
    e.id = e._id
    delete e._id
    })
    res.json(results)
   })


















app.listen(port, () => console.log(`Slušam na portu ${port}!`))