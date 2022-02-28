import React, { useContext, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import AppLovinMAX from "react-native-applovin-max";

import ReadSwitch from "../components/ReadSwitch";
import { COLOR, interstitialID } from "../functions";
import { Context } from "./MainScreen";

const Item = React.memo(({ type, text, delay }) => {

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 300,
        delay
    }).start, []);

    if (type == 0) return <Animated.Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#000", fontSize: 18, marginTop: 24, marginBottom: 4, opacity}}>{text}</Animated.Text>;
    if (type == 1) return <Animated.Text style={{fontFamily: "OpenSansCondensed-Light", color: "#000", fontSize: 16, lineHeight: 18, marginVertical: 8, opacity}}>{text}</Animated.Text>;
});

const ArticleScreen = ({ route, navigation }) => {

    const [array, setArray] = useState([]);

    const { readArticles, checkArticle, favoriteArticles, toggleFavorite, articlesLeft, refreshArticlesLeft, reduceArticlesLeft } = useContext(Context);
    const { arr, title, date } = route.params;

    useEffect(() => {
        if (articlesLeft == 0) {
            AppLovinMAX.loadInterstitial(interstitialID);
            refreshArticlesLeft();
        } else {
            reduceArticlesLeft();
        }
        setTimeout(() => setArray(arr), 150);
    }, []);

    return <View style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={{backgroundColor: COLOR, minHeight: 60, flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity onPress={navigation.goBack} style={{padding: 16}}>
                <Ionicon name="arrow-back" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#fff", fontSize: 18, flex: 1}}>{title}</Text>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => toggleFavorite(date)} style={{padding: 16}}>
                    <Ionicon name={favoriteArticles.includes(date) ? "star" : "star-outline"} size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 16}} onPress={navigation.openDrawer}>
                    <Ionicon name="menu" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
        <FlatList
            data={array}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => <Item {...item} delay={index * 20} />}
            contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
            ListFooterComponent={<View>
                {!!array.length && <ReadSwitch isRead={readArticles.includes(date)} check={flag => checkArticle(date, flag)} />}
            </View>}
            initialNumToRender={10}
        />
    </View>
}

export default ArticleScreen;