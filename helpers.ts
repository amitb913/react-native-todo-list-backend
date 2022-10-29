import { ObjectId } from "mongodb";

const validateId = (id: string) => {
  if (!id) throw "Id not provided";
  if (!ObjectId.isValid(id)) throw "Invalid ObjectId";
  return true;
};

const validateTaskName = (taskName: string) => {
  if (!taskName) throw "Task name not provided";
  if (taskName.trim().length === 0) throw "Task name cannot be empty";
  return true;
};

export { validateId, validateTaskName };
