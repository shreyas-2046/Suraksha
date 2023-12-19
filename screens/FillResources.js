import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const AddResourceForm = () => {


  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ name: '', quantity: '' });

  const addResourceField = () => {
    setResources(prevResources => [...prevResources, newResource]);
    setNewResource({ name: '', quantity: '' });
  };

  const submitForm = () => {
    // post call should be here 
    console.log('Submitted Resources:', resources);
  };


  return (
    <View style={styles.container}>
      {resources.map((resource, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Resource Name"
            value={resource.name}
            onChangeText={text => {
              const updatedResources = [...resources];
              updatedResources[index].name = text;
              setResources(updatedResources);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Resource Quantity"
            value={resource.quantity}
            onChangeText={text => {
              const updatedResources = [...resources];
              updatedResources[index].quantity = text;
              setResources(updatedResources);
            }}
            keyboardType="numeric"
          />
        </View>
      ))}
      <Button title="Add Resource" onPress={addResourceField} />
      <Button title="Submit Form" onPress={submitForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 8,
  },
});

export default AddResourceForm;