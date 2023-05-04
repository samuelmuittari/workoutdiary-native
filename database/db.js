import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('workouts.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, exercises TEXT)',
      [],
      () => console.log('Table created successfully'),
      (_, error) => console.error('Error creating table:', error)
    );
  });
};

export const saveWorkout = (title, date, exercises) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO workouts (title, date, exercises) VALUES (?, ?, ?)',
        [title, date, exercises],
        () => {
          console.log('Workout saved successfully');
          resolve(true);
        },
        (_, error) => {
          console.error('Error saving workout:', error);
          reject(error);
        }
      );
    });
  });
};

export const fetchWorkouts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM workouts',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error('Error fetching workouts:', error)
    );
  });
};
