import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

const Row = (props) => (
  <View style={styles.container}>
    <RefreshableListView
      dataSource={this.state.dataSource}
      renderRow={this.renderArticle}
      loadData={this.reloadArticles}
      refreshDescription="Refreshing articles"
    />
  </View>
);

export default Row;
