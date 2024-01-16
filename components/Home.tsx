import React, { ReactComponentElement, useContext, useEffect, useState } from 'react'
import { View, Text, Touchable, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { GlobalContext } from '../App';
import { AbstractChartProps } from 'react-native-chart-kit/dist/AbstractChart';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faContactBook, faBookAtlas, faScaleBalanced, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@fortawesome/fontawesome-svg-core';

interface attendanceData {
    data: Array<number>,
    labels: Array<string>
}

interface button {
    name: string,
    icon: string
}

interface events {
    event: string
}

interface eventsArray {
    events: Array<string>
}
const Button = ({ name, icon }: button) => {
    return (
        <TouchableOpacity style={{ height: "80%", alignItems: 'stretch', }}>
            <View style={{ width: 70, height: 70, backgroundColor: '#978CD0', justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}>
                <FontAwesomeIcon icon={icon} style={{ backgroundColor: '#978CD0', color: 'white' }} size={32} />
            </View>
            <Text style={{ fontSize: 18, marginTop: 12 }}>{name}</Text>
        </TouchableOpacity>
    )
}
const RenderEventItem = ({ event }: events) => {
    return (
        <TouchableOpacity style={{height:40, padding:8, backgroundColor:'#DCD9EF', marginVertical:8, borderRadius:14}}>
            <Text style={{fontSize:18}}>{event}</Text>
        </TouchableOpacity>
    )
}

const RenderEvents = ({ events }: eventsArray) => {
    return (
        <FlatList data={events} renderItem={({ item }) => {
            console.log(item);

            return <RenderEventItem event={item} key={item} />
        }} />
    )
}

function Home() {
    const { userDataFromSocket } = useContext(GlobalContext);
    const [attendance, setAttendance] = useState<number>(0.8)
    const label = ["Attendance"]
    const [attendanceData, setAttendanceData] = useState<any>({
        data: [attendance],
        labels: ["Attendance"]
    });

    const [events, setEvents] = useState<Array<string> | null>(null)


    useEffect(() => {
        if (userDataFromSocket === null || typeof userDataFromSocket === 'undefined') {
            console.log("userDataFromSocketisNull");

        }
        else {
            console.log("userDataFromSocketisNotNull");
            setAttendance(userDataFromSocket['attendance'] / 365)
            const data_ = {
                data: [attendance],
                labels: [...label]
            }
            setAttendanceData({
                ...data_
            })

            setEvents([...userDataFromSocket['events']])
        }


        console.log("userDataFromSocket");
        console.log(userDataFromSocket);
        console.log("attendance");
        console.log(attendanceData);
        console.log(attendance);
        console.log("events");

        console.log(events);





    }, [userDataFromSocket])
    return (
        <ScrollView style={{ flex: 1 }}>
            {(typeof userDataFromSocket === undefined || userDataFromSocket === null) ? null : <>
                <View style={{ flex: 1, marginVertical: 20, padding: 8 }}>
                    <Text style={{ ...styles.title, marginLeft: 16 }}>Welcome Back</Text>
                    <Text style={{ ...styles.nameTitle, marginBottom: 18 }}>{userDataFromSocket.name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', height: 150, width: "100%", borderRadius: 20, justifyContent: 'space-evenly', backgroundColor: '#978CD0' }}>
                        <TouchableOpacity style={{ borderWidth: 0, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#DCD9EF' }}>Attendance</Text>
                            <Text style={{ fontSize: 28, color: '#DCD9EF' }}>{new Date().getDate().toString()}/{new Date().getMonth().toString()}/{new Date().getFullYear().toString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                            <ProgressChart data={attendanceData} height={100} width={200}
                                chartConfig={{
                                    backgroundColor: "#978CD0",
                                    backgroundGradientFrom: "#978CD0",
                                    backgroundGradientTo: "#978CD0",
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(220,217,239,0.5)`,
                                    labelColor: (opacity = 1) => `#978CD0`,
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }

                                }}

                            />
                        </TouchableOpacity>
                    </View>


                    <View style={{ borderRadius: 20, padding: 8, flex: 1, backgroundColor: '#F2F2F2', marginVertical: 20, justifyContent: 'center', alignContent: 'center', borderWidth: 0 }}>
                        <Text style={{ fontSize: 22, color: '#454F4A', backgroundColor: '#F2F2F2', marginTop: 8, borderWidth: 0, marginBottom: 4, color: 'black' }}>Quick Links</Text>
                        <View style={{ borderWidth: 0, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#DCD9EF', borderRadius: 20, height: 150, padding: 15, alignItems: 'center' }}>
                            <Button name={"Report"} icon={faContactBook} />
                            <Button name={"Syllabus"} icon={faBookAtlas} />
                            <Button name={"Unit Test"} icon={faScaleBalanced} />
                            <Button name={"Unit Test"} icon={faMoneyBill} />

                        </View>
                    </View>

                    <View style={{ flex: 1 }}>

                    </View>
                    <View>
                        <RenderEvents events={events} />
                    </View>
                </View>
            </>}
        </ScrollView>
    )


}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: 'black'
    },
    nameTitle: {
        fontSize: 26,
        color: "black",
        marginLeft: 18
    }
})

export default Home