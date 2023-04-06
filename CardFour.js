import React from "react";
import { View, Text, StyleSheet, Dimensions, Share, Button } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import CardView from "./CardView";

const screenWidth = Dimensions.get("window").width;

const CardFour = ({ data }) => {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "Simply Share Anything across all social media platforms, isn't it awesome",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <CardView style={{ marginLeft: screenWidth * 0.025 }}>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                    paddingBottom: 5,
                }}
            >
                <FontAwesome name="trophy" size={24} color="gold" />
                <Text style={{
                    fontSize: 14,
                    fontWeight: "bold"
                }}> Eco Warrior </Text>
            </View>
            <Text
                style={{
                    fontSize: 12,
                    textAlign: "left",
                    paddingBottom: 10,
                    paddingLeft: 10
                }}
            >
                {" Congratulations! Share your achievement and get your reward"}

            </Text>
            <Button onPress={onShare} title="Share" />

        </CardView>
    );
};

export default CardFour;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: screenWidth * 0.45,

        borderRadius: 10,
        backgroundColor: "#ffffffaa",
        padding: 10,
        margin: screenWidth * 0.05,
        alignItems: "center",
    }
});