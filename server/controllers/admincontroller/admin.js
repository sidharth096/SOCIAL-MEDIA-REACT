
import jwt from "jsonwebtoken";
import Users from "../../models/User.js";

export const adminLogin = async (req, res) => {
    try {
        console.log("hai");
      const { email, password } = req.body;
 
      if(email=="admin@gmail.com"&& password=="123"){
        const token = jwt.sign({ id:"admin_id" }, process.env.JWT_SECRET);
        
        res.status(200).json({ token,msg:"success" });
      }
      else{
        return res.status(400).json({ msg: "Invalid credentials. " });
      }

    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const getAllUser =async (req,res)=>{
       try {
         let users= await Users.find()
         res.status(200).json(users)
       } catch (err) {
        res.status(404).jsom({error:err.message})
       }
  }

  export const deleteUser = async (req,res) =>{
    try {
      console.log("sss");
      console.log(req.body);
      let userId =req.body.userId

      await Users.findByIdAndDelete(userId)

      let users = await Users.find()
      console.log("usersssssss",users,"users");
      res.status(201).json(users)
    } catch (error) {
      res.status(404).json({error:error.message})
    }
  }


  export const blockUnblock =async(req,res)=>{
    try {
      
      let userId=req.body.userId
      let user= await  Users.findById(userId)
      console.log(user);
      
      if(user.block == true){
        console.log("vannu");
        user.block =false
      }
      else{
        
        user.block = true
      }
      user.save()

      let users = await Users.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(404).json({error:error.message})
    }
  }