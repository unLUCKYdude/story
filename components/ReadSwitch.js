import React, { useEffect, useRef } from "react";
import {
    View,
    Animated,
    Pressable,
    TouchableOpacity
} from "react-native";
import { COLOR } from "../functions";

const ReadSwitch = ({ isRead, check }) => {

    const opacity1 = useRef(new Animated.Value(1)).current;
    const opacity2 = useRef(new Animated.Value(0.4)).current;
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity1, {
                useNativeDriver: true,
                duration: 150,
                toValue: isRead ? 0.4 : 1
            }),
            Animated.timing(opacity2, {
                useNativeDriver: true,
                duration: 150,
                toValue: isRead ? 1 : 0.4
            }),
            Animated.timing(translateX, {
                useNativeDriver: true,
                duration: 150,
                toValue: isRead ? 16 : 0
            }),
        ]).start();
    }, [isRead]);

    return <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <TouchableOpacity onPress={() => check(false)} style={{paddingVertical: 16}}>
            <Animated.Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 16, color: "#1e272e", opacity: opacity1}}>Не прочитано</Animated.Text>
        </TouchableOpacity>
        <Pressable style={{width: 40, height: 24, borderRadius: 12, borderWidth: 2, borderColor: COLOR, marginHorizontal: 12, padding: 2}} onPress={() => check(!isRead)}>
            <Animated.View style={{width: 16, height: 16, borderRadius: 8, backgroundColor: COLOR, transform: [{ translateX }]}} />
        </Pressable>
        <TouchableOpacity onPress={() => check(true)} style={{paddingVertical: 16}}>
            <Animated.Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 16, color: "#1e272e", opacity: opacity2}}>Прочитано</Animated.Text>
        </TouchableOpacity>
    </View>
}

export default ReadSwitch;