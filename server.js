const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yaniv:y7ySs3K7HHb67F0u@gamedata.uzxxgby.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const PORT = process.env.PORT || 9000
app.use(cors());
// app.use(json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/get_characters', async(_req, res) => {
    const sample_size = Math.max(parseInt(_req.headers.limit),1);
    // const sample_size = 4;
    // console.log('sample_size', sample_size);

    await client.connect(async() => {
      const collection = client.db("characters").collection("list");

      // perform actions on the collection object
      // let outputJSON =[];
    let out=[];
    // .aggregate([{$sample:{size:1}}])
      // const outputJSON =  await collection.find().limit(parseInt(_req.headers.limit)??10);
      const outputJSON =  await collection.aggregate([{ $sample: { size: sample_size } }]);
      // console.log(outputJSON);
      
      await outputJSON.forEach((item)=>{out.push(item)});
        // console.log(out);
        res.send(out)
    });
  });


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, ()=>{
  console.log('Hosted: http://localhost:' + PORT);
  
});



/////////////////////////////////////
// 



app.get('/get_locations', async(_req, res) => {
    await client.connect(async() => {
      const collection = client.db("locations").collection("list");
      // perform actions on the collection object
      // let outputJSON =[];
    let out =[];
      const outputJSON =  await collection.find().limit(parseInt(_req.headers.limit)??10);
      await outputJSON.forEach((item)=>{out.push(item)});
        // console.log(out);
        res.send(out)
    });
    // res.send({ data: "hi" });
  });
  
  app.get('/get_parties', async(_req, res) => {
    console.log('getting get_parties');
    
    const sample_size = Math.max(parseInt(_req.headers.limit),1);
    // console.log('sample_size', sample_size);
    await client.connect(async() => {
      const collection = client.db("parties").collection("parties");
      // perform actions on the collection object
      // let outputJSON =[];
      let out =[];
    // .aggregate([{$sample:{size:1}}])
      // const outputJSON =  await collection.find().limit(parseInt(_req.headers.limit)??10);
      const outputJSON =  await collection.aggregate([{ $sample: { size: sample_size } }]);
      // console.log(outputJSON);
      
      await outputJSON.forEach((item)=>{out.push(item)});
        console.log(out);
        res.send(out)
    });
  });
  
  app.get('/search_party/:type/:value', async(_req, res) => {
    console.log('serach party', (_req.params.value).replace('-',' ').replace('1234',"'"));
    let value = (_req.params.value).replace('-',' ').replace('1234',"'");
    console.log('type ',_req.params.type, 'value:', value);
    await client.connect(async() => {
      const collection = client.db("parties").collection("parties");
      // perform actions on the collection object
      // let outputJSON =[];
      let out = [];
      let outputJSON =[];
      if(_req.params.type=='partyName')
      {
       outputJSON =  await collection.find({'partyName' : value});
  
      }
    //   else 
    //   {
    //      outputJSON =  await collection.find({[_req.params.type] : (_req.params.value).replace("%", "'").replace('-',' ')});
    // }
      await outputJSON.forEach((item) => {out.push(item)})
    // console.log('out',out);
        res.send(out)
    });
    // res.send({ data: "empty" });
  });
  
  
  app.get('/get_characters', async(_req, res) => {
    const sample_size = Math.max(parseInt(_req.headers.limit),1);
    // console.log('sample_size', sample_size);
    await client.connect(async() => {
      const collection = client.db("characters").collection("list");
      // perform actions on the collection object
      // let outputJSON =[];
    let out =[];
    // .aggregate([{$sample:{size:1}}])
      // const outputJSON =  await collection.find().limit(parseInt(_req.headers.limit)??10);
      const outputJSON =  await collection.aggregate([{ $sample: { size: sample_size } }]);
      // console.log(outputJSON);
      
      await outputJSON.forEach((item)=>{out.push(item)});
        // console.log(out);
        res.send(out)
    });
  });
  app.get('/rules', async(_req, res) => {
    console.log('get rules');
    
    // console.log('rules: '+parseInt(_req.headers.setId));
    await client.connect(async() => {
      const collection = client.db("game_data").collection("availableCharacterSettings");
      // perform actions on the collection object
      // let outputJSON =[];
    let out =[];
      const outputJSON =  await collection.find().limit(parseInt(_req.headers.limit)??10);
      await outputJSON.forEach((item)=>{out.push(item)});
        console.log(out);
        res.send(out);
    });
    // res.send({ data: "hi" });
  });
  
  app.get('/id/:id', async(_req, res) => {
    await client.connect(async() => {
      console.log('id',_req.params.id);
      // perform actions on the collection object
      // let outputJSON =[];
  
    //   const outputJSON2 =  await collection.aggregate([
    //     { $lookup:
    //         {
    //            from: "list",
    //            localField: "id",
    //            foreignField: "id",
    //            as: "basic_info"
    //         }
    //     }
    // ]);
  
    
    // collection.aggregate({ $lookup:
    //  {from : "list", localField: "id",
    //   foreignField: "id", as : "allInfo"}})
    // console.log(outputJSON2);
    const collection = client.db("characters").collection("character_sheets");
      const characterSheet =  await collection.findOne({id : parseInt(_req.params.id)});
      // const characterSheet =  await collection.findOne({id: 99});
      console.log('characterSheet',characterSheet);
    const listCollection = client.db("characters").collection("list");
      const basicInfo =  await listCollection.findOne({'id' : parseInt(_req.params.id)});
    //duplicate the basic inforamtion to the character sheet
    if(characterSheet)
    {
  
   
   characterSheet.basicInfo={};
    
    for(var key in basicInfo) {
      characterSheet['basicInfo'][key]=basicInfo[key];
    }
    console.log(characterSheet);
    
        res.send(characterSheet)
      }
    });
    // res.send({ data: "hi" });
  });
  
  app.get('/search_character/:type/:value', async(_req, res) => {
    let value = (_req.params.value).replace('-',' ').split(",").map((id) => parseInt(id))
    console.log('type ',_req.params.type, 'value:', value);
    await client.connect(async() => {
      const collection = client.db("characters").collection("list");
      // perform actions on the collection object
      // let outputJSON =[];
  
      
      let out = [];
      let outputJSON =[];
      if(_req.params.type=='id')
      {
       outputJSON =  await collection.find({'id' : {$in: value}});
  
      }
      else 
      {
         outputJSON =  await collection.find({[_req.params.type] : (_req.params.value).replace('-',' ')});
    }
      await outputJSON.forEach((item) => {out.push(item)})
    // console.log('out',out);
        res.send(out)
    });
    // res.send({ data: "hi" });
  });
  
  app.get('/get_characters/:type/:value/:amount', async(_req, res) => {
    console.log(_req.params.type);
    console.log(_req.params.value);
    let amount = parseInt(_req.params.amount);
    console.log(amount);
    await client.connect(async() => {
      const collection = client.db("characters").collection("list");
      // perform actions on the collection object
      // let outputJSON =[];
    let out =[];
    let value = _req.params.type == "level"? parseInt(_req.params.value): _req.params.value
      // const outputJSON =  await collection.find( {[_req.params.type]  : value}).limit(_req.headers.limit??10);
      const outputJSON =  await collection.find( {[_req.params.type]  : value}).limit(amount);
     
     
     
      await outputJSON.forEach((item)=>{out.push(item)});
        res.send(out)
    });
    // res.send({ data: "hi" });
  });
  
  
  app.post('/delete/:id/:party', async (_req, res) => {
    console.log('delete id: ',_req.params.id);
    console.log('party id: ',_req.params.party);
    await client.connect(async() => {
      let collection = client.db("characters").collection("list");
      let outputJSON =  await collection.deleteMany( { id: parseInt(_req.params.id)});
      console.log(outputJSON);
      
       collection = client.db("characters").collection("character_sheets");
       outputJSON =  await collection.deleteMany( { id: parseInt(_req.params.id)});
       collection = client.db("parties").collection("parties");
      //  outputJSON =  await collection.find({partyId: parseInt(_req.params.party)}).update({},
      //    { $pull: { charactersIds: { $in: [ parseInt(_req.params.id)] }} },{ multi: true });
  
         outputJSON =  await collection.findOneAndUpdate( {partyId: parseInt(_req.params.party)},
         { $pull: { charactersIds: { $in: [ parseInt(_req.params.id)] }} },{ multi: true },{ multi: true } )
      console.log(outputJSON);
  
        res.send('good')
    });
    // res.send({ data: "hi" });
  });
  
  
  app.post('/create_character', async (_req, res) => {
    let newCharacter =_req.body.data.newCharacter;
    console.log('create_character', newCharacter);
    await client.connect(async() => {
      let collection = client.db("characters").collection("list");
      console.log('got here');
      console.log(newCharacter);
      
      let outputJSON =  await collection.insertOne(
        {
          'class': newCharacter.class,
          'name': newCharacter.name,
          'race': newCharacter.race,
          'title': newCharacter.title,
          'level': newCharacter.level,
          'locationName': newCharacter.locationName,
          'player': ''+newCharacter.player,      
          'exp': ''+newCharacter.exp,      
        });
      console.log('outputJSON',outputJSON);
      let outputJSON2 =  await collection.findOne( {name: newCharacter.name});
      console.log('outputJSON2',outputJSON2);
  
        res.send(( outputJSON2))
    });
    // res.send({ data: "hi" });
  });