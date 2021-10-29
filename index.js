const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000
// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.9very.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
try{
    await client.connect();
    const database = client.db('travelAgency');
    const productCollection = database.collection('products');
    const orderCollection = database.collection('orders');

}
finally{
// await client.close();
}
}

run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`)
})