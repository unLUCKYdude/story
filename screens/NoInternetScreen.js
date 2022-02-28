import React from "react";
import {
    View,
    Text,
    Pressable
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { COLOR } from "../functions";

const NoInternetScreen = ({ navigation }) => {
    return <View style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={{backgroundColor: COLOR, height: 40, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontFamily: "OpenSansCondensed-Bold", marginLeft: 16, color: "#000"}}>Проверьте интернет-подключение</Text>
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 36}}>
            <Ionicon name="cloud-offline-outline" size={100} color="#000" />
            <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#000", fontSize: 24, textAlign: "center", marginTop: 16}}>Ошибка при получении данных с сервера</Text>
            <View style={{borderRadius: 8, overflow: "hidden", marginTop: 72}}>
                <Pressable
                    style={{flexDirection: "row", alignItems: "center", backgroundColor: "#136384", paddingHorizontal: 16, paddingVertical: 12}}
                    android_ripple={{color: "#000"}}
                    onPress={() => navigation.replace("Splash")}
                >
                    <Ionicon name="refresh" size={25} color="#000" />
                    <Text style={{fontFamily: "OpenSansCondensed-Bold", marginLeft: 12, color: "#000", fontSize: 16, marginRight: 6}}>Повторить попытку</Text>
                </Pressable>
            </View>
        </View>
    </View>
}

export default NoInternetScreen;