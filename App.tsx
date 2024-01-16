import React, { useEffect, useState, createContext } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
import Profile from './components/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faBook, faContactBook, faCalendar } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import {ip, port} from "./data"
import Report from './components/Report';



const socket = io(`ws://${ip}:${port}`, {reconnection:true});

export const GlobalContext = createContext<any | object >({});

function App() {
  const [userDataFromSocket, setUserDataFromSocket] = useState<unknown | null>(null);
  
  
  useEffect(()=> {
    socket.on('connect', () => {
      console.log('Connected to server');
     
      // You can now use the 'socket' object to interact with the server
      // For example, emit a 'chat message' event to the server
      
    });

    
    socket.on("sendUserData", (data)=> {
      // console.log("connectionRequests", data); 
      setUserDataFromSocket(data)
    })
   

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    
    

  },[socket])

  useEffect(()=> {
    console.log(userDataFromSocket);
    
  }, [userDataFromSocket])
  return (
    <GlobalContext.Provider value={{
      userDataFromSocket, setUserDataFromSocket
    }}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen component={Home} name='Home' options={{tabBarIcon:()=>{
          return <FontAwesomeIcon icon={faHouse} />
        }}} />

        <Tab.Screen component={Profile} name='Profile' options={{tabBarIcon:()=>{
          return <FontAwesomeIcon icon={faContactBook} />
        }}} />

        <Tab.Screen component={Report} name='Report'  options={{tabBarIcon:()=>{
          return <FontAwesomeIcon icon={faCalendar} />
        }}} />
      </Tab.Navigator>


    </NavigationContainer>
    </GlobalContext.Provider>
  );
}

export default App;