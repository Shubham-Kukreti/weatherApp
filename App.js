import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Search from './screens/Search'
import Constant from 'expo-constants'
import Home from './screens/Home'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialCommunityIcons} from '@expo/vector-icons'
const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route})=>({
            tabBarIcon:({color})=>{
              let iconName;
              if(route.name==="home"){
                iconName='city-variant'
              }
              else if(route.name==="search"){
                iconName='city'
              }
              return <MaterialCommunityIcons name={iconName} size={25} color={color}/>
            }
          })}
          tabBarOptions={{
            activeTintColor:"white",
            inactiveTintColor:"grey",
            activeBackgroundColor:"#00aaff",
            inactiveBackgroundColor:"00aaff"
          }}
        >
          <Tab.Screen name="home" component={Home}
            initialParams={{city:"london"}}
          />
          <Tab.Screen name="search" component={Search}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}


