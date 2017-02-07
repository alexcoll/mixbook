
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text } from 'native-base';

import styles from './styles';

export default class TabMixer extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Text>
                Put your mixers here.
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
