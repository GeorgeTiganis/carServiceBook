
import { StyleSheet, Text, View } from 'react-native';
import React from 'react'; 



export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>My car Book</Text>
        </View>
    )
}



const styles = StyleSheet.create({
     header:{
       height:180,
       paddingTop:38,
       backgroundColor:'coral'
     },
     title:{
       textAlign:'center',
       color:'#fff',
       fontSize: 20,
       fontWeight: 'bold'
        
    }


});
