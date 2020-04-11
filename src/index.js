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
    console.log(req.query);
    var d = new Date();
    let last6= d.setMonth(d.getMonth() - 6) //last 6 months
    
    let db = await connect()
    let cursor = await db.collection("posts").find({ postedAt: { $gte: last6.toString() } }).sort({postedAt: -1})
    let results = await cursor.toArray()

    results.forEach(e => {
        e.id = e._id
        delete e._id
    })

    res.json(results)
})

















app.listen(port, () => console.log(`Slušam na portu ${port}!`))