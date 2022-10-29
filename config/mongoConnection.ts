import { MongoClient } from "mongodb";
import settings from "./settings.json";

let _connection: any = undefined;
let _db: any = undefined;

export const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(settings.mongoConfig.serverUrl);
    _db = await _connection.db(settings.mongoConfig.database);
  }
  return _db;
};

export const closeConnection = async () => {
  _connection.close();
};
