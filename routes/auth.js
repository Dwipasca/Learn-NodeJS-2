const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const userRegisterValidation  = require('../validation')


// use function uservalidation first to validate data if success then the code bellow will be execute
router.post('/register', userRegisterValidation, async (req, res) => {

    // encrypt the password
    const salt = await bcrypt.genSalt(10)
    const encryPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryPassword
    })

    try {
        
        // save all data  in variable user to mongo db with function save()
        const savedUser = await user.save()
        res.send(savedUser)

    }catch (err) {
        res.status(400).send(err)
    }

})

// router.post('/login')



module.exports = router