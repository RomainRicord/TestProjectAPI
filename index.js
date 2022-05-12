import express from 'express'
import cors from 'cors'
const app = express()

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

    console.log(`I WANT REGISTER WITH USER ${user} AND PASSWORD ${password}`)

    res.end('yes')
})

app.listen(3000,() => {
    console.log('API DISPONIBLE PORT 3000')
})