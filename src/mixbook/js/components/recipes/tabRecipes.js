
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View, List, ListItem, Fab, Icon, Footer, Button } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';

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
      this.setState({theList: data.recipeList});
    });
  }


  render() { // eslint-disable-line
    return (
      <Container>
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
