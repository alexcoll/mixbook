
import React, { Component } from 'react';
import { Alert, View } from 'react-native';

import { Container, Content, Text, List, ListItem, Icon, Button, Grid, Col } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class TabRecipes extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      displayType: 'all',
      active: 'true',
      theList: ['error']
    };
  }


  componentDidMount() {
    store.get('recipes').then((data) => {
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
      store.save('recipes', list).then(() => {
        this.setState({theList: list});
      }).catch((error) => {
        console.warn("error with recipes store");
      });
    }
  }


  onListItemEdit(item) {
    Alert.alert(
      'Edit' + item,
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
      'Edit' + item.name,
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
                      <Text style={styles.listTest}>{data.alcohol} {data.mixers}</Text>
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
