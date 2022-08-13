/**
 * Created by Dima Portenko on 05.07.2021
 */
import React, {useEffect, useState} from 'react';
import {Image, useWindowDimensions, ScrollView} from 'react-native';
import {
  ProcessImageNavigationProps,
  ProcessImageRouteProps,
} from '../navigation/Navigator';
import {recognizeImage, Response} from '../mlkit';
import {ResponseRenderer} from '../components/ResponseRenderer';

interface ProcessImageScreenProps {
  navigation: ProcessImageNavigationProps;
  route: ProcessImageRouteProps;
}

export const ProcessImageScreen = ({route}: ProcessImageScreenProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const [aspectRatio, setAspectRation] = useState(1);
  const [response, setResposne] = useState<Response | undefined>(undefined);
  const uri = route.params.uri;

  useEffect(() => {
    if (uri) {
      proccessImage(uri);
    }
  }, [uri]);

  const proccessImage = async (url: string) => {
    if (url) {
      try {
        const response = await recognizeImage(url);
        console.log(response);
        if (response?.blocks?.length > 0) {
          setResposne(response);
          setAspectRation(response.height / response.width);

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


// for (block in result.textBlocks) {
//     val blockText = block.text
//     val blockConfidence = block.confidence
//     val blockCornerPoints = block.cornerPoints
//     val blockFrame = block.boundingBox
//     for (line in block.lines) {
//         val lineText = line.text
//         val lineConfidence = line.confidence
//         val lineCornerPoints = line.cornerPoints
//         val lineFrame = line.boundingBox
//         for (element in line.elements) {
//             val elementText = element.text
//             val elementConfidence = element.confidence
//             val elementCornerPoints = element.cornerPoints
//             val elementFrame = element.boundingBox
//         }
//     }
// }

          // response.blocks[2]['lines'].map((val,idx)=>{
          //   console.log(`Line #${idx} ==>  ${val.text}`);
          // })
          // console.log(`${response.blocks[3]['text']}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Image
        source={{uri}}
        style={{width: windowWidth, height: windowWidth * aspectRatio}}
        resizeMode="cover"
      />
      {!!response && (
        <ResponseRenderer
          response={response}
          scale={windowWidth / response.width}
        />
      )}
    </ScrollView>
  );
};
