import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: [true, 'username is required'],
        trim: true,
        minLength: [5, 'username must be at least 5 characters long'],
        maxLength: [50, 'username must be at most 50 characters long'] 
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
        minLength: [10, 'email must be at least 10 characters long'],
        maxLength: [50, 'email must be at most 50 characters long'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'email is invalid'],

    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [7, 'password must be at least 7 characters long'],      
        maxLength: [50, 'password must be at most 50 characters long'],
    }



     }, {timestamps: true});

  const User = mongoose.model('User', userSchema);
  export default User;
  