import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'
import connect from './db.js'
const fetch = require('node-fetch')

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())
app.use(express.json()) // automatski dekodiraj JSON poruke

/* čitanje postova iz MongoDB */
/* čitanje postova iz MongoDB uz pretragu i filtriranje */

    
    async function go() {
        console.log("funkcija go")
        console.time("dohvat 1")
        await dohvati("http://localhost:3000/posts")
        console.timeEnd("dohvat 1")
       
        console.time("dohvat 2")
        await dohvati("http://localhost:3000/posts?test")
        console.timeEnd("dohvat 2")
       
        console.time("dohvat 3")
        await dohvati("http://localhost:3000/posts")
        console.timeEnd("dohvat 3")
       }
      
       go ()
    
     function dohvati(url){
        let q=fetch(url).then(a =>{return a.json()})
        return q
        }
    
    app.get('/posts', async (req, res) => {
        
      
        let db = await connect()
        let cursor = await db.collection("posts").find()
        let results = await cursor.toArray()
       
        results.forEach(e => {
            e.id = e._id
            delete e._id
        })
    
        res.json(results)
    })
    


















app.listen(port, () => console.log(`Slušam na portu ${port}!`))