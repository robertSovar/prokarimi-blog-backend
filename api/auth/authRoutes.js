import express from "express";
import User from "../../models/User.js";
import statusCodes from "../../config/statusCodes.js";
import userController from "../../controllers/userController.js";

const router = express.Router();

function checkRegisterRequestPayload(data) {
  if (!data?.username || !data?.email || !data?.password) {
    return false;
  }
  return true;
}

// localhost:5000/api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const isValid = checkRegisterRequestPayload(req.body);

    if (!isValid) {
      throw new Error("Invalid request payload for signup");
    }

    const { username, email, password, role } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(statusCodes.conflict).json({
        status: "Error",
        code: statusCodes.conflict,
        message: "User already exists",
        data: "User already exists",
      });
    }
    const newUser = await userController.signup({
      username,
      email,
      password,
      role,
    });
    res
      .status(statusCodes.created)
      .json({ message: "User created with success", data: newUser });
  } catch (error) {
    res.status(statusCodes.badRequest).json({ error: error.message });
  }
});

function checkLoginRequestPayload(data) {
  if (!data?.email || !data?.password) {
    return false;
  }
  return true;
}

// localhost:5000/api/auth/login
router.post("/login", async (req, res) => {
  try {
    const isValid = checkLoginRequestPayload(req.body);

    if (!isValid) {
      throw new Error("Invalid request payload for login");
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(statusCodes.unauthorized).json({
        status: "Error",
        code: statusCodes.unauthorized,
        message: "User not found",
        data: "User not found",
      });
    }

    const token = await userController.login({ email, password });
    res
      .status(statusCodes.ok)
      .json({ message: "User logged in with success", data: token });
  } catch (error) {
    res
      .status(statusCodes.badRequest)
      .json({ error: "Email or password invalid", error: error.message });
  }
});

// localhost:5000/api/auth/user
router.get("/user", userController.validateAuth, async (req, res) => {
  try {
    const header = req.get("authorization");
    if (!header) {
      throw new Error("Authorization requierd");
    }

    const token = header.split(" ")[1];
    const payload = await userController.getPayloadFromJwt(token);
    const user = await User.findOne({ email: payload.data.email });
    res
      .status(statusCodes.ok)
      .json({ message: "User found with success", data: user });
  } catch (error) {
    next(error);
  }
});

// localhost:5000/api/auth/logout
router.get("/logout", userController.validateAuth, async (req, res, next) => {
  try {
    const header = req.get("authorization");
    if (!header) {
      throw handleError("Authorization required");
    }

    const token = header.split(" ")[1];
    const payload = await userController.getPayloadFromJwt(token);

    await User.findOneAndUpdate({ email: payload.data.email }, { token: null });
    res.status(statusCodes.noContent).send();
  } catch (error) {
    throw new Error(`The request could not be fullfield: ${error}`);
  }
});
export default router;
