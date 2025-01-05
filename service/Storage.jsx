import AsyncStorage from "@react-native-async-storage/async-storage"

export const setLocalStorage = async(key,value)=>{
    await AsyncStorage.setItem(key,value);
}

export const getLocalStorage=async(key)=>{
    const result=await AsyncStorage.getItem(key);
    return JSON.parse(result);
}

export const clearLocalStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log("Local storage cleared successfully");
    } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
    }
};