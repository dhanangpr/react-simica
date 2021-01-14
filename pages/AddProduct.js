import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Input, Button} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

const AddProduct = ({navigation}) => {
  const [productName, setProductName] = useState();
  const [quantity, setJumlah] = useState();
  const [unit, setUnit] = useState();

  const onChangeproductName = (productName) => {
    setProductName(productName);
  };

  const onChangeJumlah = (quantity) => {
    setJumlah(quantity);
  };

  const onChangeUnit = (unit) => {
    setUnit(unit);
  };

  const handleAddProduct = () => {
    firestore()
      .collection('products')
      .add({
        productName: productName,
        quantity: quantity,
        unit: unit,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        alert('Product successfully added');
        navigation.navigate('ViewProducts');
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Tambah Barang Baru</Text>
      <Input
        placeholder="Nama Barang"
        onChangeText={(productName) => onChangeproductName(productName)}
      />
      <Input
        placeholder="Jumlah"
        onChangeText={(quantity) => onChangeJumlah(quantity)}
      />
      <Input placeholder="Unit" onChangeText={(unit) => onChangeUnit(unit)} />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text>Tambah Barang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fd5c63',
    width: '50%',
    padding: 10,
  },
});

export default AddProduct;
