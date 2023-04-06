import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;

const CardView = ({ children, style }) => {
  return (
    <View style={{...styles.card, ...style}}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      flex: 1,
      width: screenWidth * 0.9,
      borderRadius: 10,
      backgroundColor: "#ffffffbb",
      padding: 10,
      marginLeft: screenWidth * 0.05,
      marginRight: screenWidth * 0.05,
      marginTop: screenWidth * 0.05,
      alignItems: "center",
      elevation: 100,
    }
  });

  
export default CardView;