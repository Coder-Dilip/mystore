import React,{useState,useEffect} from 'react'
import { View, Text, TextInput,Platform,Button,Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import { Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';
 
const Upload = ({navigation}) => {

const [name, setname] = useState('')
const [price, setprice] = useState('')
const [brand, setbrand] = useState('')
const [weight, setweight] = useState('')
const [message, setmessage] = useState('')
const [file, setFile] = useState(null);
const [image, setImage] = useState(null);
const [password, setpassword] = useState('');
const [uploading, startUploading] = useState(false);
const [selectedCategory, setselectedCategory] = useState();
const [category, setcategory] = useState();
const [details, setdetails] = useState('')

  const YOUR_SERVER_URL = "https://dilipbackend.xyz/api/product-edit";
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

 

const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg': return 'image/jpeg';
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
    console.log(result);
 
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*'
    });
 
    console.log(result);
 
    if (!result.cancelled) {
      setFile(result.uri);
    }
  };
  const uploadFile = async () => {
     if(name && price && category && image && password){
    alert('Submitted!')
       setmessage('')
    if(file||image){
      const fileUri = file ? file : image;
      let filename = fileUri.split('/').pop();
 
      const extArr = /\.(\w+)$/.exec(filename);
      const type = getMimeType(extArr[1]);
      setImage(null);
      setFile(null);
      startUploading(true);
 
      let formData = new FormData();
 
      formData.append('filetoupload', { uri: fileUri, name: filename, type });
formData.append('name',name);
formData.append('brand',brand);
formData.append('category',category);
formData.append('price',price);
formData.append('weight',weight);
formData.append('password',password);
formData.append('id',details);
 
      const response = await fetch('http://dilipbackend.xyz/api/product-edit', {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      startUploading(false);
      const responseAgain = await response.json();
      console.warn('responseAgain',responseAgain);
      return response;
    }
     }else{
            setmessage('Did you Fill up Name, Price, Brand, Category and Image?')
        }
};

 useEffect(()=>{
   setTimeout(() => {
    getDatas();
   }, 100);
  },[])

     const getDatas = async () => {
           const jsonValue = await AsyncStorage.getItem('currentItem')

            let parseValue=JSON.parse(jsonValue)
          
            if(parseValue){
                setdetails(parseValue.id)
            setname(parseValue.name)
       setprice(parseValue.price)
       setbrand(parseValue.brand!='false'?parseValue.brand:null)
       setweight(parseValue.weight!='false'?parseValue.weight:null)
       setcategory(parseValue.category);
       setselectedCategory(parseValue.category);
    setImage('https://dilipbackend.xyz/storage/'+parseValue.image)
    }
}
    return (
        <>
        <View style={{marginTop:50, width:100,marginLeft:'5%'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
      <Ionicons name="arrow-back-circle-outline" size={39} color="black" />
        </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={{width:'90%',marginLeft:'auto',marginRight:'auto'}}>
            <Text style={{fontSize:28,marginTop:60,fontWeight:'bold'}}>Edit Product</Text>
            <KeyboardAvoidingView
            >
            <View>
                <View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:50,height:45,borderColor:'orangered',padding:10}}>
                    <View style={{width:43}}>
            <FontAwesome5 name="buysellads" size={38} color="orangered" />
            </View>
            <TextInput onChangeText={(e)=>setname(e)} placeholder='Name' placeholderTextColor='#cfcfcf' value={name} style={{marginLeft:8,fontSize:18, width:230}} />
            </View>
                <View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:30,height:45,borderColor:'orangered',padding:8}}>
                    <View style={{width:43}}>
            <FontAwesome5 name="rupee-sign" size={38} color="green" />
            </View>
            <TextInput placeholder='Price' keyboardType='numeric' onChangeText={(e)=>setprice(e)} value={price} placeholderTextColor='#cfcfcf' style={{marginLeft:8,fontSize:18, width:230}} />
            </View>
                <View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:30,height:45,borderColor:'orangered',padding:8}}>
                    <View style={{width:43}}>
            <Entypo name="shop" size={38} color="blueviolet" />
            </View>
            <TextInput placeholder='Brand eg:(Dabur, Nestle)' placeholderTextColor='#cfcfcf' onChangeText={(e)=>setbrand(e)}
            value={brand} style={{marginLeft:8,fontSize:18, width:230}} />
            </View>
                <View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:30,height:45,borderColor:'orangered',padding:8}}>
                    <View style={{width:43}}>
            <FontAwesome5 name="weight" size={38} color="#00e1ff" />
            </View>
            <TextInput onChangeText={(e)=>setweight(e)} value={weight} placeholder='Weight (optional)' placeholderTextColor='#cfcfcf' style={{marginLeft:8,fontSize:18, width:230}} />
            </View>
                <View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:30,height:45,borderColor:'orangered',padding:8}}>
                    <View style={{width:43}}>
                    <MaterialIcons name="category" size={38} color="#dd00ff" />
            </View>
            <TextInput editable={false} onChangeText={(e)=>setcategory(e)} value={category} placeholder='Category eg:(Rice, Chocolate)' placeholderTextColor='#cfcfcf' style={{marginLeft:8,fontSize:18, width:250}} />
            </View>
            <View>
            <Picker
  selectedValue={selectedCategory}
  onValueChange={(itemValue, itemIndex) =>{
    setselectedCategory(itemValue)
    setcategory(itemValue)
  }
  
  }>
  <Picker.Item label="Rice" value="Rice" />
  <Picker.Item label="Oil" value="Oil" />
  <Picker.Item label="Pulses" value="Pulses" />
  <Picker.Item label="Chocolate" value="Chocolate" />
  <Picker.Item label="Jam" value="Jam" />
  <Picker.Item label="Biscuit" value="Bicuits" />
  <Picker.Item label="Noodles" value="Noodles" />
  <Picker.Item label="Dairy" value="Dairy" />
  <Picker.Item label="Dry Fruit" value="Dry Fruits" />
  <Picker.Item label="Plasctic Item" value="Plasctic Item" />
  <Picker.Item label="Cerals" value="Cerals" />
  <Picker.Item label="Wearable" value="Wearable" />
  <Picker.Item label="Cleanliness" value="Cleanliness" />
  <Picker.Item label="Powder" value="Powder" />
  <Picker.Item label="Battery" value="Battery" />
  <Picker.Item label="Sauce" value="Sauce" />
  <Picker.Item label="Poison" value="Poison" />
  <Picker.Item label="School Items and Paper" value="School Items and Paper" />
  <Picker.Item label="Juice and Water" value="Juice and Water" />
  <Picker.Item label="Sugar" value="Sugar" />
