const express = require('express');
const user_routes = express.Router();
const UserController = require("../../controllers/user/userController")
const user = new UserController();

user_routes.post("/user/registry", (req, res) => { user.registry(req, res) })
user_routes.post("/user/login", (req, res) => { user.login(req, res) })

module.exports = user_routes;