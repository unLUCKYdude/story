import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    Share,
    TextInput,
    FlatList,
    Image,
    ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import InAppReview from "react-native-in-app-review";
import Modal from "react-native-modal";
import { COLOR } from "../functions";

const CategoryItem = ({ title, onPress }) => {
    return <Pressable
        style={{padding: 16}}
        android_ripple={{color: "#ccc"}}
        onPress={onPress}
    >
        <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#000", fontSize: 18}}>{title}</Text>
    </Pressable>
}

const ActionItem = ({ icon, onPress, text, img }) => {
    return <TouchableOpacity onPress={onPress} style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12}}>
        {icon && <Ionicon name={icon} size={18} color="#485460" />}
        {img && <Image source={img} style={{width: 18, height: 18}} />}
        <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#485460", fontSize: 16, marginLeft: 16}}>{text}</Text>
    </TouchableOpacity>
}

const Item = ({ title, isRead, onPress, isFavorite }) => {

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

const Drawer = ({ categories, closeDrawer, articles, readArticles, favoriteArticles }) => {

    const navigation = useNavigation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    const [isReadOpen, setIsReadOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchArticles = articles.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.title.toLowerCase() - b.title.toLowerCase());
    const favoriteSortedArticles = articles.filter(item => favoriteArticles.includes(item.date)).sort((a, b) => a.title.toLowerCase() - b.title.toLowerCase());
    const readSortedArticles = articles.filter(item => !readArticles.includes(item.date)).sort((a, b) => a.title.toLowerCase() - b.title.toLowerCase());

    return <View style={{flex: 1}}>
        <View style={{backgroundColor: COLOR, height: 60, justifyContent: "space-between", paddingLeft: 16, flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontFamily: "OpenSansCondensed-Bold", color: "#fff", fontSize: 24}}>Меню</Text>
            <TouchableOpacity style={{padding: 16}} onPress={closeDrawer}>
                <Ionicon name="close" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
        <ScrollView>
            {
                categories.map((item, index) => <CategoryItem key={index.toString()} title={item.title} onPress={() => {
                    closeDrawer();
                    navigation.popToTop();
                    navigation.push("Category", { categoryIndex: index });
                }} />)
            }
            <View style={{height: 1, backgroundColor: "#d2dae2", marginBottom: 8}} />
            <ActionItem
                icon="search"
                text="Поиск"
                onPress={() => setIsSearchOpen(true)}
            />
            <ActionItem
                img={require("../src/dice-icon.png")}
                text="Случайная статья"
                onPress={() => {
                    if (!articles.length) return;
                    const index = Math.floor(Math.random() * articles.length);
                    closeDrawer();
                    navigation.popToTop();
                    navigation.navigate("Article", { ...articles[index] });
                }}
            />
            <ActionItem
                icon="eye-off"
                text="Не прочитано"
                onPress={() => {
                    setIsReadOpen(true);
                    closeDrawer();
                }}
            />
            <ActionItem
                icon="star"
                text="Избранные"
                onPress={() => {
                    setIsFavoriteOpen(true);
                    closeDrawer();
                }}
            />
            <ActionItem
                icon="share-social"
                text="Поделиться"
                onPress={() => Share.share({message: "market://details?id=com.demoness.sex"})}
            />
            <ActionItem
                icon="stats-chart"
                text="Оценить приложение"
                onPress={() => {
                    if (InAppReview.isAvailable()) {
                        InAppReview.RequestInAppReview();
                    }
                }}
            />
        </ScrollView>
        <Modal
            isVisible={isSearchOpen}
            style={{margin: 0, justifyContent: "flex-end"}}
            onBackButtonPress={() => setIsSearchOpen(false)}
            onBackdropPress={() => setIsSearchOpen(false)}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={{flex: 0.8, overflow: "hidden"}}>
                <View style={{backgroundColor: COLOR, height: 60, flexDirection: "row", alignItems: "center", paddingRight: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <TouchableOpacity onPress={() => setIsSearchOpen(false)} style={{padding: 16, marginRight: 48}}>
                        <Ionicon name="chevron-down" size={25} color="#fff" />
                    </TouchableOpacity>
                    <View style={{borderWidth: 2, borderRadius: 8, borderColor: "#fff", height: 44, flex: 1, alignItems: "center", flexDirection: "row", paddingHorizontal: 12}}>
                        <Ionicon name="search" size={18} color="#fff" />
                        <TextInput
                            value={searchText}
                            scrollEnabled={false}
                            style={{color: "#fff", flex: 1, fontFamily: "OpenSansCondensed-Bold", fontSize: 13, marginLeft: 10, top: 1}}
                            onChangeText={value => setSearchText(value)}
                            placeholder="Заголовок статьи..."
                            placeholderTextColor="#eeeeee"
                        />
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: "#fff"}}>
                    {searchArticles.length ? <FlatList
                        data={searchArticles}
                        keyExtractor={item => item.date.toString()}
                        renderItem={({ item }) => <Item {...item} isRead={readArticles.includes(item.date)} isFavorite={favoriteArticles.includes(item.date)} onPress={() => {
                            setIsSearchOpen(false);
                            closeDrawer();
                            navigation.popToTop();
                            navigation.navigate("Article", { ...item });
                        }} />}
                    /> : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Ionicon name="sad-outline" size={72} color="#000" />
                        <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24}}>Пусто</Text>
                    </View>}
                </View>
            </View>
        </Modal>
        <Modal
            isVisible={isFavoriteOpen}
            style={{margin: 0}}
            onBackButtonPress={() => setIsFavoriteOpen(false)}
            useNativeDriver={true}
            animationIn="fadeInRight"
            animationOut="fadeOutRight"
        >
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={{backgroundColor: COLOR, height: 60, flexDirection: "row", alignItems: "center", paddingRight: 16 }}>
                    <TouchableOpacity onPress={() => setIsFavoriteOpen(false)} style={{padding: 16, marginRight: 24}}>
                        <Ionicon name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24, color: "#fff"}}>Избранные</Text>
                </View>
                {favoriteSortedArticles.length ? <FlatList
                    data={favoriteSortedArticles}
                    keyExtractor={item => item.date.toString()}
                    renderItem={({ item }) => <Item {...item} isRead={readArticles.includes(item.date)} isFavorite={favoriteArticles.includes(item.date)} onPress={() => {
                        setIsFavoriteOpen(false);
                        navigation.popToTop();
                        navigation.navigate("Article", { ...item });
                    }} />}
                /> : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Ionicon name="sad-outline" size={72} color="#fff" />
                    <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24}}>Пусто</Text>
                </View>}
            </View>
        </Modal>
        <Modal
            isVisible={isReadOpen}
            style={{margin: 0}}
            onBackButtonPress={() => setIsReadOpen(false)}
            useNativeDriver={true}
            animationIn="fadeInRight"
            animationOut="fadeOutRight"
        >
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={{backgroundColor: COLOR, height: 60, flexDirection: "row", alignItems: "center", paddingRight: 16 }}>
                    <TouchableOpacity onPress={() => setIsReadOpen(false)} style={{padding: 16, marginRight: 24}}>
                        <Ionicon name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24, color: "#fff"}}>Не прочитано</Text>
                </View>
                {readSortedArticles.length ? <FlatList
                    data={readSortedArticles}
                    keyExtractor={item => item.date.toString()}
                    renderItem={({ item }) => <Item {...item} isRead={readArticles.includes(item.date)} isFavorite={favoriteArticles.includes(item.date)} onPress={() => {
                        setIsReadOpen(false);
                        navigation.popToTop();
                        navigation.navigate("Article", { ...item });
                    }} />}
                /> : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Ionicon name="sad-outline" size={72} color="#000" />
                    <Text style={{fontFamily: "OpenSansCondensed-Bold", fontSize: 24}}>Пусто</Text>
                </View>}
            </View>
        </Modal>
    </View>
}

export default Drawer;