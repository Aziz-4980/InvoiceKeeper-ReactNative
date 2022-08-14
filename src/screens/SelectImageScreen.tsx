/**
 * Created by Dima Portenko on 30.06.2021
 */
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';
import {DemoButton} from '../components/ui';
import {DemoResponse} from '../components/ui';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker/src/types';
import {SelectScreenNavigationProps} from '../navigation/Navigator';
import {recognizeImage, Response} from '../mlkit';

import * as routes from '../navigation/routes';
import { ScrollView } from 'react-native-gesture-handler';


type SelectImageScreenProps = {
  navigation: SelectScreenNavigationProps;
};

export const SelectImageScreen = ({navigation}: SelectImageScreenProps) => {
  const {width} = useWindowDimensions();
  const [response, setResponse] = React.useState<ImagePickerResponse | null>(
    null,
  );

  const [imageTextResponse,setImageTextResponse] = React.useState<Response | null>(null);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);


  const proccessImage = async (url: string) => {
    if (url) {
      try {
        const response = await recognizeImage(url);
        console.log(response);
        if (response?.blocks?.length > 0) {
          console.log("Image Text Response ====>  ",response);
          setImageTextResponse(response);
          // setResposne(response);
          // setAspectRation(response.height / response.width);

          var blocks = response.blocks;
          blocks.map((b,bi)=>{
            b.lines.map((l,li)=> {
              console.log(`Block #${bi} ===> Line #${li} ===> ${l.text}`);

              var ele = l.text.split(" ");
              ele.map((e,ei)=> {
                console.log(`elements #${ei} ===> ${e}`);
              })
            })
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  const onProcessImage = () => {
    if (response) {
      proccessImage(response?.assets?.[0]?.uri!!);
      // console.log("Image Text Response ====>  ",response);
      // setImageTextResponse(response);
      // navigation.navigate(routes.PROCESS_IMAGE_SCREEN, {
      //   uri: response?.assets?.[0]?.uri!!,
      // });
    }
  };

  return (
    <View style={{}}>
      <SafeAreaView style={{}}>
        <View style={{flexDirection: 'row', paddingBottom: 8}}>
          <DemoButton key="Process Image" onPress={onProcessImage}>
            {'Process Image'}
          </DemoButton>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 8}}>
          <DemoButton
            key="Take Image"
            onPress={() =>
              onButtonPress('capture', {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false,
              })
            }>
            {'Take Image'}
          </DemoButton>
          <DemoButton
            key="Select Image"
            onPress={() =>
              onButtonPress('library', {
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
              })
            }>
            {'Select Image'}
          </DemoButton>
        </View>
       <ScrollView style={{height:'40%'}}>
       <View style={{paddingHorizontal: 8,}}>
          <DemoResponse blockText = {imageTextResponse?.blocks}>
            {/* {
            imageTextResponse?.blocks
            .map((b,bi)=>{
              b.lines.map((l,li)=> {
                console.log(" L === ",b);
                return b.text;
              })
            })
          } */}
          </DemoResponse>
        </View>
       </ScrollView>

        {response?.assets &&
          response?.assets.map(({uri}) => (
            <View key={uri} style={styles.image}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                // style={{width, height: width}}
                style={{height:'60%',width:width}}
                source={{uri: uri}}
              />
            </View>
          ))}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // marginVertical: 24,

    alignItems: 'center',
  },

});
