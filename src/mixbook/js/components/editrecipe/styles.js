
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  rowText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },

  searchBar: {
    paddingLeft: 30,
    fontSize: 16,
    height: 50,
    width: 340,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  },

  dropDownStyle: {
    width: 75,
    backgroundColor: 'cornflowerblue',

  },

  dropDownTextStyle: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    textAlignVertical: 'center'
  },
  
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 20
  },

});
