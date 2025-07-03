const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes.js");
const middleware = require("../middlewares/middleware.js");

router.post("/addNote", middleware, async (req, res) => {
  try {
    const {title, description} = req.body;

    if(!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }

    const newNote = new Notes({
      title,
      description,
      userId: req.user.id
    });

    await newNote.save();
    return res.status(200).json({ success: true, message: "Note Created successfully."})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error when adding the Note." });
    
  }
})



router.get("/getNotes", middleware, async (req, res) => {
  try {

    const notes = await Notes.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error when fetching notes." });
  }
})



router.put("/updateNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Notes.findByIdAndUpdate(id, {title, description}, { new: true});
    return res.status(200).json({ success: true, message: "Note updated successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error when updating the Note." });
  }
});


router.delete("/deleteNote/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Notes.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Note deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error when deleting the Note." });
  }
})
module.exports = router;