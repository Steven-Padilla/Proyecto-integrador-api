const {Pool}=require('pg')
require('dotenv').config()
const bcrypt=require('bcrypt')

const cryptimes=parseInt(process.env.ROUNDS) ;


const pool=new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_DB,
    password:process.env.DB_PASS
})



const getUsers = async (req,res) => {
    const response= await pool.query('SELECT * FROM users');
    console.log(response.rows)
    res.status(200).json(response.rows)
}
const getUsersByUsername = async (req,res) => {
    const password=req.body.password
    const username=req.params.username
    const response= await pool.query('SELECT * FROM users WHERE username = $1',[username]);


    
    if(response.rowCount===0){
        res.json({
            "error":1,
            "message":"Usuario no encontrado"
        })
    }else{
        bcrypt.compare(password,response.rows[0].password).then((equal)=>{

            if(equal){
                res.status(200).json(response.rows[0])
            }else{
                res.json({
                    "error":2,
                    "message":"Contraseña invalida"
                })
            }
           
        })
    }
    

    
    

    
}


const insertUser =  (req,res)=>{
    const { username,password}=req.body
    bcrypt.hash(password,cryptimes,async(err,passcrypted)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(passcrypted)
            const response=await pool.query('INSERT INTO users (username,password) VALUES ($1,$2)',[username, passcrypted])
            console.log(response)
        }
    })
    
    res.send('user was inserted')
}

const getDatos=async (req,res)=>{
    const response=await pool.query('SELECT * FROM datos')


    res.send(response.rows)
}

const insertDatos=async (req,res)=>{
    const {temp,humedad,agua,suelo}=req.body
    const date=  new Date().toISOString()
    fecha=date.slice(0,10)
    hora=date.slice(11,19)

    const response=await pool.query('INSERT INTO datos (temp, humedad,agua, suelo, hora, fecha) VALUES ($1,$2,$3,$4,$5,$6)',
        [temp,humedad,agua,suelo,hora,fecha]);

    console.log(response.rows)
    res.send(response.rows)
}


const getRegado=async(req,res)=>{
    const response=await pool.query('SELECT * FROM regado')
    res.json(response.rows)
}

const insertRegado=async(req,res)=>{
    const date=  new Date().toISOString()
    const fecha=date.slice(0,10)
    const hora=date.slice(11,19)
    const response=await pool.query('INSERT INTO regado (hora,fecha) VALUES ($1,$2)',[hora,fecha])
    res.json({
        data:response.rows,
        message:"Dato insertado correctamente"
    })
}
module.exports={
    getUsers,
    insertUser,
    getUsersByUsername,
    getDatos,
    insertDatos,
    getRegado,
    insertRegado
}