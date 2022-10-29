import { users } from "../config/mongoCollections";
import { ObjectId } from "mongodb";
import { getUserById } from "./users";
import { validateId, validateTaskName } from "../helpers";

export interface Task {
  _id: ObjectId;
  taskName: string;
}

const createTask = async (id: string, taskName: string): Promise<any> => {
  // takes in userId and taskName
  validateId(id);
  validateTaskName(taskName);
  const userCollection = await users();
  const taskObj = { _id: new ObjectId(), taskName }; // create task object
  const updatedInfo = await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $push: { tasks: taskObj } }
  );
  if (updatedInfo.modifiedCount === 0) throw "Could not add task";
  return { _id: taskObj._id.toString(), taskName };
};

const getAllTasks = async (
  id: string
): Promise<{ _id: string; taskName: string }[] | undefined> => {
  // takes in userId
  // get all tasks for a specific user
  const user = await getUserById(id);
  let taskList = user.tasks?.map((task) => ({
    ...task,
    _id: task._id.toString(),
  }));
  return taskList;
};

const getTaskById = async (id: string): Promise<Task> => {
  // takes in taskId
  validateId(id);
  const userCollection = await users();
  const user = await userCollection.findOne(
    { "tasks._id": new ObjectId(id) },
    { projection: { _id: 0, "tasks.$": 1 } }
  );
  if (!user) throw "Task not found";
  return { ...user.tasks[0] };
};

const updateTask = async (id: string, taskName: string): Promise<Task> => {
  // takes in taskId and taskName
  validateId(id);
  validateTaskName(taskName);
  const userCollection = await users();
  const updatedInfo = await userCollection.updateOne(
    { "tasks._id": new ObjectId(id) },
    { $set: { "tasks.$.taskName": taskName } }
  );
  if (updatedInfo.modifiedCount === 0) throw "Could not update task";
  return { _id: new ObjectId(id), taskName };
};

const removeTask = async (id: string): Promise<string> => {
  // takes in taskId
  validateId(id);
  const userCollection = await users();
  const updatedInfo = await userCollection.updateOne(
    { "tasks._id": new ObjectId(id) },
    { $pull: { tasks: { _id: new ObjectId(id) } } }
  );
  if (updatedInfo.modifiedCount === 0) throw "Could not remove task";
  return `Task with id ${id} removed`;
};

export { createTask, getAllTasks, getTaskById, updateTask, removeTask };
