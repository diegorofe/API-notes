var express = require('express');
const note = require('../models/note');
var router = express.Router();
const User = require('../models/note');
const WithAuth = require('../middlewares/auth')

router.post('/', WithAuth, async (req, res) => {
    const { title, body } = req.body;
    console.log(title)
    console.log(req.body)

    try {
        let note = new note({ title: title, body: body, author: req.user_id});

        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error: 'Problem to create a new note'})
    }
})

module.exports = router;