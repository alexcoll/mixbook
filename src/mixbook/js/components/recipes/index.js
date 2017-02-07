
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Tabs } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import TabOne from './tabOne';
import TabTwo from './tabTwo';
import TabThree from './tabThree';

class Recipes extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Recipes</Title>

          <Button transparent>
            <Icon name="md-search"/>
          </Button>
        </Header>

        <Content>
          <Tabs>
            <TabOne tabLabel='Featured' />
            <TabTwo tabLabel='Popular' />
            <TabThree tabLabel='New' />
          </Tabs>
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

export default connect(mapStateToProps, bindAction)(Recipes);
