const express = require('express');
const mongoose = require('mongoose');
const app = express();

const studentSchema = new mongoose.Schema({
    Name: {
        type:String,
        required:true,
    },
    Roll_No: {
        type:Number,
        unique:true,
    },
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number
});

const Student = mongoose.model('Student', studentSchema);

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/student')
    .then(() => console.log("MongoDB connected"));

const sampleStudents = [
    { Name: 'Alice', Roll_No: 1, WAD_Marks: 28, CC_Marks: 25, DSBDA_Marks: 30, CNS_Marks: 32, AI_marks: 35 },
    { Name: 'Bob', Roll_No: 2, WAD_Marks: 19, CC_Marks: 22, DSBDA_Marks: 21, CNS_Marks: 20, AI_marks: 24 },
    { Name: 'Charlie', Roll_No: 3, WAD_Marks: 35, CC_Marks: 38, DSBDA_Marks: 42, CNS_Marks: 40, AI_marks: 45 },
    { Name: 'David', Roll_No: 4, WAD_Marks: 15, CC_Marks: 18, DSBDA_Marks: 19, CNS_Marks: 17, AI_marks: 21 }
];

// Student.insertMany(sampleStudents);

app.get('/all', async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.send(`Total Students: ${count}<br><pre>${JSON.stringify(students, null, 2)}</pre>`);
});

// (e) More than 20 in DSBDA
app.get('/dsbda20', async (req, res) => {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.render('table', { students });
});

// (f) Update marks of a student
app.get('/update/:name', async (req, res) => {
    const name = req.params.name;
    await Student.updateOne({ Name: name }, {
        $inc: {
            WAD_Marks: 10,
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
            AI_marks: 10
        }
    });
    res.send(`Updated marks for ${name}`);
});

// (g) Students with >25 in all subjects
app.get('/allabove25', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    });
    res.render('table', { students });
});

// (h) <40 in "Maths" and "Science" – assuming WAD = Math, CNS = Science
app.get('/maths-science-less40', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    });
    res.render('table', { students });
});


// (i) Remove student
app.get('/delete/:name', async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.send(`Deleted student ${req.params.name}`);
});

// (j) Display in tabular format
app.get('/table', async (req, res) => {
    const students = await Student.find();
    res.render('table', { students });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
