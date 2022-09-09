import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import PureChart from 'react-native-pure-chart';
import firestore from '@react-native-firebase/firestore';
import { DemoButton } from '../components/ui';


const ReportsScreen = () => {
  const navigation = useNavigation();
  
useEffect(() => {
  firestore()
  .collection('invoices')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('Invoice', documentSnapshot.data().products);
    });
  });
}), [];

  let sampleData = [
    {
      seriesName: 'series1',
      data: [
        { x: '2018-02-01', y: 30 },
        { x: '2018-02-02', y: 200 },
        { x: '2018-02-03', y: 170 },
        { x: '2018-02-04', y: 250 },
        { x: '2018-02-05', y: 10 }
      ],
      color: 'red'
    },
    {
      seriesName: 'series2',
      data: [
        { x: '2018-02-01', y: 20 },
        { x: '2018-02-02', y: 100 },
        { x: '2018-02-03', y: 140 },
        { x: '2018-02-04', y: 550 },
        { x: '2018-02-05', y: 40 }
      ],
      color: 'yellow'
    },
    {
      seriesName: 'series3',
      data: [
        { x: '2018-02-01', y: 30 },
        { x: '2018-02-02', y: 130 },
        { x: '2018-02-03', y: 160 },
        { x: '2018-02-04', y: 50 },
        { x: '2018-02-05', y: 400 }
      ],
      color: 'blue'
    }
  ]
  var arr = [];
  const pressMe  = () => {
    firestore()
    .collection('invoices')
    .get()
    .then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        console.log('Invoice', documentSnapshot.data().products);
      });
    });  }
  return (
   <ScrollView> 
    <View style={styles.container}>
      <DemoButton key="Press Me" onPress={pressMe}>
        {'Press Me' }
        </DemoButton>
      <PureChart data={sampleData} type='bar' />

    </View>
    </ScrollView>
  )
}

export default ReportsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
