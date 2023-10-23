import React from "react";
import { Text, View } from "react-native";
import { useAppTheme } from "../shared/appTheme";
import { Switch } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { storage_handler_init } from "../shared/storagehandler";
import { TThemeMode } from "../shared/types";
import { setColorMode } from "../shared/redxSlice";

const SettingsTab = React.memo((props) => {
    const [switchedOn, setSwitchedOn] = React.useState<boolean>(false)
    const theme = useAppTheme('', '')
    const colorMode = useAppSelector(state => state.main.colorMode) as TThemeMode
    const dispatch = useAppDispatch()
    
    const handleUpdateThemeMode = React.useCallback((value: boolean) => {
        setSwitchedOn(value)
        const newColorMode = colorMode == 'light' ? 'dark' : 'light'
        storage_handler_init.setItem(storage_handler_init._app_color_mode, JSON.stringify({mode: newColorMode}))
        dispatch(setColorMode(newColorMode))
    }, [colorMode])


    return (
        <View style={{flex: 1, backgroundColor: theme.appBackground, padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10, color: theme.inverseBlack}}>Dark mode</Text>
                <Switch value={colorMode == 'dark'}  onValueChange={handleUpdateThemeMode} />
            </View>
        </View>
    )
})

export default SettingsTab