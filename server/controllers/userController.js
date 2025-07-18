import Cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

export const signUp = async(req,res) => {
    const {FullName , email , password , bio} = req.body
    try {
        if (!FullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing details" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            FullName , email , password:hashedPassword , bio
        })
        const token = generateToken(newUser._id)
        res.json({success:true , userData:newUser , token , message:"Account created successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            res.json({success:false , message:"Missing details"})
        }
        const userData = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password,userData.password)
        if(!isPasswordCorrect){
            res.json({success:false , message:"Invalid credentials"})
        }
        const token = generateToken(newUser._id)
        res.json({success:true , userData , token , message:"Login Succesfully"
        }) 
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

export const checkAuth = (req,res) => {
    res.json({success:true , user:req.user})
}

export const updateProfile = async(req,res) => {
    try {
        const {profilePic , bio , FullName}  = req.body
        const userId = req.user._id
        let updatedUser
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId , {bio , FullName} , {new:true})
        }else{
            const upload = await Cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(userId , {profilePic:upload.secure_url, bio , FullName} , {new:true})
        }
        res.json({success:true , user:updatedUser})
    } catch (error) {
        res.json({success:false , message:error.message}) 
    }
}
