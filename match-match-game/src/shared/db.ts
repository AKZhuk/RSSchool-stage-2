import { User } from './interfaces';

export class Database {
  public db!: IDBDatabase;

  init(): void {
    const iDB = window.indexedDB;
    const openRequest = iDB.open('AKZhuk', 1);
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      database.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      this.db = database;
    };
    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
    openRequest.onerror = () => {
      throw new Error(`Errror has occured! Abort, ${openRequest.error}`);
    };
  }

  write(collection: string, row: User): void {
    const transaction = this.db.transaction(collection, 'readwrite');
    const store = transaction.objectStore(collection);
    const result = store.add(row);

    result.onsuccess = () => {};

    result.onerror = () => {
      throw new Error(`Errror has occured! Writing in DB error, ${transaction.error}`);
    };

    transaction.onabort = () => {
      throw new Error(`Errror has occured! Abort, ${transaction.error}`);
    };
  }

  readAll(collection: string): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(collection, 'readonly');
      const store = transaction.objectStore(collection);
      const request = store.getAll();
      transaction.oncomplete = () => {
        resolve(request.result);
      };
      transaction.onerror = () => {
        reject(new Error(`Errror has occured! read data from DB error, ${transaction.error}`));
      };
    });
  }
}
