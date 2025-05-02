const express=require('express')
const mongoose = require('mongoose');
const app=express()
const Book = require('./model.js');

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/bookstore')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));


app.get('/books', async(req,res)=>{
    try{
        const books=await Book.find();
        res.json(books);
    }catch(err){
        res.status(500).json({err:err.message})
    }
})

app.post('/books',async (req,res)=>{
    try{
        const { title, author, price, genre } = req.body;
        if (!title || !author || !price || !genre) {
        return res.status(400).json({ error: "All fields are required" });
        }
        const book = new Book({ title, author, price, genre });
        await book.save();
        res.status(201).json(book);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.delete('/books/:id',async (req, res) =>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})
app.put('/books/:id',async(req,res)=>{
    console.log('Hi')
    console.log(req.body);
    try{
        const updatedBook =await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.json(updatedBook);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
})

app.listen(3000, () => {
    console.log(`🚀 Server running on http://localhost:${3000}`);
  });
  