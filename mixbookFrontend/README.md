# Mixbook Front End
## Get Started

####1. System Requirements

* Globally installed [node](https://nodejs.org/en/) >= 4.0

* Globally installed [npm](https://www.npmjs.org/) >= 3.0

* Globally installed [rnpm](https://github.com/rnpm/rnpm) *(only if React Native version < 0.29)*

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)

* Install [CodePush](https://microsoft.github.io/code-push/) globally and get keys for your app.



####2. Installation

On the command prompt run the following commands
* Clone the repo
* Cd to the frontend directory

```sh
$ npm install
```

If React Native < 0.29

```sh
$ rnpm link
```

If React Native >= 0.29

```sh
$ react-native link
```

####3. Simulate for iOS

* Make sure you have Xcode installed with dev tools.
* Run the following command in your terminal.

```sh
$ react-native run-ios
```

###4. Simulate for Android

* Make sure you have an **Android emulator** installed and running or a connected Android device.

* Run the following command in your terminal.

```sh
$ react-native run-android
```
