import express from 'express'
import cors from 'cors'
const app = express()
import mongoose from 'mongoose'

async function dbstart(){
    const db = await mongoose.connect('mongodb://localhost/TestProject',(e) => {console.log("DATABASE CONNECTED")});
    
}

dbstart()

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const RegisterPost = new Schema({
    user: String,
    password: String
})

const RegisterModel = mongoose.model('RegisterPost',RegisterPost)

const post = new RegisterModel();

const cors_opt = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors())

app.get('/',cors(cors_opt),(req,res) => {
    res.json({msg: 'CORS ENABLED'})
})

// eaoeoaekapoea

app.post('/register',cors(cors_opt),(req,res) => {

    const user = req.headers.user
    const password = req.headers.password

    RegisterModel.find({'user': user},'user',(err,docs) => {
        if (err) {
            console.log('Error /login '+err)
            res.send('no')
        }else{
            console.log('Connected find '+docs+' '+typeof(docs)+' '+String(docs).length)
            if (String(docs).length > 0){
                const small = new RegisterModel({ user: user,password: password });
                small.save((err) => {
                    if (err){
                        console.log('Error /register '+err)
                    };
                });
                res.send('yes')
            }else{
                res.send('no')
            }
        }
    })

    console.log(`I WANT REGISTER WITH USER ${user} AND PASSWORD ${password}`)

    res.end('yes')
})

app.post('/login',cors(cors_opt),(req,res) => {

    const user = req.headers.user
    const password = req.headers.password

    //const search = new RegisterModel({ user: user,password: password });

    const User = mongoose.model('RegisterPost',RegisterPost)

    RegisterModel.find({'user': user,'password': password},'user',(err,docs) => {
        if (err) {
            console.log('Error /login '+err)
            res.send('no')
        }else{
            console.log('Connected find '+docs+' '+typeof(docs)+' '+String(docs).length)
            if (String(docs).length > 0){
                res.send('yes')
            }else{
                res.send('no')
            }
        }
    })

})

app.listen(3000,() => {
    console.log('API DISPONIBLE PORT 3000')
})