import AsyncStorage from "@react-native-async-storage/async-storage";

const domain = "https://psaa2021.github.io/story";
export const interstitialID = "d165254b98433242";
export const COLOR = "#1d336d";

const makeRequest = async url => {
    try {
        return await fetch(`${domain}${url}`, {
            cache: "no-store"
        }).then(x => x.json());
    } catch (error) {
        return { error };
    }
}

export const loadCategories = () => makeRequest("/categories.json");

export const loadArticle = id => makeRequest(`/files/${id}.json`);

export const saveReadArticles = arr => {
    AsyncStorage.setItem("readArticles", JSON.stringify(arr));
}

export const loadReadArticles = async () => {
    const arr = await AsyncStorage.getItem("readArticles");
    return arr ? JSON.parse(arr) : [];
}

export const saveFavoriteArticles = arr => {
    AsyncStorage.setItem("favoriteArticles", JSON.stringify(arr));
}

export const loadFavoriteArticles = async () => {
    const arr = await AsyncStorage.getItem("favoriteArticles");
    return arr ? JSON.parse(arr) : [];
}