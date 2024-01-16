import React, { useContext } from 'react'
import { View, Text, Touchable, TouchableOpacity, FlatList } from 'react-native'
import { GlobalContext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCloudArrowDown, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
interface Reports {
    reports : Array<string>
}

interface Report {
    report: string
}

const ReportItem = ({report} : Report) => {
    return (
        
        <View style={{flexDirection:'row' , justifyContent:'space-between', height:80, alignContent:'center', borderWidth:2, alignItems:'center', padding:8, marginVertical: 12, borderColor:'#AA88EF', borderRadius:20}}>
        <TouchableOpacity style={{flexDirection:'row'}} >
            <View style={{ marginHorizontal:4, borderWidth:0, height:50, width:50, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#978CD0', borderRadius:50}}>
            <FontAwesomeIcon icon={faBookOpen} size={30} color="white" />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginLeft:4, borderWidth:0}}>
            <Text style={{fontSize:22, color:'black'}}>
                {report}
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
            <FontAwesomeIcon icon={faCloudArrowDown} size={40} color='black' />
        </TouchableOpacity>
        </View>
    )
}

const RenderReport = ({reports}: Reports) => {
    return (
        <FlatList data={reports} renderItem={({item} ) => {
            return <ReportItem report={item} />
        }} />
    )
}

function Report() {
    const {userDataFromSocket} = useContext(GlobalContext)
    return (
        <View style={{marginHorizontal:14}}>
        {(userDataFromSocket === null || typeof userDataFromSocket === 'undefined') ? null :  <RenderReport reports={userDataFromSocket["Reports"]} /> }
           
        </View>
    )
}

export default Report