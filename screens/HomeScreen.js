import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { COLOR } from "../functions";

const HomeScreen = ({ navigation }) => {

    return <View style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={{backgroundColor: COLOR, height: 60, justifyContent: "space-between", paddingLeft: 16, flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#fff", fontSize: 24}}>Главная</Text>
            <TouchableOpacity style={{padding: 16}} onPress={() => navigation.openDrawer()}>
                <Ionicon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
        <ScrollView style={{padding: 16, flex: 1}}>
            <View style={{backgroundColor: COLOR, borderRadius: 16, padding: 16, alignItems: "flex-start"}}>
                <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#000", fontSize: 18, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16}}>О приложении</Text>
                <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#fff", fontSize: 16, marginTop: 12}}>Откровенные истории о любви, сексе и отношениях. Лучшие эротические рассказы разных авторов со всего мира!</Text>
            </View>
            <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#000", fontSize: 18, marginTop: 32}}>Взбудоражь свои фантазии и досуг нашими интимными историями. Читай и возбуждайся по взрослому! Секс истории это не просто эротические рассказы - это искусство! В нашем приложении каждый найдет, что ему по душе.</Text>
            {/* <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#000", fontSize: 18, marginTop: 8}}></Text> */}
        </ScrollView>
    </View>
}

export default HomeScreen;