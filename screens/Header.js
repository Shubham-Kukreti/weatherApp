import React from 'react';
import {Text, View } from 'react-native';
import { Appbar,Title } from 'react-native-paper';

export default Header = (props)=> {
   
      return (
        <Appbar.Header
            theme={{
                colors:{
                    primary:"#00aaff",
                }
            }}
            style={{
                flexDirection:"row",
                justifyContent:"center"
            }}

        >
          
          <Title style={{color:"white",fontSize:26}}>
            {props.name}
          </Title>
        </Appbar.Header>
      );
    }
  