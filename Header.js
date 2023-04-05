
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Header = ({ title, subtitle }) => {
    return (
      <View style={{backgroundColor: "#BD0000", paddingTop: 16}}>
        <Image source={require('./header.png')}         style={styles.image}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      width: screenWidth,
      height: 290,
      resizeMode: 'stretch',
    },
  });

  export default Header;