import React from "react";
import { StyleSheet, View, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class QRCodeScreen extends React.Component {
  onSuccess = e => {
    // eslint-disable-next-line no-console
    console.log(e);
  };
  render() {
    const { ...rest } = this.props;

    return (
      <View style={styles.contentContainer}>
        <QRCodeScanner
          onRead={e => this.onSuccess(e)}
          topContent={<Text>Hello</Text>}
          cameraStyle={{ overflow: "hidden", height: 300 }}
          topViewStyle={styles.topViewStyle}
          ref={node => {
            this.scanner = node;
          }}
          {...rest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: "#fff" },
  topContentTextStyle: { color: "#000", fontSize: 17 }
});
