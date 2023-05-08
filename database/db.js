import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('workouts.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, exercises TEXT)'
    );
  });
};

export const saveWorkout = (title, date, exercises) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO workouts (title, date, exercises) VALUES (?, ?, ?)',
          [title, date, exercises],
          (_, result) => {
            resolve(true);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

export const fetchWorkouts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM workouts',
      [],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
};

export const removeWorkout = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM workouts WHERE id = ?',
        [id],
        () => {
          resolve(true);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
