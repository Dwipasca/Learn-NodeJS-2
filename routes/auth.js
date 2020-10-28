const router = require('express').Router()
const User = require('../model/User')
const userRegisterValidation  = require('../validation')


// use function uservalidation first to validate data if success then the code bellow will be execute
router.post('/register', userRegisterValidation, async (req, res) => {

    

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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