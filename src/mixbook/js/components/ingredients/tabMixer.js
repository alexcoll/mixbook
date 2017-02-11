
import React, { Component } from 'react';
import { Alert } from 'react-native';

import { Container, Content, Text, View, InputGroup, Input, Button, List, ListItem, Fab, Icon, Footer } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class TabMixer extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      displayType: 'all',
      active: 'true',
      theList: ['error']
    };
  }

  componentDidMount() {
    store.get('ingredients').then((data) => {
      this.setState({theList: data.mixerList});
    });
  }

  onListItemRemove(item) {
    var list = this.state.theList;
    var index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
      this.setState({theList: list});
      store.update('ingredients', {
        mixerList: list
      });

    }
  }

  onListItemEdit(item) {
    Alert.alert(
      item,
      'Not implemented yet',
      [
        {text: 'Cool'},
        {text: 'Work harder', style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  onListItemTap(item) {
    Alert.alert(
      item,
      'What do you want to do?',
      [
        {text: 'Delete', onPress: () => this.onListItemRemove(item)},
        {text: 'Cancel', style: 'cancel'},
        {text: 'Edit', onPress: () => this.onListItemEdit(item)},
      ],
      { cancelable: false }
    )

  }

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <List dataArray={this.state.theList}
              renderRow={(item) =>
                <ListItem>
                  <Text>{item}</Text>
                  <Button
                    style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                    onPress={() => this.onListItemTap(item)}
                  >
                    <MaterialIcons name="local-drink" size={25} color="white" style={styles.actionButtonIcon}/>
                  </Button>
                </ListItem>
              }>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}
