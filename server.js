const express=require("express");
const mongodb=require("mongodb")
const mongoclient=mongodb.MongoClient;
const url="mongodb+srv://shoaib:shoaib123@cluster0.p6yw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app=express();
const cors=require("cors")

app.use(express.json())
app.use(cors({
    origin : "*"
}))

// var students =[]

app.post("/user-create",async function(req,res){
    try{
        let conn =await mongoclient.connect(url)

        let db = conn.db("StudentAdmin")

        req.body.userid= parseInt(await db.collection("students").count())+1

        await db.collection("students").insertOne(req.body)

        await conn.close()
    }
    catch(err)
    {
        console.log(err)
    }

    res.json({
        message : "Student added"
    })
})

app.get("/user-list",async function(req,res){
    try{
        let conn =await mongoclient.connect(url)

        let db = conn.db("StudentAdmin")

        let student=await db.collection("students").find().toArray()

        await conn.close()

        res.json(student)
    }
    catch(err)
    {
        console.log(err)
    }

    
})

app.post('/user-edit/:id', async function(req, res) {
    try{
        var id= parseInt(req.params.id)
        let conn =await mongoclient.connect(url)

        let db = conn.db("StudentAdmin")

        req.body.userid=id

        await db.collection("students").replaceOne({userid:id},req.body)

        await conn.close()

        res.json({
            message: "student Edited"
        })
    }
    catch(err)
    {
        console.log(err)
    }

});

app.get('/user-edit/:id', function(req, res) {
    var id= parseInt(req.params.id)-1;

    res.json({
        message:"success"
    })

});

app.post('/user-delete/:id',async function(req, res) {
    try{
        var id= parseInt(req.params.id)
        let conn =await mongoclient.connect(url)

        let db = conn.db("StudentAdmin")


        await db.collection("students").deleteOne({userid:id})

        await conn.close()

        res.json({
            message: "student deleted"
        })
    }
    catch(err)
    {
        console.log(err)
    }

});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running")
})
