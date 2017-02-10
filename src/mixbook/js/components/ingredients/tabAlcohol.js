
import React, { Component } from 'react';

import { Container, Content, Text, View, InputGroup, Input, Button, List, ListItem, Fab, Icon, Footer } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';

export default class TabAlcohol extends Component { // eslint-disable-line

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
    store.get('ingredients').then((data) => {
      this.setState({theList: data.alcoholList});
    });
  }

 // onSubmit(item) {
 //    store.get('ingredients').then((data) => {
 //      var list = data.alcoholList;
 //      store.delete(item);
 //      store.update('ingredients', {
 //        alcoholList: list
 //      }).then(() => {
 //        this.replaceAt('ingredients');
 //      })
 //    });
 //  }

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <List dataArray={this.state.theList}
              renderRow={(item) =>
                <ListItem>

                  <View style={{
                    // flex: 1,
                    // flexDirection: 'row',
                    // justifyContent: 'space-between'}
                  }}>
                    <View>
                      <Text>{item}</Text>
                      <Button style={{ height: 50, backgroundColor: 'steelblue', right:10}} 
                      // onPress={() => this.onSubmit({item})}
                      >
                        <Text> Remove Item</Text>
                      </Button>
                    </View>
                  </View>
                </ListItem>
              }>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}
