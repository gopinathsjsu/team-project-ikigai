const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        rewardPoints:user.rewardPoints,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});
router.put("/editRewards/:id", async(req,res) =>{
  try{
    console.log("inside edit");
    filter={_id:req.params.id}
    update={rewardPoints:10}
    User.updateOne(filter,update,
      function (err,result){
        if(result){
          console.log(result);
          res.send(result);
        }
        else{
          console.log(err);
          res.send(err);
        }
      })

  }
  catch(error){

  }
})


module.exports = router;
