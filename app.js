require("dotenv").config();
const express=require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session=require("express-session");
const {MongoClient} = require('mongodb');

const app=express();

app.use(bodyParser.urlencoded({extended: true}));



const uri = process.env.URI;
const client =new MongoClient(uri);
client.connect();


app.get("/",function(req,res){
    res.send("Hello world!!");
})


//for fetching data
app.get("/:dbname/:colname",async function(req,res){
    const dbName=client.db(req.params.dbname);
    const collec=dbName.collection(req.params.colname);
    const allAttr=Object.keys(req.query);
    var indexQuery={}
    for(var i=0;i<allAttr.length;i++){
        indexQuery[allAttr[i]]=1;
    }
    console.log(indexQuery);
    console.log(req.query);
    await collec.createIndex(indexQuery);
    const result=await collec.find(req.query).toArray();
    console.log("result",result);
    await collec.dropIndexes();
    res.send(result);
    //query here:
});

//for inserting data
app.post("/:dbname/:colname",async function(req,res){
    const dbName=client.db(req.params.dbname);
    const collec=dbName.collection(req.params.colname);
    const newData=req.query;
    const result=await collec.insertOne(newData);
    console.log(result);
    res.send(result);

    //query here:
});


//for deleting specific data
app.delete("/:dbname/:colname",async function(req,res){
    const dbName=client.db(req.params.dbname);
    const collec=dbName.collection(req.params.colname);
    const allAttr=Object.keys(req.query);
    var indexQuery={}
    for(var i=0;i<allAttr.length;i++){
        indexQuery[allAttr[i]]=1;
    }
    console.log(indexQuery);
    console.log(req.query);
    await collec.createIndex(indexQuery);
    const result=await collec.findOneAndDelete(req.query);
    console.log(result);
    await collec.dropIndexes();
    res.send("Deleted!!");
    //query here:
});


app.listen(3000,function(){
    console.log("Server running at 3000");
})




// const addressSchema=new mongoose.Schema({
//     school: mongoose.Schema.Types.ObjectId,
//     address: String
// });
// const Address=new mongoose.model("Address",addressSchema);
// app.get("/addAddress", async function(req,res){
//     const allSchools=await Schools.find({});
//     for(var i=0;i<allSchools.length;i++){
//         var add={
//             school: allSchools[i]._id,
//             address: allSchools[i].Address
//         };
//         var res= await Address.create(add);
//         console.log(res);
//     }
// })



// const schoolNameSchema=new mongoose.Schema({
//     name: String,
//     school: mongoose.Schema.Types.ObjectId
// });
// const SchoolName=new mongoose.model("SchoolName",schoolNameSchema);
// app.get("/addSchool",async function(req,res){
//     const allSchools=await Schools.find({});
//     for(var i=0;i<allSchools.length;i++){
//         var add={
//             name: allSchools[i].SchoolName,
//             school: allSchools[i]._id
//         };
//         var res= await SchoolName.create(add);
//         console.log(res);
//     }
// })


// const localitySchema=new mongoose.Schema({
//     locality: String,
//     school: mongoose.Schema.Types.ObjectId
// });

// const Locality=new mongoose.model("Locality",localitySchema);

// app.get("/addLocality",async function(req,res){
//     const allSchools=await Schools.find({});
//     for(var i=0;i<allSchools.length;i++){
//         var add={
//             locality: allSchools[i].Locality,
//             school: allSchools[i]._id
//         };
//         var res= await Locality.create(add);
//         console.log(res);
//     }
// })

// const affiliationSchema=new mongoose.Schema({
//     affiliation: String,
//     school: mongoose.Schema.Types.ObjectId
// });

// const Affiliation=new mongoose.model("Affiliation",affiliationSchema);

// app.get("/addAffiliation",async function(req,res){
//     const allSchools=await Schools.find({});
//     for(var i=0;i<allSchools.length;i++){
//         var add={
//             affiliation: allSchools[i].Affiliation,
//             school: allSchools[i]._id
//         };
//         var res= await Affiliation.create(add);
//         console.log(res);
//     }
// })