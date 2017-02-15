
import React, { Component } from 'react';
import { Alert, View } from 'react-native';

import { Container, Content, Grid, Col, Text, Button, List, ListItem, Icon } from 'native-base';

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
      { cancelable: true }
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
      { cancelable: true }
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
                  <Grid>
                    <Col>
                      <Text style={styles.listTest}>{item}</Text>
                    </Col>
                    <Col>
                      <Button
                        transparent
                        style={styles.editButton}
                        onPress={() => this.onListItemTap(item)}
                      >
                        <MaterialIcons name="mode-edit" size={25} color="gray" style={styles.actionButtonIcon}/>
                      </Button>
                    </Col>
                  </Grid>
                </ListItem>
              }>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}
