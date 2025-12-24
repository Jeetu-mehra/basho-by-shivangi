import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}