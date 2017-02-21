
import React, { Component } from 'react';
import { Alert, View } from 'react-native';

import { Container, Content, Grid, Col, Text, Button, List, ListItem, Icon } from 'native-base';

import styles from './styles';

import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

export default class TabAlcohol extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      displayType: 'all',
      active: 'true',
      theList: [{name: 'error', type: "Error", proof: 0}]
    };
  }


  componentDidMount() {
    store.get('alcohol').then((data) => {
      this.setState({theList: data});
    });
  }


  checkListName(data) {
    return data.name == this;
  }


  onListItemRemove(item) {
    var list = this.state.theList;
    var index = list.findIndex(this.checkListName, item.name);
    if (index > -1) {
      list.splice(index, 1);
      this.setState({theList: list});
      store.save('alcohol', this.state.theList);
    }
  }


  onListItemEdit(item) {
    Alert.alert(
      "Edit " + item.name + " " + item.type,
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
      "Edit " + item.name + " " + item.type,
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
              renderRow={(data) =>
                <ListItem>
                  <Grid>
                    <Col>
                      <Text style={styles.listTest}>{data.name}</Text>
                      <Text style={styles.listTest}>{data.type} {data.proof} proof</Text>
                    </Col>
                    <Col>
                      <Button
                        transparent
                        style={styles.editButton}
                        onPress={() => this.onListItemTap(data)}
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
