import crypto from 'crypto'
import { users_Directory } from './user_directory.js';

const existingIds = users_Directory.users.map((user) => user.id);

export function generateRandomId(length) {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const hexString = randomBytes.toString("hex");
    if (existingIds.includes(hexString.slice(0, length))) {
      return generateRandomId(length);
    }
  return hexString.slice(0, length);
}
