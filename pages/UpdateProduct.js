import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Input, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const AddProduct = ({navigation, route}) => {
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

  const handleUpdateProduct = () => {
    let db = firestore().collection('products');

    db.doc(route.params.product.id)
      .update({
        productName: productName,
        quantity: quantity,
        unit: unit,
      })
      .then(function (docRef) {
        alert('Product successfully updated');
        navigation.navigate('ViewProducts');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Ubah Barang</Text>
      <Input
        placeholder={route.params.product.productName}
        onChangeText={(productName) => onChangeproductName(productName)}
      />
      <Input
        placeholder={route.params.product.quantity}
        onChangeText={(quantity) => onChangeJumlah(quantity)}
      />
      <Input
        placeholder={route.params.product.unit}
        onChangeText={(unit) => onChangeUnit(unit)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
        <Text>Ubah Barang</Text>
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
