const {Pool}=require('pg')
require('dotenv').config()


const pool=new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_DB,
    password:process.env.DB_PASS
})



const getUsers = async (req,res) => {
    const response= await pool.query('SELECT * FROM users');
    console.log(response.rows)
    res.send(response.rows)
}

const insertData =(req,res)=>{
    res.send('users')
}

module.exports={getUsers,insertData}