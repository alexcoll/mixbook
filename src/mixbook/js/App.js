
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Alert } from 'react-native';
import CodePush from 'react-native-code-push';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import store from 'react-native-simple-store';
import ProgressBar from './components/loaders/ProgressBar';

import theme from './themes/base-theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    };
  }


  setupAsyncStore() {
    // Setup account store
    store.get('account').then((data) => {
      if (true) {
        store.save('account', {
          isLoggedIn: false,
          isGuest: false,
          token: "",
          userInfo: {}
        }).catch(error => {
          console.warn("error getting account key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting account key from store");
    });

    // Setup settings store
    store.get('settings').then((data) => {
      if (data == null) {
        store.save('settings', {
          keepLoggedIn: true
        }).catch(error => {
          console.warn("error getting account key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting account key from store");
    });

    // Setup recipes store
    store.get('recipes').then((data) => {
      if (data == null) {
        store.save('recipes', [ ]).catch(error => {
          console.warn("error getting recipes key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting recipes key from store");
    });

    // Setup inventory store
    store.get('inventory').then((data) => {
      if (data == null) {
        store.save('inventory', ["Refresh to get inventory"])
        .catch(error => {
          console.warn("error getting inventory key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting inventory key from store");
    });

    // Setup brands store
    store.get('brands').then((data) => {
      if (data == null) {
        store.save('brands', ["Refresh to get brands"])
        .catch(error => {
          console.warn("error getting brands key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting brands key from store");
    });
  }


  componentDidMount() {
    CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ showDownloadingModal: true });
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this._modal.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
      }
    );

    this.setupAsyncStore();
  }


  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={(c) => { this._modal = c; }}
              swipeToClose={false}
            >
              <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
                {this.state.showInstalling ?
                  <Text style={{ color: theme.brandPrimary, textAlign: 'center', marginBottom: 15, fontSize: 15 }}>
                    Installing update...
                  </Text> :
                  <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
                    <Text style={{ color: theme.brandPrimary, textAlign: 'center', marginBottom: 15, fontSize: 15 }}>
                      Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar color="theme.brandPrimary" progress={parseInt(this.state.downloadProgress, 10)} />
                  </View>
                }
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

    return <AppNavigator />;
  }
}

export default App;
