import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import HomeScreen from './src/screens/homeScreen';

import Navigator from './src/navigations/homeStack';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Navigator/>     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});