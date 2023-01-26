// ...rest of the initial code omitted for simplicity.
import pkg from 'express-validator';
const { check } = pkg;

export const userValidator = [
    // validator.matches(name,/^[a-zA-Z ]*$/)
    check('name')
    .notEmpty()
    .matches(/^[a-zA-Z ]*$/)
    .withMessage('Name cannot contain special characters')
    .isLength({min:2, max:100})
    .withMessage('Name is too short or too long'),
    
    check('email')
    .notEmpty()
    .isEmail(),

    check('password')
    .notEmpty()
    .isStrongPassword()
    .withMessage('Password not strong enough.')
    .isLength({min:8})
    .withMessage('Password is too short'),
                                 
    check('phone', 'Phone number is requred')
    .notEmpty()                                 
    .isMobilePhone().isLength({min:11})
    .withMessage('Invalid phone number'),                           
    

    check('dob', 'Date of birth is required')
    .notEmpty()
    .isDate()
    .withMessage('Invalid date'),                                 
    

    check('gender', "Must select gender")    
    .notEmpty()
    .isLength({min:3,max:50})
    .withMessage('Characters too short or too long'), 
    
    check('address')
    .optional()
    .isLength({max: 255}),    
];

export const loginValidator = [
    check('email')
    .notEmpty()
    .isEmail(),
    
    check('password')
    .notEmpty()
];

export const updatePassValidator = [
    check('email')
    .notEmpty()
    .isEmail(),

    check('password')
    .notEmpty()
    .isStrongPassword()
    .withMessage('Password not strong enough.')
    .isLength({min:8})
    .withMessage('Password is too short'),
]