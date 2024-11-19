import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js";
import statusCodes from "../config/statusCodes.js";

const secretForToken = process.env.TOKEN_SECRET;

//Signup function
async function signup(data) {
  const saltRounds = 10;

  try {
    let encryptedPassword = await bcrypt.hash(data.password, saltRounds);

    const newUser = new User({
      username: data.username,
      email: data.email,
      password: encryptedPassword,
      role: data.role,
    });

    return User.create(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//Login function
async function login(data) {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        {
          data: user,
        },
        secretForToken,
        { expiresIn: "1h" }
      );
      await User.findOneAndUpdate({ email: data.email }, { token: token });
      return token;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//Get payload from token function
async function getPayloadFromJwt(token) {
  try {
    const payload = jwt.verify(token, secretForToken);
    return payload;
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//Validate authentication

function validateAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(statusCodes.internalServerError).json({
        status: "Error",
        code: statusCodes.internalServerError,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

const userController = {
  signup,
  login,
  getPayloadFromJwt,
  validateAuth,
};
export default userController;
