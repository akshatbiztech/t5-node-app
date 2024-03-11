import { users_Directory } from "./user_directory.js";
import { generateRandomId } from "./idGenereator.js";

export function getAllUsers() {
    return {
        message : "Users retreived",
        success : true,
        ...users_Directory
    }
}

export function getUser(id) {
  const userIndex = users_Directory.users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return 404;
  }
  return users_Directory.users[userIndex];
}

export function putRequest(id,body) {
    const userIndex = users_Directory.users.findIndex((user) => user.id === id);
    const {email,firstName} = body;
    if (userIndex === -1) {
      return 404;
    }

    if (email) {
      users_Directory.users[userIndex].email = email;
    }

    if (firstName) {
      users_Directory.users[userIndex].firstName = firstName;
    }

    return 200;
}

export function postRequest(body) {
    const { email, firstName } = body;
    const newId = generateRandomId(8);
    users_Directory.users.push({ email, firstName, id: newId });
    return 200;
}