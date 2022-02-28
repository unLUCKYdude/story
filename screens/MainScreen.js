import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerComponent from "../components/Drawer";
import HomeScreen from "./HomeScreen";
import CategoryScreen from "./CategoryScreen";
import ArticleScreen from "./ArticleScreen";
import { saveReadArticles, saveFavoriteArticles } from "../functions";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export const Context = React.createContext();

const ContainerScreen = ({ route }) => {
    return <Stack.Navigator screenOptions={{headerShown: false, animation: "none"}}>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={route.params}
        />
        <Stack.Screen
            name="Category"
            component={CategoryScreen}
            initialParams={route.params}
        />
        <Stack.Screen
            name="Article"
            component={ArticleScreen}
            initialParams={route.params}
        />
    </Stack.Navigator>
}

const MainScreen = ({ route }) => {

    const [readArticles, setReadArticles] = useState(route.params.readArticles);
    const [favoriteArticles, setFavoriteArticles] = useState(route.params.favoriteArticles);
    const [articlesLeft, setArticlesLeft] = useState(0);

    const checkArticle = (id, flag) => setReadArticles(prev => {
        if (flag) return !prev.includes(id) ? [...prev, id] : prev;
        return prev.includes(id) ? prev.filter(item => item != id) : prev;
    });

    const toggleFavorite = id => setFavoriteArticles(prev => {
        return prev.includes(id) ? prev.filter(item => item != id) : [...prev, id];
    });

    const refreshArticlesLeft = () => setArticlesLeft(2);
    const reduceArticlesLeft = () => setArticlesLeft(prev => prev - 1);

    useEffect(() => saveReadArticles(readArticles), [readArticles]);
    useEffect(() => saveFavoriteArticles(favoriteArticles), [favoriteArticles]);

    return <Context.Provider value={{ readArticles, checkArticle, favoriteArticles, toggleFavorite, articlesLeft, refreshArticlesLeft, reduceArticlesLeft }}>
        <Drawer.Navigator
            screenOptions={{headerShown: false, swipeEdgeWidth: 70}}
            drawerContent={props => <DrawerComponent
                categories={route.params.categories}
                closeDrawer={props.navigation.closeDrawer}
                articles={route.params.articles}
                readArticles={readArticles}
                favoriteArticles={favoriteArticles}
            />}
        >
            <Drawer.Screen
                name="Container"
                component={ContainerScreen}
                initialParams={route.params}
            />
        </Drawer.Navigator>
    </Context.Provider>
}

export default MainScreen;