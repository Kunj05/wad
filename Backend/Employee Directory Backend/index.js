const express=require('express')
const path=require('path')
const fs=require('fs')

const app=express()
app.use(express.static(path.join(__dirname,'public')))

app.get('/api/employees',(req,res)=>{
    fs.readFile('./employees.json','utf-8',(err,data)=>{
        if (err) {
            return res.status(500).json({ error: 'Failed to read product data' });
        }
        const emmplye = JSON.parse(data);
        res.json(emmplye);
    })
})
app.listen(3000,(req,res)=>{
    console.log('App is running on http://localhost:3000')
})