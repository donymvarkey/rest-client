import { generateRandomUuid } from "@/utils";
import { db } from ".";

export const createCollection = (collectionName: string) => {
  db.collections.add({
    id: generateRandomUuid(),
    name: collectionName,
  });
};

export const saveRequestToCollection = async (
  requestId: string,
  updatedData: object
) => {
  try {
    const updated = await db.history.update(requestId, updatedData);
    if (!updated) {
      return false;
    }
    return true;
  } catch (error: any) {
    return error;
  }
};
