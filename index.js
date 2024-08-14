const MongoClient = require ('mongodb').MongoClient;
const assert = require ('assert').strict;

const url ='mongodb://localhost:27017';
const dbname = 'nucampsite';

//making a connection to server, obj used to access db<client>
MongoClient.connect(url,{useUnifiedTopology: true},(err,client) =>{
    assert.strictEqual(err,null);//check actual value and expected values match or not
    console.log('connected correctly to server');

    const db = client.db(dbname);//connects us to db on mongodb server, we can use db omethod to access objects
    db.dropCollection('campsites',(err, result)=>{
        assert.strictEqual(err,null);
        console.log('Dropped collection');

        //recreated collection
        const collection = db.collection('campsites');
        collection.insertOne({ name:"Breadcrumb Trail Campground", description:"Test"},(err,result) =>{
            assert.strictEqual(err,null);
            console.log('Insert Document', result.ops);

            collection.find().toArray((err,docs)=>{
                assert.strictEqual(err,null);
                console.log('Found Documents',docs);
                client.close();
            })

            
        }
     ) })
});

