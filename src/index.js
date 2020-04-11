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

async function dohvati(posts, stranica, velicina) {
    let brojslika = velicina * (stranica -1)
    let db = await connect()
    let cursor = await db.collection(posts).find().limit(velicina).skip(brojslika)
    let respone = await cursor.toArray()
    return respone
}

app.get('/posts', async (req, res) => {
    let response = await dohvati('posts', 5, 10)

    res.json(response)
})





















app.listen(port, () => console.log(`Slušam na portu ${port}!`))