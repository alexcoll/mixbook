
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View } from 'native-base';

import styles from './styles';

export default class TabFeatured extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
               This will pull from the database and populate with the featured drinks
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
