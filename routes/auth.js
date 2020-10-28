const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {userRegisterValidation , userLoginValidation }  = require('../validation')


// use function uservalidation first to validate data if success then the code bellow will be execute
router.post('/register', userRegisterValidation, async (req, res) => {

    // encrypt the password
    const salt = await bcrypt.genSalt(10) // this 10 is default
    const encryPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryPassword
    })

    try {
        
        // save all data  in variable user to mongo db with function save()
        const savedUser = await user.save()
        res.send( {user: user._id } )

    }catch (err) {
        res.status(400).send(err)
    }

})

router.post('/login', userLoginValidation, async (req, res) => {

    // cek if email exist or not
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).send('email is not found!')
    }

    // cek if password true or false
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
        return res.status(400).send('password is wrong')
    }

    // create and assign token to user
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

    // res.send('logged in!')

});



module.exports = router