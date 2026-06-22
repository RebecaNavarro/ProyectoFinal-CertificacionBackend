import { 
  registerUser, 
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  softDeleteUserById
} from "../services/userService.js";
import { 
  validateRegisterBody, 
  validateLoginBody } from "../utils/userValidator.js";

export async function register(req, res, next) {
  try {
    const errors = validateRegisterBody(req.body);
    if (errors.length > 0) {
      const error = Error(errors.join(" "));
      error.statusCode = 400;
      return next(error);
    }
    const user = await registerUser({ ...req.body, role: "cliente" });
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

export async function createUser(req, res, next) {
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

export async function findUsers(req, res, next) {
  try {
    res.json(await getAllUsers());
  } catch (error) {
    next(error);
  }
}

export async function findUserById(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      const error = Error("Usuario no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function editUser(req, res, next) {
  try {
    const user = await updateUserById(req.params.id, req.body);
    if (!user) {
      const error = Error("Usuario no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function removeUser(req, res, next) {
  try {
    const user = await softDeleteUserById(req.params.id);
    if (!user) {
      const error = Error("Usuario no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}