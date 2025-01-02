const UserSchema = require("../../database/schemas/UserSchema")
const bcrypt = require("bcrypt")
const validate = require("../../util/user/validate_emaill")

/**
 * This login/registration code cannot be used on a large scale as it has some security flaws that allow access to user chats.
 * 
 * It is a simple code because the focus of the project is not the login system but the possibility of talking to the AI.
 * 
 * Ryan Gustavo developer
 */



class UserController {

    async registry(req, res) {

    //Requirements
    const body = req.body;
    const saltRounds = 10;
    const user = await UserSchema.findOne({ email: body.email });
    const id = Math.floor(Math.random() * (999999999999 - 111111111111 + 1) + 111111111111);

    //Verification
    if (user) {
    res.status(401)
    return res.json({ code: 401, message: `This email already exists`})
    }
    if (!validate(body.email)) { 
    res.status(401)
    return res.json({ code: 401, message: `This email is invalid`})
    }

    //Encrypting password
    await bcrypt.hash(body.password, saltRounds, async function(err, hash) {
    if (err) return console.log(err);
    await UserSchema.create({ id, email: body.email, username: body.username, password: hash })
    
    });

    res.status(201)
    return res.json({ code: 201, message: `User registry`, user_id: id })
    }

    async login(req, res) {
        try {
          const body = req.body;
          const user = await UserSchema.findOne({ email: body.email });
      
          // Validating if user exists
          if (!user) {
            return res.status(401).json({ code: 401, message: "This user doesn't exist" });
          }
      
          // Comparing password
          bcrypt.compare(body.password, user.password, function (err, result) {
            if (err) {
              return res.status(500).json({ code: 500, message: "Error comparing password" });
            }
      
            if (result === false) {
              return res.status(401).json({ code: 401, message: "Invalid password" });
            }
      
            // If password matches, send success response
            return res.status(200).json({
              code: 200,
              message: `Logged in to ${user.username} account`,
              id: user.id,
              username: user.username,
              chats: user.chats,
            });
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ code: 500, message: "Internal server error" });
        }
      }
      
}

module.exports = UserController;