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


const insertData =  (req,res)=>{
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

module.exports={getUsers,insertData,getUsersByUsername}