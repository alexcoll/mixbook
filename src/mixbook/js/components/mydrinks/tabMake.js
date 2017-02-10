
import React, { Component } from 'react';

import { Container, Content, Text, List, ListItem, Thumbnail } from 'native-base';

import styles from './styles';

const placeholder = require('../../../img/placeholder.png');

export default class TabMake extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <List>
            <ListItem>
              <Thumbnail source={{uri: 'http://www.jimbeam.com/sites/default/files/product/8188_JBW_Straight_R1_EURO.png?crc=e6885ecf'}} />
              <Text>Jim Beam</Text>
              <Text note>Jim Beam recommended with Coke</Text>
            </ListItem>
            <ListItem>
              <Thumbnail source={{uri: 'http://del.h-cdn.co/assets/cm/15/10/54f685750c488_-_the_ultimate_ketel_one_lemonade_hires-xl.jpg'}} />
              <Text>Vodka Lemonade</Text>
              <Text note>Any vodka mixed with lemondade</Text>
            </ListItem>
            <ListItem>
              <Thumbnail source={{uri: 'http://www.origlio.com/sites/default/files/beverage/Hamms_Special-Light.png'}} />
              <Text>Hamms Special Light </Text>
              <Text note>The highest quality of brews</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
