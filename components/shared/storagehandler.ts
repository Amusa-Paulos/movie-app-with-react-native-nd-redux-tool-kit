import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageHandler {
    _app_color_mode = '_app_theme_color'
    constructor () {}

    setItem (key: string, value: string) {
        try {
            AsyncStorage.setItem(key, value);
        } catch (e) {
        // saving error
        console.log(e)
        }
    }

    getItem = async (key: string) => {
        try {
          return await AsyncStorage.getItem(key);
        } catch (e) {
          // error reading value
          console.log("err in getItem", e)
          return null
        }
    };

    async removeItem (key: string) {
        await AsyncStorage.removeItem(key)
    }
}

export const storage_handler_init = new StorageHandler()