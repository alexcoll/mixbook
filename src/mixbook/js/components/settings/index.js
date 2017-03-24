
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, CheckBox, Text } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import store from 'react-native-simple-store';

class Settings extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputKeepLoggedIn: true,
    };
  }


  componentDidMount() {
    /*store.get('settings').then((data) => {
      this.setState({inputKeepLoggedIn: data.keepLoggedIn});
    }).catch((error) => {
      console.warn("error getting settings from local store");
    });*/
  }


  toggleKeepLoggedIn() {
    this.setState({
      
    });
    /*store.save("setings", {
      keepLoggedIn: this.state.inputKeepLoggedIn
    }).catch((error) => {
      console.warn("error storing settings into local store");
    });*/
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Settings</Title>
        </Header>

        <Content>
          <List>
            <ListItem
              button
              onPress={() => this.toggleKeepLoggedIn()}
            >
              <CheckBox
                checked={this.state.inputKeepLoggedIn}
                onPress={() => this.toggleKeepLoggedIn()}
              />
              <Text>Stay logged in</Text>
            </ListItem>
          </List>
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

export default connect(mapStateToProps, bindAction)(Settings);
