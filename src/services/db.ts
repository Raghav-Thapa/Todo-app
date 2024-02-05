let request : any;
let db : any;
let version = 1;

export const Stores = {
  Categories: 'categories',
};

export const initDB = () => {
  return new Promise((resolve, reject) => {
    version++;
    request = indexedDB.open('myCategory', version);

    request.onupgradeneeded = (event: any) => {
      db = event.target.result;

      if (!db.objectStoreNames.contains(Stores.Categories)) {
        console.log('Creating categories store');
        db.createObjectStore(Stores.Categories, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      console.log('request.onsuccess - initDB', db.version);
      resolve(true);
    };

    request.onerror = (event: any) => {
      console.log('request.onerror - initDB', event);
      reject(event);
    };
  });
};

export const deleteDb = () => {
  indexedDB.deleteDatabase('myDBB')
}


