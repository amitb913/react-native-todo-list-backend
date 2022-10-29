import { dbConnection } from "./mongoConnection";

const getCollectionFn = (collection: any) => {
  let _col: any = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const users = getCollectionFn("users");
