import React, { useEffect, useState } from 'react';
import { View, Text,TextInput, Button, Image,FlatList, SafeAreaView,Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({navigation}) => {
    const [name, setname] = useState('');
    const [productList, setproductList] = useState([])
    useEffect(()=>{
        async function getData(){
            let result=await fetch('https://dilipbackend.xyz/api/product-details')
            result=await result.json();
                try {
                  const jsonValue = JSON.stringify(result)
                  await AsyncStorage.setItem('storage_Key', jsonValue)
                } catch (e) {
                }
        }
        getData()
        const getDatas = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('storage_Key')
                if(jsonValue != null){
                    setproductList(JSON.parse(jsonValue))
                }
              } catch(e) {
              }
        }
        getDatas()
    },[])
    
    const getDatas = async () => {
        Keyboard.dismiss()
        try {
            const jsonValue = await AsyncStorage.getItem('storage_Key')
            if(jsonValue != null){
                if(name){
                 setproductList(JSON.parse(jsonValue).filter(item=>(item.name).toLowerCase()==name.toLowerCase()))
                }else{
                   setproductList(JSON.parse(jsonValue))
                }
            }
          } catch(e) {
          }
    }
 
    const renderItem = ({ item }) => (
        <View style={{marginTop:50}}>
        <Image style={{height:200,width:'70%', maxWidth:300,borderRadius:10}} source={{
            uri: `https://dilipbackend.xyz/${item.image}`,
        }}/>
        <View style={{flexDirection:'row', width:'70%',maxWidth:300,justifyContent:'space-between',marginTop:10}}>
            <View>
        <Text style={{fontSize:20}} >{item.name}</Text>
        <Text style={{fontSize:20, marginTop:10}} >Price: RS {item.price}</Text>
        </View>
        <View>
        {item.brand!='false'?<Text style={{fontSize:20}} >Brand: {item.brand}</Text>:null}
        {item.weight!='false'?<Text style={{fontSize:20,marginTop:10}} >Weight: {item.weight}</Text>:null}
</View>
        </View>
        </View>
      );

    return (
        <>
        <Header navigation={navigation} />
        <View style={{marginTop:30,width:'90%',marginLeft:'auto',marginRight:'auto',flexDirection:'row'}}>
<View style={{flexDirection:'row',backgroundColor:'#fafafa',borderRadius:5,alignItems:'center',width:200}}>
            
            <TextInput onChangeText={(e)=>{
                setname(e)
                
            }} style={{marginLeft:1,padding:14,width:150}} placeholder='Search...' />
            </View>

            <TouchableOpacity style={{backgroundColor:'#fafafa', padding:10,borderRadius:100, width:50, height:50,alignItems:'center',justifyContent:'center',marginLeft:30}} onPress={getDatas}>
            <FontAwesome name="search" size={18} color="#808080"  />
            </TouchableOpacity>
                </View>
                <View style={{flex:1,marginTop:100,left:'10%'}}>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'orange'}}>Products</Text>
            <SafeAreaView style={{flex:1}}>
            {productList.length<1?<Text style={{fontSize:30, marginTop:50}}>No Such Items :(</Text>:<FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />}
            </SafeAreaView>
            </View>
        </>
    )
}

export default Home
