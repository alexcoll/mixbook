
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: .2,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  },

  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 20
  },

  Bcontainer: {
    padding: 20
  },

  noAccountingButtonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 2,
    height: 42
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
