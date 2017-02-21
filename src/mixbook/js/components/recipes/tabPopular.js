import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text } from 'native-base';

import styles from './styles';

export default class TabPopular extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
               This will pull from the database and populate with the popular drinks
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
