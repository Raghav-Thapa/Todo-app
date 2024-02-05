let request : any;
let db : any;
let version = 1;

export const addData = (storeName: string, data: any) => {
  return new Promise((resolve) => {
    request = indexedDB.open("myCategory", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        console.log(`Creating ${storeName} store`);
        db.close();
        const newVersion = db.version + 1;
        version = newVersion;
        request = null;

        request = indexedDB.open("myCategory", newVersion);
        request.onupgradeneeded = (event: { target: { result: any; }; }) => {
          db = event.target.result;
          console.log(`Creating ${storeName} store in onupgradeneeded`);
          db.createObjectStore(storeName, { keyPath: "id" });
        };

        request.onsuccess = () => {
          db = request.result;
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          store.add(data);
          resolve(data);
        };
      } else {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.add(data);
        resolve(data);
      }
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getStoreData = (storeName: string ) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = () => {
        reject(getAllRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};


export const getStoreDataForAddingTasks = (storeName : string, key: number) => {
  return new Promise((resolve, reject) => {
    if (key === null || key === undefined) {
      reject(new Error("Key is null or undefined"));
      return;
    }

    const request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      console.log("request.onsuccess - getStoreDataa");
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateData = (storeName: string, key: number, updatedData: {}) => {
  console.log("updateData called with:", storeName, key, updatedData);
  return new Promise((resolve, reject) => {
    request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      let db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        console.log(`Creating ${storeName} store`);
        db.close();
        const newVersion = db.version + 1;
        version = newVersion;
        request = null;

        request = indexedDB.open("myCategory", newVersion);
        request.onupgradeneeded = (event) => {
          db = event.target.result;
          console.log(`Creating ${storeName} store in onupgradeneeded`);
          db.createObjectStore(storeName, { keyPath: "id" });
        };

        request.onsuccess = () => {
          db = request.result;
          const transaction = db.transaction(storeName, "readwrite");
          const store = transaction.objectStore(storeName);

          const getRequest = store.get(key);

          getRequest.onsuccess = () => {
            const data = getRequest.result;
            Object.assign(data, updatedData);
            console.log("Data to put in the database:", data);
            const putRequest = store.put(data);

            putRequest.onsuccess = () => {
              resolve(data);
            };

            putRequest.onerror = () => {
              reject(putRequest.error);
            };
          };

          getRequest.onerror = () => {
            reject(getRequest.error);
          };
        };
      } else {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const getRequest = store.get(key);

        getRequest.onsuccess = () => {
          const data = getRequest.result;
          Object.assign(data, updatedData);
          console.log("Data to put in the database:", data);
          const putRequest = store.put(data);

          putRequest.onsuccess = () => {
            resolve(data);
          };

          putRequest.onerror = () => {
            reject(putRequest.error);
          };
        };

        getRequest.onerror = () => {
          reject(getRequest.error);
        };
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const putData = (storeName: string, data: any) => {
  console.log("putData called with:", storeName, data);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const putRequest = store.put(data);

      putRequest.onsuccess = () => {
        resolve(data);
      };

      putRequest.onerror = () => {
        reject(putRequest.error);
      };
    };
  });
};

export const deleteData = (storeName: string, key: number) => {
  return new Promise((resolve) => {
    request = indexedDB.open("myCategory", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - deleteData", key);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      };
    };
  });
};

export const editCategory = (storeName: string, key: number, updatedData: any) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        const data = getRequest.result;
        Object.assign(data, updatedData);
        const putRequest = store.put(data);

        putRequest.onsuccess = () => {
          resolve(putRequest.result);
        };

        putRequest.onerror = () => {
          reject(putRequest.error);
        };
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateCategoryName = (storeName: string, categoryId: number, newCategoryName: string) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const category = store.get(categoryId);
      // console.log(category)

      category.onsuccess = () => {
        const data = category.result;
        // console.log('category selected ',data)
        data.cate = newCategoryName;
        const requestUpdate = store.put(data);

        requestUpdate.onsuccess = () => {
          resolve(requestUpdate.result);
        };

        requestUpdate.onerror = () => {
          reject(requestUpdate.error);
        };
      };

      category.onerror = () => {
        reject(category.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateTaskName = (storeName: string, categoryId: number, taskId: number, newTaskName: string) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");

    // console.log('from db', storeName, categoryId,taskId, newTaskName)

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const category = store.get(categoryId);
      // console.log('category is',category)

      category.onsuccess = () => {
        const data = category.result;
        console.log("success is running");
        // console.log("data to edit is ",data)
        const task = data.tasks.find((task: { id: number; }) => task.id === taskId);

        if (task) {
          task.todo = newTaskName;
          const requestUpdate = store.put(data);

          requestUpdate.onsuccess = () => {
            resolve(requestUpdate.result);
          };
          requestUpdate.onerror = () => {
            reject(requestUpdate.error);
          };
        } else {
          reject(new Error("Task not found"));
        }
      };

      category.onerror = () => {
        reject(category.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateTaskStatus = (storeName: string, categoryId: number, taskId:number, status: string) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");
    console.log("from db", storeName, taskId, status);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        reject(`Object store ${storeName} does not exist`);
        return;
      }
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const category = store.get(categoryId);

      category.onsuccess = () => {
        const data = category.result;
        const task = data.tasks.find((task: { id: number; }) => task.id === taskId);

        if (task) {
          task.status = status;
          const requestUpdate = store.put(data);

          requestUpdate.onsuccess = () => {
            resolve(requestUpdate.result);
          };
          requestUpdate.onerror = () => {
            reject("Error updating task status");
          };
        } else {
          reject("Task not found");
        }
      };
      category.onerror = () => {
        reject("Error retrieving category");
      };
    };
    request.onerror = () => {
      reject("Error opening database");
    };
  });
};

export const getTask = (storeName: string, categoryId: number, taskId: number) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myCategory");

    request.onsuccess = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        reject(`Object store ${storeName} does not exist`);
        return;
      }

      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const category = store.get(categoryId);

      category.onsuccess = () => {
        const data = category.result;

        if (!data) {
          reject("Category not found");
          return;
        }

        const task = data.tasks.find((task: { id: number; }) => task.id === taskId);

        if (task) {
          resolve(task);
        } else {
          reject("Task not found");
        }
      };

      category.onerror = () => {
        reject("Error retrieving category");
      };
    };

    request.onerror = () => {
      reject("Error opening database");
    };
  });
};
