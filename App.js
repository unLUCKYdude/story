import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLovinMAX from "react-native-applovin-max";

import SplashScreen from "./screens/SplashScreen";
import NoInternetScreen from "./screens/NoInternetScreen";
import MainScreen from "./screens/MainScreen";
import { interstitialID } from "./functions";

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {

    useEffect(() => {
        AppLovinMAX.initialize("JvIWky6KLoPrIazvaAn80pNwDv6Ad46l6oR-dlTXBwl7zcOtIdXPHJTDM6D8DpH7Danol0NWHQlCrtMaNcOzcu", configuration => {
           console.log(configuration);

           AppLovinMAX.addEventListener('OnInterstitialLoadedEvent', e => {
                console.log("loaded", e);
                AppLovinMAX.showInterstitial(interstitialID);
            });
            AppLovinMAX.addEventListener('OnInterstitialLoadFailedEvent', e => {
                console.log("Interstitial ad failed to load", e);
            });
            AppLovinMAX.addEventListener('OnInterstitialClickedEvent', () => console.log("clicked"));
            AppLovinMAX.addEventListener('OnInterstitialDisplayedEvent', () => console.log("displayed"));
            AppLovinMAX.addEventListener('OnInterstitialAdFailedToDisplayEvent', () => console.log("display failed"));
            AppLovinMAX.addEventListener('OnInterstitialHiddenEvent', () => console.log("hidden"));
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, animation: "none"}}>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />
                <Stack.Screen
                    name="NoInternet"
                    component={NoInternetScreen}
                />
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}