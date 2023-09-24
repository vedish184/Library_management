import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import Book from '../models/Book.js'


export const createUser= async (req,res)=>{
 console.log("Req Recieved")
 const {name,email,password} = req.body
 const user = await User.findOne({email: email})
 
    if(user){
        res.send({message: "User already registerd"})
    } 
    else{
        const newUser = new User({
            name,
            email,
            password
        })
    //hash password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newUser.password,salt)
    
    newUser.password = hashedPassword
    
    newUser.save()
    .then(()=>res.send({message:"User Registered Successfully"}))
    .catch(err=>console.log(err))
    }
    

}

export const loginUser = async (req,res)=>{
    console.log(req.body)
    const user = await User.findOne({
		email: req.body.email,
	})
    console.log(user)
	if (!user) {
		res.send({message:"User not registered !"})
	}
    else{
	const isMatch= await bcrypt.compare(
		req.body.password,
		user.password
	)
    console.log(isMatch)
    if(isMatch){
        const token = jwt.sign(
			{
				name: user.name,
				email: user.email,

			},
			"secret123",
            {expiresIn:"1h"}
		)
       
  
        res.send({  message:"Login Successful", token:token, status:'ok', user:user })
    } else {
            res.send({status : 'error' , message:"Incorrect Password"})
        }
    
    }
}
export const addBook = async (req,res)=>{
   try {
     const {bookName,bookGenre,Price,Author,url} = req.body;
     console.log("GGz")

     const newBook = new Book({
        bookName,
        bookGenre,
        Price,
        Author,url
     })
     newBook.save().then(()=>{
        res.send({message:`${bookName} added successfully`});
     }).catch((err)=>{
         res.status(404).json({message:"Internal server error"})
     })

   } catch (error) {
    console.log(error)
   }
}

export const getBooks = async (req,res)=>{

    try {
        const books = await Book.find();
        res.status(200).json({Books:books})
    } catch (error) {
        console.log(error)
    }
}