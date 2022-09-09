import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import PureChart from 'react-native-pure-chart';
import firestore from '@react-native-firebase/firestore';
import { DemoButton } from '../components/ui';


const ReportsScreen = () => {
  const navigation = useNavigation();

  var products = [];
  var quantity = [];
  useEffect(() => {
    firestore()
      .collection('invoices')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log('Invoice', documentSnapshot.data().products);
          products.push(documentSnapshot.data().products);
          quantity.push(documentSnapshot.data().quantity);

        });
      });


  }), [];

  // let sampleData = [
  //   {
  //     seriesName: 'series1',
  //     data: [
  //       { x: '2018-02-01', y: 30 },
  //       { x: '2018-02-02', y: 200 },
  //       { x: '2018-02-03', y: 170 },
  //       { x: '2018-02-04', y: 250 },
  //       { x: '2018-02-05', y: 10 }
  //     ],
  //     color: 'red'
  //   },
  //   {
  //     seriesName: 'series2',
  //     data: [
  //       { x: '2018-02-01', y: 20 },
  //       { x: '2018-02-02', y: 100 },
  //       { x: '2018-02-03', y: 140 },
  //       { x: '2018-02-04', y: 550 },
  //       { x: '2018-02-05', y: 40 }
  //     ],
  //     color: 'yellow'
  //   },
  //   {
  //     seriesName: 'series3',
  //     data: [
  //       { x: '2018-02-01', y: 30 },
  //       { x: '2018-02-02', y: 130 },
  //       { x: '2018-02-03', y: 160 },
  //       { x: '2018-02-04', y: 50 },
  //       { x: '2018-02-05', y: 400 }
  //     ],
  //     color: 'blue'
  //   }
  // ]

  let sampleData1 = [30, 200, 170, 250, 10];
  var arr = [];

  // const [barchartData, setbarchartData] = useState([]);

  const key = 'data';
  var [sampleData, setsampleData] = useState([
    {
      seriesName: 'series1',
      data: [
        // { x: '2018-02-01', y: 30 },
        // { x: '2018-02-02', y: 200 },
        // { x: '2018-02-03', y: 170 },
        // { x: '2018-02-04', y: 250 },
        // { x: '2018-02-05', y: 10 }
      ],
      color: 'red'
    }
  ]);






  const pressMe = () => {
    console.log("Press me button pressed!");
    // console.log(sampleData[0][key]);
    // sampleData[0][key].push({ x: "69", y: 44 });
    // console.log(sampleData[0][key]);
    // setsampleData(sampleData);
    // display sampleData.
    // insert (x, y) into data.
    firestore()
      .collection('invoices')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log('Invoice', documentSnapshot.data().products);
          products.push(documentSnapshot.data().products);
          quantity.push(documentSnapshot.data().quantity);
        });
        // console.log(querySnapshot);
      });

    // console.log(products[1][1]);

    // for(var i = 0; i<products.length; i++){
    //   var k = 0;

    //   for(var j = 1; j<products.length ; j++){
    //       if(products[i][i] === products[j][k])
    //   }
    // }
    // products.forEach(snapshots => {
    //   console.log('products: ', snapshots);
    // });
    // quantity.forEach(snapshots => {
    //   console.log('quantity: ', snapshots);
    // });
    console.log("before");
    console.log(sampleData[0][key]);
    // console.log(products[0][1]);
    for (var i = 0; i < products.length; i++) {
      for (var j = 0; j < products[i].length; j++) {
      // productQuantity["data"].push({ prod: products[i][j], quant: quantity[i][j] });
      sampleData[0][key].push({ x: products[i][j], y: parseInt(quantity[i][j]) });
      // console.log(products[i][j]);
      // console.log(quantity[i][j]);
      }
    }
    setsampleData(sampleData);
    console.log("after");
    console.log(sampleData[0][key]);

    // setproductQuantity(productQuantity);
    // console.log(productQuantity);

    
    console.log(result);

  }

//   const fruits = sampleData;
// var result = Object.values(fruits.reduce((c, {x,y}) => {
//   c[x] = c[x] || {x,y: 0};
//   c[x].y += y;
//   return c;
// }, {}));

const fruits = sampleData,
    result = fruits.reduce((r, { x, y }) => {
        var item = r.find(o => o.x == x);
        if (!item) {
            item = { x, y: 0 };
            r.push(item);
        }
        item.y += y;
        return r;
    }, []);


  // var [productQuantity, setproductQuantity] = useState([
  //   {
  //     PQ: [],
  //   }
  // ]);

  // const productQuantity 
  return (
    <ScrollView>
      <View style={styles.container}>
        <DemoButton key="Press Me" onPress={pressMe}>
          {'Press Me'}
        </DemoButton>

        {/* <PureChart data={sampleData1} type='line' /> */}


      </View>
      <PureChart data={sampleData} type='bar' />
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
