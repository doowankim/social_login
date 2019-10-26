//유효성 검사(Joi)
const Joi = require('joi');

module.exports = {
    //error 뿌려주는 것
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error){
                return res.json(result.error);
            }
            next(); //정상동작으로 넘어감
        }
    },

    schemas: {
        signupSchema: Joi.object().keys({
            username: Joi.string().min(2).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }),
        loginSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })
    }
};