import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Card , Title ,Paragraph } from 'react-native-paper';
import {DemoButton} from '../components/ui';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState([]);
  const [filterdResponse, setFilteredResponse] = useState([]);
  // const handleSignOut = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate("Authentication")
  //     })
  //     .catch(error => alert(error.message))
  // }

  // useEffect(() => {
  //   firestore()
  //     .collection('invoices')
  //     .get()
  //     .then(querySnapshot => {
  //       console.log('Total users: ', querySnapshot.size);

  //       querySnapshot.forEach(documentSnapshot => {
  //         // console.log('Invoice', documentSnapshot.data().products);
  //       });
  //     });
  // }, [])
  const handleFilteredResponse = response => {
    if (search) {
      const filter = response.filter(item => item.data().title == search);
      setFilteredResponse(filter);
      console.log('////////////////////////////////');
      console.log(filterdResponse);
      // console.log(filter);
    }
  };
  const handleSearch = () => {
    let data = [];
    firestore()
      .collection('invoices')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot);
        });
      });
    setResponse(data);

    console.log('*****************************');
    // console.log(response);
    handleFilteredResponse(response);
  };

  return (
    <View style={styles.container}>
      {/* <Text>Email: {auth().currentUser?.email}</Text> */}
      {/* <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity> */}

      <View style={{flexDirection: 'column', paddingVertical: 8}}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => setSearch(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      </View>
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <ScrollView style={{flexDirection: 'column', marginBottom: 20}}>
        { filterdResponse.map (val => 
         <Card style={styles.container}>
         <Card.Content>
           <Title>{val.data().title}</Title>
         </Card.Content>
         
         <Card.Content>
           <Paragraph>NTN                   :       {val.data().ntn}</Paragraph>
           <Paragraph>STRN                  :       {val.data().strn}</Paragraph>
           <Paragraph>FBR invoice no        :       {val.data().fbr}</Paragraph>
           <Paragraph>Date                  :       {val.data().date},{val.data().month},{val.data().year}</Paragraph>
           <Paragraph>Total                 :       {val.data().total}</Paragraph>
           <Paragraph>GST                   :       {val.data().gst}</Paragraph>
           <Paragraph>Government POS Charges    :       {val.data().gc}</Paragraph>
           <Paragraph>Grand Total           :       {val.data().gt}</Paragraph>
      
         </Card.Content>
         <Card.Actions></Card.Actions>
       </Card>
        ) }
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    // width: '20%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  textInputStyle: {
    height: 40,
    color: 'black',
    borderWidth: 1,
    paddingLeft: 20,
marginTop: 20,
marginBottom: -30,
    width: 300,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
