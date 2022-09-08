import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import PureChart from 'react-native-pure-chart';


const ReportsScreen = () => {
  const navigation = useNavigation()

  let sampleData = [
    {
      seriesName: 'series1',
      data: [
        {x: '2018-02-01', y: 30},
        {x: '2018-02-02', y: 200},
        {x: '2018-02-03', y: 170},
        {x: '2018-02-04', y: 250},
        {x: '2018-02-05', y: 10}
      ],
      color: 'red'
    },
    {
      seriesName: 'series2',
      data: [
        {x: '2018-02-01', y: 20},
        {x: '2018-02-02', y: 100},
        {x: '2018-02-03', y: 140},
        {x: '2018-02-04', y: 550},
        {x: '2018-02-05', y: 40}
      ],
      color: 'yellow'
    },
    {
      seriesName: 'series3',
      data: [
        {x: '2018-02-01', y: 30},
        {x: '2018-02-02', y: 130},
        {x: '2018-02-03', y: 160},
        {x: '2018-02-04', y: 50},
        {x: '2018-02-05', y: 400}
      ],
      color: 'blue'
    }
  ]
  return (
    <View style={styles.container}>
            <PureChart data={sampleData} type='bar' />

    </View>
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
