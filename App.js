import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import CardOne from './CardOne';
import Header from './Header';
import CardTwo from './CardTwo';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header></Header>
      <CardOne></CardOne>
      <CardTwo></CardTwo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
