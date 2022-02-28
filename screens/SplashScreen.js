import React, { useEffect, useRef, useState } from "react";
import {
    Text,
    ImageBackground,
    View,
    Animated,
    Dimensions,
    Easing
} from "react-native";

import { loadArticle, loadCategories, loadReadArticles, loadFavoriteArticles } from "../functions";

const w = Dimensions.get("screen").width;

const init = async (go, updateProgressBar) => {
    const categories = await loadCategories();
    if (categories.error) {
        setTimeout(() => go("NoInternet"), 2000);
        return;
    }
    const rawArticles = categories.reduce((accumulator, currentValue) => [...accumulator, ...currentValue.articles], []);
    let articles = [];
    for (let i = 0; i < rawArticles.length; i++) {
        const res = await loadArticle(rawArticles[i]);
        if (!res.error) articles.push({
            ...res,
            id: rawArticles[i]
        });
        updateProgressBar((i + 1) / rawArticles.length);
    }
    const readArticles = await loadReadArticles();
    const favoriteArticles = await loadFavoriteArticles();
    go("Main", {categories, articles, readArticles, favoriteArticles});
}

const Loader = ({ value }) => {

    const width = useRef(new Animated.Value(-w)).current;

    useEffect(() => {
        Animated.timing(width, {
            toValue: w * value,
            useNativeDriver: false,
            duration: 150,
            easing: Easing.linear
        }).start();
    }, [value]);

    return <View style={{position: "absolute", top: Dimensions.get("screen").height * 0.2}}>
        <Animated.View style={{width, backgroundColor: "#d2dae2", paddingBottom: 6, overflow: "hidden"}} >
            <Text style={{color: "#000000", fontSize: 24, fontFamily: "Oswald-SemiBold", width: w, textAlign: "center"}}>Эротические секс рассказы</Text>
        </Animated.View>
    </View>;
}

const SplashScreen = ({ navigation }) => {

    const [value, setValue] = useState(0);
    const opacity = useRef(new Animated.Value(0)).current;

    return <View style={{flex: 1, backgroundColor: "#ffffff"}}>
        <Animated.View style={{flex: 1, opacity}}>
            <ImageBackground
                source={require("../src/splash-image.jpg")}
                style={{flex: 1}}
                onLoad={() => {
                    Animated.timing(opacity, {
                        useNativeDriver: true,
                        toValue: 1,
                        duration: 300
                    }).start();
                    init(navigation.replace, setValue);
                }}
            >
                <View style={{position: "absolute", top: Dimensions.get("screen").height * 0.2, left: 0, width: w, alignItems: "center"}}>
                    <Text style={{color: "#ffffff", fontSize: 24, fontFamily: "Oswald-SemiBold"}}>Эротические секс рассказы</Text>
                </View>
                <Loader value={value} />
            </ImageBackground>
        </Animated.View>
    </View>
}

export default SplashScreen;