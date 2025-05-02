const express=require('express')
const app=express()
const mongoose = require('mongoose');

const employee = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:String,
    designation: String,
    salary: Number,
    joiningDate: Date
},{timestamps:true});

const Employee= mongoose.model("Emensmployee",employee);
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/employee')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Error:", err));

app.post('/employee', async(req,res)=>{
    console.log(req.body);
    const {name, department, designation, salary, joiningDate}=req.body;
    try {
        const newEmployee= new Employee({name, department, designation, salary, joiningDate})
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

app.get('/employee',async(req,res)=>{
    try{
        const detail=await Employee.find();
        res.json(detail);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.put('/employee/:id', async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedEmployee) return res.status(404).json({ error: 'Employee not found' });
      res.json(updatedEmployee);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});
  
app.delete('/employee/:id', async (req, res) => {
    try {
      const deleted = await Employee.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Employee not found' });
      res.json({ message: 'Employee deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.listen(3000,()=>{
    console.log('App listening in http://localhost:3000');
})