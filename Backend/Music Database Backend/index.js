const express = require('express');
const mongoose = require('mongoose');
const Song = require('./model.js');

const app = express();
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/music')
    .then(() => console.log('MongoDB connected'));

const songs = [
    { Songname: 'Tum Hi Ho', Film: 'Aashiqui', Music_director: 'Mithoon', Singer: 'Arijit Singh' },
    { Songname: 'Bekhayali', Film: 'Kabir Singh', Music_director: 'Sachet–Parampara', Singer: 'Sachet Tandon' },
    { Songname: 'Kal  Ho', Film: 'Kal Ho Ho', Music_director: 'Shankar–Ehsaan–Loy', Singer: 'Sonu Nigam' },
    { Songname: 'Ghungroo', Film: 'War', Music_director: 'Vishal–Shekhar', Singer: 'Arijit Singh' },
    { Songname: 'Tujh Dikhta Hai', Film: ' Di Jodi', Music_director: 'Salim–Sulaiman', Singer: 'Roop Kumar Rathod' }
];

// Uncomment once to insert
Song.insertMany(songs);

app.get('/all', async (req, res) => {
    const allSongs = await Song.find();
    const count = await Song.countDocuments();
    res.send(`Total Songs: ${count}<br><pre>${JSON.stringify(allSongs, null, 2)}</pre>`);
});

// (e) Songs by specific Music Director
app.get('/director/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.send(songs);
});

// (f) Songs by Music Director and Singer
app.get('/director/:md/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        Music_director: req.params.md,
        Singer: req.params.singer
    });
    res.send(songs);
});

// (g) Delete song by name
app.get('/delete/:songname', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.songname });
    res.send(`Deleted song: ${req.params.songname}`);
});

// (h) Add favorite song
app.get('/add', async (req, res) => {
    const newSong = new Song({
        Songname: 'Kesariya',
        Film: 'Brahmastra',
        Music_director: 'Pritam',
        Singer: 'Arijit Singh'
    });
    await newSong.save();
    res.send('Added favorite song: Kesariya');
});

// (i) Songs by Singer from Film
app.get('/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        Film: req.params.film,
        Singer: req.params.singer
    });
    res.send(songs);
});

// (j) Update song to add actor and actress
app.get('/update/:songname', async (req, res) => {
    await Song.updateOne(
        { Songname: req.params.songname },
        { $set: { Actor: 'Shah Rukh Khan', Actress: 'Preity Zinta' } }
    );
    res.send(`Updated ${req.params.songname} with Actor & Actress`);
});

// (k) Display in tabular format
app.get('/table', async (req, res) => {
    const songs = await Song.find();
    res.render('table', { songs });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});