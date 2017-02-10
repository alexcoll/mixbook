
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Tabs } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import TabFeatured from './tabFeatured';
import TabPopular from './tabPopular';
import TabNew from './tabNew';

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
            <TabFeatured tabLabel='Featured' />
            <TabPopular tabLabel='Popular' />
            <TabNew tabLabel='New' />
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
