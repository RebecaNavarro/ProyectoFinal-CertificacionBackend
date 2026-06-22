import { registerUser, loginUser } from "../services/userService.js";
import { validateRegisterBody, validateLoginBody } from "../utils/userValidator.js";

export async function register(req, res, next) {
  try {
    const errors = validateRegisterBody(req.body);
    if (errors.length > 0) {
      const error = Error(errors.join(" "));
      error.statusCode = 400;
      return next(error);
    }
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validateLoginBody(req.body);
    if (errors.length > 0) {
      const error = Error(errors.join(" "));
      error.statusCode = 400;
      return next(error);
    }
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}