import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  removeTask,
} from "./tasks";

import { createUser, authenticateUser, getUserById } from "./users";

export const taskMethods = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  removeTask,
};

export const userMethods = { createUser, authenticateUser, getUserById };
