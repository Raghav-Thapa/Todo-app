// let request;
// let db;
// let version = 1;

// export const Stores = {
//   Categories: "categories",
// };

let db;

export const Stores = {
  Categories: "categories",
  // Add more stores as needed
};

const DB_NAME = "myCategory";
const INITIAL_VERSION = 1; // Set your initial version here

// Modified initDB to accept version
export const initDB = (version = INITIAL_VERSION) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Create object stores here
      if (!db.objectStoreNames.contains(Stores.Categories)) {
        db.createObjectStore(Stores.Categories, { keyPath: "id" });
      }
      // Add more object store creation logic here as needed
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


// export const initDB = () => {
//   return new Promise((resolve, reject) => {
//     version++;
//     request = indexedDB.open("myCategory", version);

//     request.onupgradeneeded = (event) => {
//       db = event.target.result;

//       if (!db.objectStoreNames.contains(Stores.Categories)) {
//         console.log("Creating categories store");
//         db.createObjectStore(Stores.Categories, { keyPath: "id" });
//       }
//     };

//     request.onsuccess = () => {
//       db = request.result;
//       console.log("request.onsuccess - initDB", db.version);
//       resolve(true);
//     };

//     request.onerror = (event) => {
//       console.log("request.onerror - initDB", event);
//       reject(event);
//     };
//   });
// };

export const deleteDb = () => {
  indexedDB.deleteDatabase("myCategory");
};
