const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4500;
const secret = 'abcdefgh';


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jatinsahijwanidev:Jatin1234@cluster0.iu2oqjw.mongodb.net/?retryWrites=true&w=majority');

const userSchema = new mongoose.Schema({
    username: {type: String},
    gmail: {type: String},
    password: {type: String}
});

const scholarSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    lastDate: String,
    category: String
});

const User = mongoose.model('User',userSchema);
const Scholarship = mongoose.model('Scholarship',scholarSchema);

const verifyAdmin = (req,res,next) => {next()}

app.post('/register',async(req,res) => {
    const username = req.body.username;
    const gmail = req.body.gmail;
    const password = req.body.password;
    let existingUser = await User.findOne({username});
    if(existingUser) 
    {
        return res.json({
            message: "Username already exists"
        });
    }
    existingUser = await User.findOne({gmail});
    if(existingUser) 
    {
        return res.json({
            message: "gmail already exists"
        });
    }
    const json = {username,gmail,password};
    const newUser = new User(json);
    await newUser.save();
    const token = jwt.sign(json,secret);
    return res.json({
        message: "Registration successful",
        token: token
    });
});

app.post('/login',async(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    let existingUser = await User.findOne({username});
    if(!existingUser) return res.json({
        message: "User not found"
    })
    if(password !== existingUser.password)
    {
        return res.json({message: "Password incorrect"});
    }
    let json = {
        username: username,
        password: password,
        gmail: existingUser.gmail
    }
    const token = jwt.sign(json,secret);
    return res.json({
        message: "Registration successful",
        token: token
    });
})

app.post('/scholarships/create',verifyAdmin,async(req,res)=> {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const category = req.body.category;
    const lastDate = req.body.lastDate;
    const json = {title,description,image,lastDate,category};
    const newScholar = new Scholarship(json);
    await newScholar.save();
    return res.json({
        title: title,
        message: "Scholarship added successfully"
    });
});

app.post('/scholarhips/getAll',verifyAdmin,async(req,res)=> {
    const data = await Scholarship.find({});
    return res.json(data);
});

app.post('/scholarhips/getByTitle',verifyAdmin,async(req,res)=> {
    const title = req.body.title;
    const data = await Scholarship.findOne({title});
    if(data)
    {
        return res.json(data);
    }
    else
    {
        return res.json({
            message: `Scholarship not found with title : ${title}`
        });
    }
});

app.post('/scholarhips/getByCategory',verifyAdmin,async(req,res)=> {
    const category = req.body.category;
    const data = await Scholarship.findOne({category});
    if(data)
    {
        return res.json(data);
    }
    else
    {
        return res.json({
            message: `Scholarship not found with category : ${category}`
        });
    }
});

app.post('/scholarhips/updateByTitle',verifyAdmin,async(req,res)=> {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const lastDate = req.body.lastDate;
    const category = req.body.category;
    const existingScholarship = await Scholarship.findOne({title});
    if(!existingScholarship) return res.json({
        message: "Scholarship not found"
    })
    existingScholarship.lastDate = lastDate;
    existingScholarship.description = description;
    existingScholarship.image=image;
    existingScholarship.category=category
    await existingScholarship.save();
    return res.json({
        title: title,
        message: "Scholarship updated successfully"
    });
});

app.post('/scholarships/delete',verifyAdmin,async(req,res)=> {
    const title = req.body.title;
    const deleted = await Scholarship.findOneAndDelete({title})
    if(!deleted)
    {
        return res.json({
            message: "Scholarship not found"
        });
    }
    else
    {
        return res.json({
            message: "Scholarship deleted successfully",
            title: title
        });
    }
})



app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})