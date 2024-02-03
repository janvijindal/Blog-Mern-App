import bcryptjs from 'bcryptjs'
import {errorHandler} from '../util/error.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken';

export const signup=async(req,res,next)=>{

         //take the input from user
         const{username,email,password}=req.body;

        // validate the info
         if(!username || !email || !password || username==='' || email==='' || password===''){
            next(errorHandler(400, 'All fields are required'));
         }

         //hash the password
          const hashedPassword = await bcryptjs.hashSync(password, 10);

         //create new user
         const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

       try {
        //save the new user in databse
        await newUser.save();
        res.json('Signup successful');
        
       } catch (error) {
           next(error)
       }
}

export const signin= async(req,res,next)=>{

      //fetch the email and password from req body
      const{email,password}=req.body;

      if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
      }
    
      try {
      //find the user from databse
      const validUser = await User.findOne({email});

      //check the user
      if(!validUser){
        return next(errorHandler(404, 'User not found'));
      }
      
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if(!validPassword){
        return next(errorHandler(404, 'Invalid password'));
      }

      //generatE A TOKEN FOR USER
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );

      const { password: pass, ...rest } = validUser._doc;

      //send the response with rest of valid user
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);

      } catch (error) {
        next(error);
      }

}

export const google=async(req,res,next)=>{
   //fetch the data from req body
  const { email, name, googlePhotoUrl } = req.body;
    try { 
          //chech if user exists
          const user = await User.findOne({ email });
          if(user){
                //1:generate the token
                const token = jwt.sign(
                  { id: user._id, isAdmin: user.isAdmin },
                  process.env.JWT_SECRET
                );

                const { password, ...rest } = user._doc;

                //send the response
                res.status(200) .cookie('access_token', token, {
                    httpOnly: true,
                  }).json(rest);
          }

          else{
           //create the user
           const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
           const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
           const newUser = new User({
            username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
            email,
           password: hashedPassword,
           profilePicture: googlePhotoUrl, });

          await newUser.save();

         //create the token
         const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET);

       const { password, ...rest } = newUser._doc;
       
      res.status(200) .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
          }
      
    } catch (error) {
      next(error);
    }
}