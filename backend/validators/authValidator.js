//Email valid hai ya nahi
//Password length sahi hai ya nahi
//Required fields empty toh nahi
//Wrong data type toh nahi

import { body } from "express-validator";

export const registerValidator = [
    body("name")
    .notEmpty()
    .withMessage("name is required"),

    body("email")
    .isEmail()
    .withMessage("Invaild"),

    body("password")
    .isLength({min:6})
    .withMessage("password muts be at least 6 characters")

];

export const loginValidator = [
    body("email")
    .isEmail()
    .withMessage("valid email required"),

    body("password")
    .notEmpty()
    .withMessage("password is reuired")
];