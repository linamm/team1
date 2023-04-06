import React from "react";
import { View, Text, Button, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CardView from "./CardView";

const screenWidth = Dimensions.get("window").width;

const CardThree = ({ data }) => {

    const onNewPage = () => {

    }
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
                <Text style={{
                    fontSize: 12,
                    fontWeight: "bold"
                }}> What is carbon intensity </Text>
            </View>
            <Text
                style={{
                    fontSize: 12,
                    textAlign: "left",
                    paddingBottom: 5,
                    paddingLeft: 10
                }}
            >
                {" How can we minimise our carbon footprint powered by data from the Grid "}

            </Text>
            <Button onPress={onNewPage} title="Learn more" />

        </CardView>
    );
};

export default CardThree;
