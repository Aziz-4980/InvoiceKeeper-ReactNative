import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Pick Image")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {

    if (email && password) {
      if(validateFormFields()){
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
        })
        .catch(error =>  Alert.alert(
          "Warning",
          `something went wrong: ${error.message}`,
          [
            {
              text: "Okayy!",
              style: "Okayy!",
            },
          ],
          {
            cancelable: true,
            
          }
          ))
      }else{
        console.log("try again");
        Alert.alert(
          "Warning",
          "Please enter valid email and password of length >= 8",
          [
            {
              text: "Okayy!",
          
              style: "Okayy!",
            },
          ],
          {
            cancelable: true,
            
          }
          )
      }
    }else{
      Alert.alert(
        "Warning",
        "Fields cannot be empty",
        [
          {
            text: "Okayy!",
        
            style: "Okayy!",
          },
        ],
        {
          cancelable: true,
          
        }
        )
    }
    
    
  }

  const validateFormFields = () => {                          // <= Added this function
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!strongRegex.test(email)) {
      Alert.alert(
        "Warning",
        ` Email not found. try again`,
        [
          {
            text: "Okayy!",
        
            style: "Okayy!",
          },
        ],
        {
          cancelable: true,
          
        }
        )
        return false;
    } else if (password.length < 8) {
      Alert.alert(
        "Warning",
        ` Password is incorrect. try again`,
        [
          {
            text: "Okayy!",
        
            style: "Okayy!",
          },
        ],
        {
          cancelable: true,
          
        }
        )
        return false;
    }

    return true;
}
  const handleLogin = () => {
   
    if(email && password ){

        try {
    if(validateFormFields()){

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
          navigation.navigate("Pick Image");
        }).catch((err) => {
          console.log(err);
            Alert.alert(
              "Warning",
              ` Email or password is incorrect`, 
              [
                {
                  text: "Okayy!",
              
                  style: "Okayy!",
                },
              ],
              {
                cancelable: true,
                
              }
              )
        })
    }else{
      console.log("try again");
      Alert.alert(
        "Warning",
        ` Email or password is incorrect`,
        [
          {
            text: "Okayy!",
        
            style: "Okayy!",
          },
        ],
        {
          cancelable: true,
          
        }
        )
    }
      
      
    } catch (error) {
     
    }
    }else{
      console.log("empty fields");
      Alert.alert(
        "Warning",
        ` Fields cannot be empty`,
        [
          {
            text: "Okayy!",
        
            style: "Okayy!",
          },
        ],
        {
          cancelable: true,
          
        }
        )
    }

  
   
      
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    color: "black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  
})
