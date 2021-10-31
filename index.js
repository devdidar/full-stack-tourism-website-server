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



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9very.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
try{
    await client.connect();
    const database = client.db('travelAgency');
    const productCollection = database.collection('products');
    const orderCollection = database.collection('orders');
    const guideCollection = database.collection('guide');

    // all trips GET API
    app.get('/trips',async(req,res)=>{
      const result =  await productCollection.find({}).toArray();
      res.send(result);
    })

    // single trip GET API
    app.get('/trip/:id',async(req,res)=>{
      const id = req.params.id;
      const result = await productCollection.findOne({_id:(ObjectId(id))})
      res.send(result)
    })

    // book A Trip POST API 
    app.post('/bookATrip',async(req,res)=>{
      const bookATrip = req.body;
      const result = await orderCollection.insertOne(bookATrip)
      res.send(result)
    })
    // booked Trip GET API
    app.get('/bookedTrip',async(req,res)=>{
      const result = await orderCollection.find({}).toArray();
      res.send(result)
    })
    // delete Trip DELETE API 
    app.delete('/deleteTrip/:id',async(req,res)=>{
      const deletedTrip = req.params.id;
      const result = await orderCollection.deleteOne({_id:(ObjectId(deletedTrip))})
      res.send(result)
    })
    // Add A Trip POST API
    app.post('/AddATrip',async(req,res)=>{
      const result = await productCollection.insertOne(req.body)
      res.send(result)
    })
    // my ordered trip GET API
    app.get('/myBookedTrip/:id',async(req,res)=>{
      const id = req.params.id;
      const query = { userEmail:id }
      const result = await orderCollection.find(query).toArray();
      res.send(result)
    })
    // delete my orders DELETE API
    app.delete('/deleteMyTrip/:id',async(req,res)=>{
const id = req.params.id;
const result = await orderCollection.deleteOne({_id:(ObjectId(id))})
res.send(result)
    })
    // update status PUT API 
    app.put('/updateStatus/:id',async(req,res)=>{
        const filter = {_id:(ObjectId(req.params.id))}
        const result = await orderCollection.updateOne(filter, {
          $set:{
            status:'Approved'
          }
        })
        res.send(result)
    })
    // tour guide GET API
    app.get('/tourGuide',async(req,res)=>{
      const result = await guideCollection.find({}).toArray();
      res.send(result)
    })
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