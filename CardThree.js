import React from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardView from "./CardView";
// import Modal from "react-native-modal";

const screenWidth = Dimensions.get("window").width;

const CardThree = ({ data }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const onNewPage = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <CardView style={{ marginRight: screenWidth * 0.025 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          alignSelf: "flex-start",
          paddingBottom: 10,
        }}
      >
        <Ionicons name="md-leaf-outline" size={24} color="green" />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {" "}
          What is carbon intensity{" "}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          textAlign: "left",
          paddingBottom: 5,
          paddingLeft: 10,
        }}
      >
        {
          " How can we minimise our carbon footprint powered by data from the Grid "
        }
      </Text>
      <Button onPress={onNewPage} title="Learn more" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Use heating controls. The first step in cutting carbon emissions
              it to take control of our heating. ... Upgrade your heating
              system. ... Insulate your home. ... Draught-proofing. ... Low
              energy lighting. ... Energy efficient appliances. ... Low carbon
              travel. ... Reduce, reuse, recycle.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onNewPage}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </CardView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CardThree;
