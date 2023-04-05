
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

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
      width: 300,
      height: 200,
    },
  });

  export default Header;