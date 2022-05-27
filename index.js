const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.udxz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("kaathPencil").collection("products");
        // create a document to insert
        app.get('/purchase', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });


    } finally {
        //await client.close();
    }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("running kaathPencil.....");
});

app.listen(port, () => {
    console.log('Listening to port', port);
});