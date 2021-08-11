const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../db/conn')

const User = require('../model/userSchema')

// Middleware
// Will be used to identify if the user is logged in or not
const isUserLogged = (req, res, next) => {
    next();
}

// Helper Methods
function isRequestBodyEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}


// Routes
router.get('/', (req, res) => {
    res.status(200)
    return res.send('Hello World');
});

router.get('/about', isUserLogged, (req, res) => {
    res.send('Hello from about')
})


router.get('/contact', (req, res) => {
    res.send('')
})

router.post('/signin', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (email === '' || password === '') {
        res.status(422);
        return res.json({
            error: "Please fill the fields properly"
        });
    }
    if (!email || !password) {
        res.status(422);
        return res.json({
            error: "Please fill all the required fields"
        });
    }
    try {

        const user = await User.findOne({
            email: email
        });

        if (user) {
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            const token = await user.generateAuthToken(); // returns a promise
            if (isPasswordMatching) {
                res.cookie('jwttoken', 'token', {expires: new Date(Date.now() + 25892000000), httpOnly: false, secure: false});
                res.status(200).json({
                    success: "User login successful"
                })
            } else {
                res.status(401).json({
                    error: "Invalid username / password"
                })

            }
        } else {
            res.status(401).json({
                error: "Email does not exist"
            })
        }
    } catch (err) {
        throw err;
    }
    // res.send('')
})

// router.get('/signup', (req, res) => {
//     res.send('')
// })

// Method 1: Using Promises
/*
router.post('/register', (req, res) => {
    console.log('%cauth.js line:82 token', 'color: #007acc;', token);(req.body);
    const {name, email, phone, work, password, cpassword} = req.body;

    // TODO: Validate name, email and work using helper method
    // Func


    

    if (isRequestBodyEmpty(req.body)) {
        return res.status(400).send('Empty Body is not expected');
    }

    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422);
        return res.json({error: "Please fill all the required fields"});

    }

    // check if user already exists
    User.findOne({email: email, phone: phone})
    .then((userExist) => {
        if (userExist) {
            return res.status(409).json({error: "Email already exists"});
        }

        const user = new User({name, email, phone, work, password, cpassword});
        user.save().then(() => {
                res.status(201).json({message: "User registered successfully"})
        }).catch((error) => {
            res.status(500).json({error:"Failed to register user"})
        })
    })
    .catch((error) => {console.cconsole.log('%cauth.js line:115 token', 'color: #007acc;', token);(error)});

   res.json({message: req.body});
   
})
*/

// Method 2: Using async await
router.post('/register', async (req, res) => {
    (req.body);
    const {
        name,
        email,
        phone,
        work,
        password,
        cpassword
    } = req.body;
    if (isRequestBodyEmpty(req.body)) {
        return res.status(400).send('Empty Body is not expected');
    }

    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422);
        return res.json({
            error: "Please fill all the required fields"
        });
    }

    try {
        const userExist = await User.findOne({
            email: email
        });
        if (userExist) {
            return res.status(409).json({
                error: "Email already exists"
            });
        }
        if (password !== cpassword) {
            return res.status(400).json({
                error: "Password and confirm password are not the same"
            });
        }
        // encrypt the password is done in userSchema in db using pre method
        const user = new User({
            name,
            email,
            phone,
            work,
            password
        });
        const isRegisterSuccess = await user.save();
        if (isRegisterSuccess) {
            res.status(201).json({
                message: "User registered successfully"
            })
        } else {
            res.status(500).json({
                error: "Failed to register user"
            });
        }
    } catch (err) {
        console.log('%cauth.js line:152 token', 'color: #007acc;', token);
        (err);
    }
    // await const userExist = User.findOne({email: email});
})


module.exports = router;