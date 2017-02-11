import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  }
});

const Row = (props) => (
  <View style={listStyles.container}>
    <Text style={listStyles.text}>
      {`${props.data}`}
    </Text>
  </View>
);

export default Row;
