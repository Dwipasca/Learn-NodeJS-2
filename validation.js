const Validator = require('validatorjs')

const userRegisterValidation = (req, res, next) => {
    
    const data = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }

    const rules = {
        name : 'required|min:6',
        email : 'required|email',
        password : 'required|min:6'
    }

    const validation = new Validator(data, rules)

    if (validation.fails()) {
        return res.status(422).json({
          errors: {
            name: validation.errors.first('name'),
            email: validation.errors.first('email'),
            password: validation.errors.first('password')
          }
        })
    }

    // req.data = data

    return next()

}

const userLoginValidation = (req, res, next) => {
    
    const data = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }

    const rules = {
        name : 'required|min:6',
        email : 'required|email',
        password : 'required|min:6'
    }

    const validation = new Validator(data, rules)

    if (validation.fails()) {
        return res.status(422).json({
          errors: {
            name: validation.errors.first('name'),
            email: validation.errors.first('email'),
            password: validation.errors.first('password')
          }
        })
    }

    // req.data = data

    return next()

}

module.exports.userRegisterValidation = userRegisterValidation
module.exports.userLoginValidation = userLoginValidation