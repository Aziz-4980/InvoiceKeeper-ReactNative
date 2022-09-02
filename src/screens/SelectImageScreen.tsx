/**
 * Created by Dima Portenko on 30.06.2021
 */
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';
import { DemoButton } from '../components/ui';
import { DemoResponse } from '../components/ui';
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerResponse } from 'react-native-image-picker/src/types';
import { SelectScreenNavigationProps } from '../navigation/Navigator';
import { recognizeImage, Response } from '../mlkit';

import * as routes from '../navigation/routes';
import { ScrollView } from 'react-native-gesture-handler';
import { FadeInFromBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';


type SelectImageScreenProps = {
  navigation: SelectScreenNavigationProps;
};

export const SelectImageScreen = ({ navigation }: SelectImageScreenProps) => {
  const { width } = useWindowDimensions();
  const [response, setResponse] = React.useState<ImagePickerResponse | null>(
    null,
  );



  const pushData = (data) => {
    // var pushQty = [], pushAmt = [], pushGovt = [], pushGrandTotal = [], pushProduct = [], pushRate = [], pushTotal = [];
    var invoiceTitle = '';
    var ntnNo = "0043796-4";
    var strNo = '';
    var fbrNo = '';
    var location = '';
    var branchCode = '';
    var invoiceDD = '';
    var invoiceMM = '';
    var invoiceYY = '';
    var quantity = [];
    var product = [];
    var rate = [];
    var amount = [];
    var total;
    var gst;
    var govtCharges;
    var grandTotal;
    // if (!Number.isInteger(data[0].text)) {
    //   invoiceTitle = data[0].text;
    // }
    // console.log(invoiceTitle);
    // for (var i = 0; i <= data.length; i++) {
    //   if (data[i]?.text.includes('NTN:')) {
    //     var ele = data[i].text.split(' ');
    //     ntnNo = ele[1];
    //     console.log(ntnNo);
    //   }
    //   if (data[i]?.text.includes('STRN:')) {
    //     var ele = data[i].text.split(' ');
    //     strNo = ele[1] + ele[2] + ele[3];
    //     console.log(strNo);
    //   }
    //   if (data[i]?.text.includes('FBR Invoice#')) {
    //     fbrNo = data[i + 1].text;
    //     console.log(fbrNo);
    //     location = data[i + 2].text;
    //     console.log(location);
    //     branchCode = data[i + 3].text;
    //     console.log(branchCode);
    //     var ele = data[i + 4].text.split('-');
    //     invoiceDD = ele[0];
    //     invoiceMM = ele[1];
    //     invoiceYY = ele[2];
    //     console.log(invoiceDD + '-' + invoiceMM + '-' + invoiceYY);
    //   }

    //   // if (data[i]?.text.includes('Qty')) {
    //   //   j = i;
    //   //   while(data[j]?.text != 'Total (Excl. GST):'){
    //   //     if(j % 3 == 0){
    //   //       var ele = data[j]?.text.split(' ');
    //   //       quantity.push(parseInt(ele[0]));
    //   //       product.push(ele[1] + ele[2]); 
    //   //     }  
    //   //     j++;
    //   //   }

    //   //   if (data[i]?.text.includes('Rate')) {
    //   //     j =i;
    //   //     while(data[j].text != 'Total (Excl. GST):'){
    //   //       if(j%4 ==0){
    //   //       rate.push(parseFloat(data[j]?.text));
    //   //       console.log(rate[j]);
    //   //                 }
    //   //                 j++;
    //   //     }

    //   //   }
    //   //   if (data[i]?.text.includes('Amt')) {
    //   //     j = i;
    //   //     while(data[j]?.text != 'Total (Excl. GST):'){
    //   //       if(j % 4 == 0){
    //   //         amount.push(parseInt(data[j]?.text));
    //   //         console.log(rate[j]);
    //   //       }
    //   //       j++;
    //   //     }

    //   //   }
    //   // }
    //   if(data[i]?.text == 'Total (Excl. GST):'){
    //   var ele = data[i+1].text.split(' ');
    //   total = ele[1];
    //   gst = data[i+3].text;
    //   govtCharges = data[i+5].text;
    //   var ele = data[i+7].text.split(' ');
    //   grandTotal= ele[1];
    //   console.log(total);
    //   console.log(gst);
    //   console.log(govtCharges);
    //   console.log(grandTotal);  
    //   }
    // }
    
    data.map((b, bi) => {

      console.log(`Block #${bi} ===> ${b.text}`);
      if (bi == 0) {
        var regExp = /[a-zA-z]/;
        if (regExp.test(b.text)) {
          invoiceTitle = b.text;
        }
        else {
          //if first block is not title
        }
      }
     
      if (bi == 2 && b.text.match(/\d\d\d\d\d\d\d\d\d\d\d\d\d/)) {
        var str = b.text.split(/[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]:/);
        strNo = str[1];
        // console.log(strNo);
      }
      if (b.text.match(/[a-zA-Z][a-zA-Z][a-zA-Z]\s[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]#/)) {
        var f = b.text.split(/[a-zA-Z][a-zA-Z][a-zA-Z]\s[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]#/);
        fbrNo = f[1];
      }
      if (b.text.match(/\d\d-[a-zA-Z][a-zA-Z][a-zA-Z]-\d\d/)) 
      {
        var ele = b.text.split("-");
        invoiceDD = ele[0];
        invoiceMM = ele[1];
        invoiceYY = ele[2];
      }

      if (bi > 9 && !b.text.match(/[a-zA-Z]+.*\([^)]*\)/)) {
        if (bi % 3 == 1 && b.text.match(/\d [a-zA-Z]+ [a-zA-Z][a-zA-Z]/)) {
          var qt = b.text.split(/\d/);
          var pr = b.text.split(/[a-zA-Z]+ [a-zA-Z][a-zA-Z]/);
          quantity.push(pr[0]);
          product.push(qt[1]);
        }
        else if (bi % 3 == 2) {
          if (!isNaN(parseFloat(b.text))) {
            rate.push(b.text);
          }

        }
        else if (bi % 3 == 0 && !b.text.match(/[a-zA-Z]+.*\([^)]*\)/)) {
          if (!isNaN(parseInt(b.text))) {
            amount.push(b.text);
          }

        }


      }  
      if (b.text.match(/@.*%/)) {
          if(data[bi-1].text.match(/[a-zA-Z][a-zA-Z]\./)){
            var t = data[bi-1].text.split(/[a-zA-Z][a-zA-Z]\./);
            total = t[1];
          }
          gst = data[bi+1].text;
          govtCharges = data[bi+3].text;
          if(data[bi+5].text.match(/[a-zA-Z][a-zA-Z]\./)){
            var gt = data[bi+5].text.split(/[a-zA-Z][a-zA-Z]\./);
            grandTotal = gt[1];
          }
      }


      // if(bi%2 == 0 && b.text.match(/\d [a-zA-Z]+ [a-zA-Z][a-zA-Z]/)){

      // }
      // while(bi > 10 &&  !b.text.includes("Total")){
      //   if(bi % 3 == 1){
      //     var ele1 = b.text.split(" ");
      //     if(Number.isInteger(ele1[0])){
      //       quantity.push(ele1[0]);
      //       console.log(ele1[0]);

      //     }

      //   }

      // }
      //  if(l.text == '')
      // while (l.text != 'Total' && bi>'2') {

      //   if (l.text == 'Qty' || l.text == 'Product' || l.text == 'Rate' || l.text == 'Amt') {

      //   } else {
      //     if (counter == 0) {
      //        pushQty.push(l.text);
      //      //  console.log(pushQty);
      //       counter++;
      //     } else if (counter == 1) {
      //        pushProduct.push(l.text);
      //       counter++;
      //     } else if (counter == 2) {
      //        pushRate.push(l.text);
      //       counter++;

      //     } else if (counter == 3) {
      //        pushAmt.push(l.text);
      //       counter++;
      //     } else {
      //       counter = 0;
      //     }

      //   }


      // }
      // var counter1 = 0;
      // if (l.text == 'Total' || l.text == 'Gst' || l.text == 'Govt' || l.text == 'GrandTotal') {

      // } else {
      //   if (counter == 0) {
      //      pushTotal.push(l.text);
      //     counter1++;
      //   } else if (counter == 1) {
      //      pushGovt.push(l.text);
      //     counter1++;
      //   } else if (counter == 2) {
      //      pushGrandTotal.push(l.text);
      //     counter1++;
      //   }

      // } counter1 = 0;
      // var ele = l.text.split(" ");
      // ele.map((e, ei) => {
      //   console.log(`elements #${ei} ===> ${e}`);
      // })
      // })
      // })


    });
    console.log("Invoice Title: " + `${invoiceTitle}`);
    console.log(`NTN: ${ntnNo}`);
    console.log(`STRN: ${strNo}`);
    console.log(`FBR invoice#: ${fbrNo}`);
    console.log(`Date: ${invoiceDD}`);
    console.log(`Month: ${invoiceMM}`);
    console.log(`Year: ${invoiceYY}`);
    console.log(`QTY: ${quantity}`);
    console.log(`Product: ${product}`);
    console.log(`Rate: ${rate}`);
    amount.pop();
    console.log(`Amount: ${amount}`);
    console.log(`Total: ${total}`);
    console.log(`GST: ${gst}`);
    console.log(`Govt.Charges: ${govtCharges}`);
    console.log(`Grand Total: ${grandTotal}`);
    //var array = [1, 2, 3],
    // var item;


    // for (item of amount.slice(0, -1)) {
    //     amount.push(item);
    // }
    // console.log(`Amount: ${amount}`);

    // firestore()
    //   .collection('invoices')
    //   .add({
    //     title:invoiceTitle,
    //     ntn:ntnNo,
    //     strn:strNo,
    //     fbr:fbrNo,
    //     date:invoiceDD,
    //     month:invoiceMM,
    //     year:invoiceYY,
    //     quantity:quantity,
    //     products:product,
    //     rate:rate,
    //     amount:amount,
    //     total:total,
    //     gst:gst,
    //     gc: govtCharges,
    //     gt:grandTotal,
    //   })
    //   .then(() => {
    //     console.log('successfully added');
    //   });

  }

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
  }, [])

  const [imageTextResponse, setImageTextResponse] = React.useState<Response | null>(null);

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
          console.log("Image Text Response ====>  ", response);
          setImageTextResponse(response);
          // setResposne(response);
          // setAspectRation(response.height / response.width);

          var blocks = response.blocks;
          pushData(blocks);
          // blocks.map((b, bi) => {
          //   b.lines.map((l, li) => {
          //     console.log(`Block #${bi} ===> Line #${li} ===> ${l.text}`);
          //     firestore()
          //       .collection('invoices')
          //       .add({
          //         Amt: `Block #${bi} ===> Line #${li} ===> ${l.text}`
          //       })
          //       .then(() => {
          //         console.log('');
          //       });

          //     var ele = l.text.split(" ");
          //     ele.map((e, ei) => {
          //       console.log(`elements #${ei} ===> ${e}`);
          //     })
          //   })
          // })
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
        <View style={{ flexDirection: 'row', paddingBottom: 8 }}>
          <DemoButton key="Process Image" onPress={onProcessImage}>
            {'Process Image'}
          </DemoButton>
        </View>
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
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
        <ScrollView style={{ height: '40%' }}>
          <View style={{ paddingHorizontal: 8, }}>
            <DemoResponse blockText={imageTextResponse?.blocks}>
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
          response?.assets.map(({ uri }) => (
            <View key={uri} style={styles.image}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                // style={{width, height: width}}
                style={{ height: '60%', width: width }}
                source={{ uri: uri }}
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
