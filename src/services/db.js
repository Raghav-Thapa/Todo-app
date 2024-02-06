let db;

export const Stores = {
  Categories: "categories",
};

const DB_NAME = "myCategory";
const INITIAL_VERSION = 1;

export const initDB = (version = INITIAL_VERSION) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(Stores.Categories)) {
        db.createObjectStore(Stores.Categories, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const deleteDb = () => {
  indexedDB.deleteDatabase("myCategory");
};
