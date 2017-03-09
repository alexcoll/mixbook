
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },

  mixerList: {
    flex: 1,
    marginTop: 20
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },

  rowText: {
    marginLeft: 12,
    fontSize: 16
  },

  rowContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },

  editButton: {
    alignSelf: 'flex-end'
  },

  listText: {
    alignSelf: 'flex-start'
  },

  // tabBrands.js
  listContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    marginLeft: 12,
    fontSize: 16
  }
});
