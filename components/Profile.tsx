import React, { useCallback, useContext, useState } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { GlobalContext } from '../App'


interface credentials {
    detailOne : string,
    detailTwo : string     
}

const TextTitle = ({detailOne, detailTwo} : credentials) => {
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', height:30, margin:8 }}>
        <TouchableOpacity style={{height:22,}}> 
            <Text style={{fontSize:18}}>{detailOne}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text  style={{fontSize:18}}>{detailTwo}</Text>
        </TouchableOpacity>
        </View>
    )
}

function Profile() {
    const {userDataFromSocket} = useContext(GlobalContext)

    

  return (
   <View style={{padding:8}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:40, alignItems:'center', alignContent:'center'}}>
    {(userDataFromSocket === null || typeof userDataFromSocket === 'undefined') ? null :<>
    <Text style={{fontSize:28, color:'black',}}>{userDataFromSocket['name']}</Text>
    <Image source={{uri:userDataFromSocket['image']}} height={80} width={80} borderRadius={50} style={{position:'relative', top:10}} />
    </> }
   
    </View>
    {(userDataFromSocket === null || typeof userDataFromSocket === 'undefined') ? null : <View style={{backgroundColor:'#DCD9EF', borderRadius:14, marginHorizontal:8}}>
        <TextTitle detailOne={"Student Id Number"} detailTwo={userDataFromSocket['profile']['id']} />
        <TextTitle detailOne={"Class/Grade"} detailTwo={userDataFromSocket['profile']['class']} />
        <TextTitle detailOne={"Contact Number"} detailTwo={userDataFromSocket['profile']['contactNumber']} />
        <TextTitle detailOne={"Email"} detailTwo={userDataFromSocket['profile']['email']} />
    </View>}
   </View>
  )
}

export default Profile