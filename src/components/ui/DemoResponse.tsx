import * as React from 'react';
import {Text, View, StyleSheet, ViewStyle, TextStyle} from 'react-native';

type resStrBlock = {
  blockText: string[]
}

export const DemoResponse:React.FC<resStrBlock> = ({blockText }) => {
  // if (children == null) {
  //   return null;
  // }else{
  //   console.log("Children : ",children);
  // }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}> */}
        {/* {blockText} */}

        {blockText?.map((child:any) => <Text>{child.text}</Text>)}
        {/* {JSON.stringify(children, null, 2)} */}
        {/* </Text> */}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: '#dcecfb',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  text: {
    color: 'black',
  },
});

// export default DemoResponse;