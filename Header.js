
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Header = ({ title, subtitle }) => {
    return (
      <View>
        <Image source={require('./header.png')}         style={styles.image}
        resizeMode="cover"/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      width: screenWidth,
      height: 290,
      resizeMode: 'cover'
    },
  });

  export default Header;