import React from "react";
import {useColorScheme} from 'react-native'
import Colors from "./Colors";
import { useAppSelector } from "./hooks";

export const useAppTheme = (mode = '', color = '') => {
    const colorScheme = useAppSelector(state => state.main.colorMode)
    const appTheme = Colors[colorScheme]
    return appTheme
}