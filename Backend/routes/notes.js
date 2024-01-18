const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



//ROUTE 1
//Get all the nodes using: GET "/api/notes/fetAllNotes". Login required.
router.get('/fetchAllNotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }

});



// ----------------------------------------------------------------------------------------------------------------------------------------
//ROUTE 2
//Add a new note using POST: "/api/notes/addNote". Login required

router.post('/addNote', fetchuser, [
    body('title', 'Title cannot be empty.').isLength({ min: 3 }),
    body('description', 'Enter a valid description.').isLength({ min: 1 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //If there are any errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }


});




// --------------------------------------------------------------------------------------------------------
//ROUTE 3:
//Update an existing note using: PUT "/api/notes/updateNote". Login required

router.put('/updateNote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //create a new notes object
        const newNote = {};

        if (title)
            newNote.title = title;
        if (description)
            newNote.description = description;
        if (tag)
            newNote.tag = tag;


        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Action not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
});






// --------------------------------------------------------------------------------------------------------
//ROUTE 4:
//Deleting an existing note using: DELETE "/api/notes/deleteNote". Login required

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {

    try {
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Note not found");
        }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Action not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted.", note: note });

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }


})


module.exports = router;