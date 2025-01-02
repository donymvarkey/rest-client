import { generateRandomUuid } from "@/utils";
import { db } from ".";

export const createCollection = (collectionName: string) => {
  db.collections.add({
    id: generateRandomUuid(),
    name: collectionName,
  });
};
