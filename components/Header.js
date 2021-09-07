import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


const Header = ({navigation}) => {
    return (
        <View style={{marginTop:50}}>
            <View  style={{flexDirection:'row', justifyContent:'space-between',width:'90%',marginLeft:'auto',marginRight:'auto', height:50,alignItems:'center'}} >
            <Text style={{fontSize:24,fontWeight:'bold',color:'orangered'}}>Aadhikhola <Text style={{color:'blue'}}>Stores</Text></Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Upload')}>
            <Ionicons name="md-cloud-upload-outline" size={34} color="#0366fc" />
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header
