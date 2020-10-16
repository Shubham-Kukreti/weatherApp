import React,{useState,useEffect} from 'react';
import Header from './Header'
import {Text, View,FlatList,Image,AsyncStorage } from 'react-native';
import { Appbar,TextInput,Button,Card,Title } from 'react-native-paper';

const Home = (props)=>{
    const [info,setInfo] = useState({
        name:"loading !!",
        temp:"loading",
        humidity:"loading",
        desc:"loading",
        icon:"loading"
    })
    useEffect(()=>{
        getWeather()
    })
    const getWeather = async ()=>{
        let MyCity = AsyncStorage.getItem("newCity");
        if(MyCity){
            const {city} =props.route.params
            MyCity = city 
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=33d30e7ca30608c7daf81821a9343697&units=metric`)
        .then(data=>data.json())
        .then(results=>{
            setInfo({
                name:results.name,
                temp:results.main.temp,
                humidity:results.main.humidity,
                desc:results.weather[0].description,
                icon:results.weather[0].icon,
            })
         })
        .catch(error=>{
            alert(error.message)
        })
    }
    if(props.route.params.city !="london"){
        getWeather()
    }
    return(
        <View
            style={{flex:1}}
        >
            <Header  name="Weather App"/>
            <View style={{
                alignItems:"center"
            }}>
                <Title
                    style={{
                        color:"#00aaff",
                        marginTop:30,
                        fontSize:30
                    }}
                >
                    {info.name}
                </Title>
                <Image 
                    style={{
                        width:120,
                        height:120,
                    }}
                    source={{uri:"https://openweathermap.org/img/w/" + info.icon + ".png"}}
                />
            </View>

            <Card style={{
                margin:5,
                padding:12,
                elevation:2
            }}>
                <Title style={{color:"#00aaff"}}>Temperature - {info.temp}</Title>

            </Card>
            <Card style={{
                margin:5,
                padding:12,
                elevation:2
            }}>
                <Title style={{color:"#00aaff"}}>Humidity - {info.humidity}</Title>

            </Card>
            <Card style={{
                margin:5,
                padding:12,
                elevation:2
            }}>
                <Title style={{color:"#00aaff"}}>Description - {info.desc}</Title>

            </Card>
        </View>
    )
}

export default Home