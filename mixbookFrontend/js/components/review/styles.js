
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

  sectionHeaderText: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 20,
  },

  reviewsSectionHeaderText: {
    fontSize: 17,
    color: 'black',
    paddingTop: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },

  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .1,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  },

  header:{
    fontSize: 16,
    paddingLeft: 20,
    color: 'black',
  },

  upCountText: {
    color: 'green',
  },

  downCountText: {
    color: 'red',
  },

  reviewUsernameText: {
    fontSize: 18,
    color: 'black',
  },

  reviewStarsText: {
    fontSize: 16,
    color: 'gray',
  },

  reviewCommentaryText: {
    fontSize: 16,
    color: 'black',
  },

  sortButtonStyle: {
  },

  sortButtonTextStyle: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },

  sortDropdownTextStyle: {
    fontSize: 14,
    color: 'black',
  },

  button: {
    alignSelf: 'center',
  },

  reviewSubmitButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },

});
