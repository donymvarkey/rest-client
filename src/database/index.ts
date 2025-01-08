import Dexie, { type EntityTable } from "dexie";

export interface Request {
  id: string;
  url: string;
  method: object;
  body: object;
  headers: {};
  params: [];
  createdAt: Date;
  collectionId: string;
}
export interface Collections {
  id: string;
  name: string;
  createdAt: Date;
}

export const db = new Dexie("HistoryDB") as Dexie & {
  history: EntityTable<Request, "id">;
  collections: EntityTable<Collections, "id">;
};

db.version(1).stores({
  history: "id, url, method, body, headers, params, createdAt, collectionId",
  collections: "id, name, createdAt",
});

db.history.hook("creating", function (primaryKey, obj) {
  if (!obj.createdAt) {
    obj.createdAt = Date.now(); // Add the default `createdAt` field
  }
});
