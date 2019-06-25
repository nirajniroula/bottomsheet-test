/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import RNCamera from "react-native-qrcode-scanner";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef();
    this.state = { clicked: false };
  }
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error("An error occured", err)
    );
  };
  show = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(0);
  };

  hide = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(1);
  };

  renderInner = () => {
    return (
      <View style={styles.bsContent}>
        <RNCamera />
      </View>
    );
  };
  renderHeader = () => {
    return (
      <TouchableWithoutFeedback onPress={this.hide}>
        <View style={styles.bsHeader} />
      </TouchableWithoutFeedback>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.show}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Open BS</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={this.sheetRef}
          snapPoints={["90%", 0]}
          initialSnap={1}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    margin: 10,
    fontSize: 20,
    elevation: 4
  },
  button: {
    backgroundColor: "black",
    color: "white",
    margin: 5
  },
  bsContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    margin: 8
  },
  bsHeader: {
    height: 20,
    width: "100%",
    backgroundColor: "skyblue",
    margin: 8
  }
});
