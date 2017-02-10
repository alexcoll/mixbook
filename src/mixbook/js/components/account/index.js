
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

class Account extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: [],
      },
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Account</Title>
        </Header>

        <Content>
          <TouchableOpacity>
            <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
          </TouchableOpacity>
          <List>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="First Name" placeholder="John" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Last Name" placeholder="Doe" />
              </InputGroup>
            </ListItem>

            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="EMAIL" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                <Input placeholder="OLD PASSWORD" secureTextEntry />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                <Input placeholder="NEW PASSWORD" secureTextEntry />
              </InputGroup>
            </ListItem>
          </List>
          <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>Save</Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Account);
