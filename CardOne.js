
import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CardOne = () => {
    return (
      <View style={styles.card} >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Card One </Text>
        <Text style={{ fontSize: 14 }}> Card One Description </Text>
      </View>
    );
  };
  
  export default CardOne;

  const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.9,
        height: 300,
        borderRadius: 10, 
        backgroundColor: "red",
        padding: 10,
        margin: 10
    },
  });
