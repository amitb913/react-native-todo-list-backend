import { users } from "../config/mongoCollections";
import { ObjectId } from "mongodb";
import { Task } from "./tasks";
import bcrypt from "bcrypt";
import { validateId } from "../helpers";

export interface User {
  _id: ObjectId;
  username: string;
  hashedPassword: string;
  tasks?: Task[];
}

const createUser = async (
  username: string,
  hashedPassword: string
): Promise<Omit<User, "hashedPassword">> => {
  if (!username || !hashedPassword) throw "Username or password not provided";
  username = username.toLowerCase();

  const userCollection = await users();

  //   check if user already exists
  const user = await userCollection.findOne({
    username: username.toLowerCase(),
  });
  if (user) throw "User already exists";

  const newUser: User = {
    _id: new ObjectId(),
    username: username.toLowerCase(),
    hashedPassword,
  };
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add user";
  return { _id: insertInfo.insertedId.toString(), username };
};

const authenticateUser = async (
  username: string | undefined,
  password: string | undefined
) => {
  if (!username || !password) throw "Username or password not provided";
  username = username.toLowerCase();
  const userCollection = await users();
  const user = await userCollection.findOne({
    username,
  });
  if (!user) throw "User not found";
  if (!(await bcrypt.compare(password, user.hashedPassword)))
    throw "Incorrect password"; // compare the hashed password with the password provided by the user
  return { _id: user._id.toString(), username: user.username };
};

const getUserById = async (id: string): Promise<User> => {
  validateId(id);
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: new ObjectId(id) });
  if (!user) throw "User not found";
  return user;
};

export { createUser, authenticateUser, getUserById };
