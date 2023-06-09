const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newlist = new List(req.body);
    try {
      const savedlist = await newlist.save();
      res.status(201).json(savedlist);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

//delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await list.findByIdAndDelete(req.params.id);
      res.status(200).json("List has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});
//get
router.get("/",verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list=[];
  try {
    if(typeQuery){
      if(genreQuery){
        list = await List.aggregate([
          {$sample:{size:5}},
          {$match:{type:typeQuery,genre:genreQuery}},
        ]);
      }else{
        list = await List.aggregate([
          {$sample:{size:5}},
          {$match:{type:typeQuery}},
        ]);
      }
    }else{
   list = await List.aggregate([{$sample:{size:10}}]);
  }
  res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
