let request;
let db;
let version = 1;

export const Stores = {
  Categories: 'categories',
};

export const initDB = () => {
  return new Promise((resolve, reject) => {

    request = indexedDB.open('myCategory');

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains(Stores.Categories)) {
        console.log('Creating categories store');
        db.createObjectStore(Stores.Categories, { keyPath: 'id' });
      }

      request.onsuccess = () => {
        db = request.result;
        version = db.version;
        console.log('request.onsuccess - initDB', version);
        resolve(true);
      };
    };

    request.onerror = (event) => {
      console.log('request.onerror - initDB', event);
      reject(event);
    };
  });
};

export const deleteDb = () => {
    indexedDB.deleteDatabase('myDBB')
}