</Picker>
</View>

 <View style={{ flexDirection:'row', alignItems: 'center',marginTop:30,marginLeft:10 }}>
 <View style={{marginRight:10}}>
<FontAwesome name="photo" size={38} color="blue" />
</View>
      <Button title="Pick an Image" color='darkblue' onPress={pickImage} />
     
    </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200,marginTop:30 }} />}
            </View>
<View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:30,height:45,borderColor:'orangered',padding:8}}>
                    <View style={{width:43}}>
            <Ionicons name="key" size={38} color="#00e1ff" />
            </View>
            <TextInput onChangeText={(e)=>setpassword(e)} value={password} placeholder='Password' placeholderTextColor='#cfcfcf' style={{marginLeft:8,fontSize:18, width:230}} />
            </View>
            <View style={{flexDirection:'row', alignItems:'center',width:200,marginTop:40,height:45,borderColor:'orangered',padding:8}}>
            <TouchableOpacity onPress={uploadFile}>
            <Text style={{color:'white',padding:10,backgroundColor:'#00aaff',paddingRight:30,paddingLeft:30,borderRadius:5,marginBottom:20}}>Submit</Text>
            </TouchableOpacity>
            </View>


        <Text style={{marginLeft:8, marginTop:30,fontSize:20,color:'orangered'}}>{message}</Text>
        <View style={{marginTop:30}}></View>
            </KeyboardAvoidingView>
        </View>
    
            </ScrollView>
            </>
    )
}

export default Upload
