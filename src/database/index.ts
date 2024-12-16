import Dexie, { type EntityTable } from "dexie";

export interface Request {
  id: string;
  url: string;
  method: string;
  body: object;
  headers: {};
  params: [];
}

export const db = new Dexie("HistoryDB") as Dexie & {
  history: EntityTable<Request, "id">;
};

db.version(1).stores({
  history: "id, url, method, body, headers, params",
});
