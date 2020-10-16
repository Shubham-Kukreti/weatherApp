import React,{useState} from 'react';
import Header from './Header'
import {Text, View,FlatList,AsyncStorage } from 'react-native';
import { Appbar,TextInput,Button,Card } from 'react-native-paper';
import Constant from 'expo-constants'
export default Search = ({navigation})=> {
      const [city,setCity] = useState('')
      const [cities,setCities] = useState([])
      const fetchCities = (text)=>{
        setCity(text)
        fetch("https://autocomplete.wunderground.com/aq?query=" + text)
        .then(res=>res.json())
        .then(cityData=>{
          setCities(cityData.RESULTS.slice(0,9))
        })
        .catch(error=>{
          console.log(error)
      })
      }

      const btnClick = async ()=>{
        await AsyncStorage.setItem("newCity",city)
        navigation.navigate("home",{city:city})
      }
      const listClick = async (cityName)=>{
        setCity(cityName)
        await AsyncStorage.setItem("newCity",cityName)
        navigation.navigate("home",{city:cityName})
      }

      return (
        <View style={{
          flex:1
        }}>
          <Header name="Search Screen"/>
          <TextInput 
            label="city name"
            theme={{colors:{primary:"#00aaff"}}}
            value={city}
            onChangeText={(text)=>fetchCities(text)}
          />
          <Button
          icon="content-save"
          mode="contained"
          theme={{colors:{primary:"#00aaff"}}}
          style={{margin:17}}
          onPress={()=>btnClick()}>
            <Text style={{color:"white"}}>Press me</Text>
          </Button>

          <FlatList 
            data={cities}
            renderItem={({item})=>{
              return(
                <Card 
                  style={{margin:2,padding:12}}
                  onPress={()=>listClick(item.name)}
                >
                  <Text>{item.name}</Text>
                </Card>
              )  
            }}
            keyExtractor={item=>item.name}
          />

        </View>
      )
    }
  