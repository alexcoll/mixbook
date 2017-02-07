
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View } from 'native-base';

import styles from './styles';

export default class TabAlcohol extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
                Put your alcohols here.
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
