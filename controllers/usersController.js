"use strict";

const User = require("../models/user"),

    getUserParams = body =>{
        return{
            name:{
                first: body.first,
                last: body.last
            },
            email: body.email,
            password: body.password,
            zipCode: body.zipCode
        };
    };
module.exports = {
    login: (req, res)=>{
        res.render("users/login");
    },
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fethcing user data: ${error.message}`)
            })
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    new: (req, res) => {
        res.render("users/new")
    },
    create: (req, res, next) => {
        let userParams = getUserParams(req.body);

        

        user.create(userParams)
            .then(user => {

                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`)
                next(error);
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    showView: (req, res) => {
        res.render("users/show")
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("/users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error loading user by ID: ${error.message}`);
                next(error);
            })
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let updatedUser = new user({
            name:{
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            zipCode: req.body.zipCode,
            password: req.body.password
        })
        User.findByIdAndUpdate(userId, updatedUser)
            .then(user => {
                res.locals.User = user;
                res.local.redirect = `/user/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    }
}