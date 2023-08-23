const DB_NAME = 'background-sync';
export const STORES = [
    { name: 'image-store', url: '/api/file' },
    { name: 'reports-store', url: '/api/reports' },
    { name: 'reports-done-store', url: '/api/reports/' }
];

async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);
        request.onerror = (event) => {
            reject(event.target?.error);
        };
        request.onsuccess = (event) => {
            resolve(event.target?.result);
        };
        request.onupgradeneeded = (e) => {
            const version = e.oldVersion;
            if (version === 0) {
                const db = e.target.result;
                STORES.forEach((storeName) => {
                    if (!db.objectStoreNames.contains(storeName.name)) {
                        const store = db.createObjectStore(storeName.name, { autoIncrement: true });
                        store.createIndex('id', 'id', { unique: true });
                    }
                });
                console.log('DB upgraded');
            }
        };
    });

}

export async function saveObject(object, storeName) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        transaction.oncomplete = () => {
            db.close();
            resolve();
        };
        transaction.onerror = (event) => {
            reject(event.target?.error);
        };
        const request = store.add(object);
        request.onerror = (event) => {
            reject(event.target?.error);
        };

    });
}

export async function getAll(storeName) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.openCursor();
        const results = [];
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                results.push({ value: cursor.value, key: cursor.key });
                cursor.continue();
            } else {
                db.close();
                resolve(results);
            }
        };
        request.onerror = (event) => {
            reject(event.target?.error);
        };
    });
}

export async function deleteObject(storeName, key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = () => {
            db.close();
            resolve();
        };
        request.onerror = (event) => {
            reject(event.target?.error);
        };
    });
}