import bcrypt from "bcrypt";
import { User } from "../data/user.js";
import { generateToken } from "../utils/token.js";

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function registerUser({ name, email, password, role }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });
  return sanitizeUser(newUser);
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }
  
  if (!user.active) {
    const error = Error("La cuenta está desactivada");
    error.statusCode = 403;
    throw error;
  }

  const token = generateToken({ id: user._id, role: user.role });
  return { token, user: sanitizeUser(user) };
}

export async function getAllUsers() {
  return await User.find().select("-password");
}

export async function getUserById(id) {
  return await User.findById(id).select("-password");
}

export async function updateUserById(id, data) {
  const { password, ...rest } = data; 
  return await User.findByIdAndUpdate(id, rest, { new: true, runValidators: true }).select("-password");
}

export async function softDeleteUserById(id) {
  return await User.findByIdAndUpdate(id, { active: false }, { new: true }).select("-password");
}