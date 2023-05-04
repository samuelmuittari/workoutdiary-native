import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { saveWorkout } from '../../database/db';
import { Calendar } from 'react-native-calendars';

const AddWorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = () => {
    saveWorkout(title, selectedDate, exercises)
      .then(() => {
        Alert.alert('Success', 'Workout added successfully');
        setTitle('');
        setSelectedDate(new Date().toISOString().slice(0, 10));
        setExercises('');
      })
      .catch(() => {
        Alert.alert('Error', 'There was an issue adding the workout. Please try again.');
      });
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Exercises"
        value={exercises}
        onChangeText={text => setExercises(text)}
      />
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'black',
          },
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddWorkoutForm;
