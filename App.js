import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Homescreen';
import AddWorkoutForm from './components/AddWorkout/AddWorkoutForm';
import WorkoutList from './components/WorkoutList/WorkoutList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Workout Diary App' }} />
        <Stack.Screen name="AddWorkout" component={AddWorkoutForm} options={{ title: 'Add Workout' }} />
        <Stack.Screen name="WorkoutList" component={WorkoutList} options={{ title: 'Workout List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});