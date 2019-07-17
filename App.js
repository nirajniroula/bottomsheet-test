import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  PanResponder
} from "react-native";
import { array } from "./content";
import QRCodeScreen from "./QRCodeScreen";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
    this.bsRef = React.createRef();
  }

  handleOpen = () => {
    this.bsRef.current.handleOpen();
  };

  renderContent = () => {
    return (
      <ScrollView style={{ paddingBottom: 16, paddingHorizontal: 16 }}>
        <QRCodeScreen />
        <TouchableOpacity onPress={() => alert("hello")}>
          <Text>Balance</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleOpen}>
          <Text>Open</Text>
        </TouchableOpacity>

        <BottomSheet renderContent={this.renderContent} ref={this.bsRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
