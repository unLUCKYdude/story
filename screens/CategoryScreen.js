import React, { useState, useContext } from "react";
import {
    View,
    Text,
    FlatList,
    Pressable,
    TouchableOpacity,
    TextInput
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { COLOR } from "../functions";

import { Context } from "./MainScreen";

const Item = ({ title, isRead, isFavorite, onPress }) => {

    return <Pressable
        style={{padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}
        android_ripple={{color: "#ccc"}}
        onPress={onPress}
    >
        <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#1e272e", fontSize: 18}}>{title}</Text>
        <View style={{flexDirection: "row"}}>
            {isRead && <Ionicon name="bookmark" size={18} color="#1e272e" />}
            {isFavorite && <Ionicon name="star" size={18} color="#1e272e" style={{marginLeft: 16}} />}
        </View>
    </Pressable>
}

const CategoryScreen = ({ route, navigation }) => {

    const [text, setText] = useState("");
    const { readArticles, favoriteArticles } = useContext(Context);
    const category = route.params.categories[route.params.categoryIndex];
    const articles = category.articles.map(item => route.params.articles.find(elem => elem.id == item));
    const filteredArticles = articles.filter(item => item.title.toLowerCase().includes(text.toLowerCase())).sort((a, b) => a.title.toLowerCase() - b.title.toLowerCase());

    return <View style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={{backgroundColor: COLOR, height: 60, flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity onPress={navigation.goBack} style={{padding: 16, marginRight: 32}}>
                <Ionicon name="arrow-back" size={25} color="#fff" />
            </TouchableOpacity>
            <View style={{borderWidth: 2, borderRadius: 8, borderColor: "#fff", height: 44, flex: 1, alignItems: "center", flexDirection: "row", paddingHorizontal: 12}}>
            <Ionicon name="search" size={18} color="#fff" />
                <TextInput
                    value={text}
                    style={{color: "#fff", flex: 1, fontFamily: "OpenSansCondensed-Bold", fontSize: 13, marginLeft: 10, top: 1}}
                    onChangeText={value => setText(value)}
                    placeholder="Заголовок статьи..."
                    placeholderTextColor="#eeeeee"
                />
            </View>
            <TouchableOpacity style={{padding: 16}} onPress={navigation.openDrawer}>
                <Ionicon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row", padding: 16, alignItems: "center", borderBottomColor: COLOR, borderBottomWidth: 3}}>
            <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24}}>Категория:</Text>
            <Text style={{
                fontFamily: "OpenSansCondensed-Bold",
                fontSize: 18,
                marginLeft: 16,
                backgroundColor: COLOR,
                color: "#fff",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20
            }}>{category.title}</Text>
        </View>
        {filteredArticles.length ? <FlatList
            data={filteredArticles}
            keyExtractor={item => item.date.toString()}
            renderItem={({ item }) => <Item
                {...item}
                isRead={readArticles.includes(item.date)}
                isFavorite={favoriteArticles.includes(item.date)}
                onPress={() => navigation.navigate("Article", { ...item })}
            />}
        /> : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Ionicon name="sad-outline" size={72} color="#000" />
            <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24}}>Пусто</Text>
        </View>}
    </View>
}

export default CategoryScreen;