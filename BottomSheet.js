import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  PanResponder
} from "react-native";
import QRCodeScreen from "./QRCodeScreen";

export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };
    this.state.animation.addListener(({ value }) => {
      this._y = value;
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([null, { dy: this.state.pan.y }])(evt, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log(gestureState);
        // this.handleClose();
      }
    });
  }

  handleOpen = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  renderHeader = () => {
    return (
      // <TouchableOpacity style={styles.header} onPress={this.handleClose}>
      <Animated.View style={styles.header}>
        <Animated.View
          style={styles.panelHeader}
          {...this._panResponder.panHandlers}
        >
          <View style={styles.panelHandle} />
        </Animated.View>
      </Animated.View>

      // </TouchableOpacity>
    );
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
    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp"
          })
        }
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
    };

    const slideUp = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: "clamp"
          })
        }
      ]
    };
    return (
      <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
        <View style={[styles.sheet]}>
          <Animated.View
            style={[
              styles.popup,
              slideUp,
              {
                minHeight: this.props.minHeight,
                maxHeight: this.props.maxHeight
              }
            ]}
          >
            {this.props.renderHeader
              ? this.props.renderHeader()
              : this.renderHeader()}
            {this.props.renderContent()}
          </Animated.View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)"
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: "50%",
    maxHeight: "90%"
  },
  header: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFF",
    height: 45,
    justifyContent: "center"
  },
  panelHeader: {
    alignItems: "center"
  },
  panelHandle: {
    width: 80,
    height: 6,
    borderRadius: 4,
    backgroundColor: "grey"
  }
});
