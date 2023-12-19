import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'

const Card = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Central Fire Brigade</Text>
        
      </View>
      <View style={styles.body}>
      <Text style={styles.location}>Lohiya Nagar, Ghorpade Peth, Ganj Peth, Pune</Text>
      {/* <Image
          source={require("Phone_in_talk.png")}
          style={{width:20, height:20}}
        /> */}
        <Text style={styles.phoneNumber}>020 2445 8950</Text>
        <Text style={styles.lastActive}>Last Active: 13th Sept 2023</Text>
      </View>
      <View style={styles.alert}>
        <Text style={styles.alertText}>ALERT</Text>
        <TouchableOpacity title="Check More" onPress={() => {}} />
      </View>

    
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003366',
    width:'92%',
    marginLeft:'4%',
    borderRadius: 30,

  },

  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white',
    marginEnd:120,

  },
  body: {
    padding: 20,
  },
  location: {
    fontSize: 16,
    color:'white',
    marginTop:-30,
    marginLeft:10,
    marginEnd:70,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastActive: {
    fontSize: 14,
    color: '#gray',
  },
  alert: {
    backgroundColor: '#red',
    padding: 10,
    alignItems: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default Card