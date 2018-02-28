const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({

  noAccount: {
    top: 5,
    left: 5,
    width: 100
  },

  newAccount: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 100
  },

  noAccountButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '400'
  },

  container: {
    flex:1,
    backgroundColor: '#3498db'
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },

  logo: {
    width:150,
    height:150
  },

  title: {
    color: '#FFF',
    marginTop: 10,
    width: 300,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    opacity: 0.75
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

  newAccountButtonContainer: {
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
