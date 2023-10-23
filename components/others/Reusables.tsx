import React from "react";
import { View } from "react-native";
import { Card, Text, TextInput} from "react-native-paper";
import { useAppTheme } from "../shared/appTheme";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { updateSearchValue } from "../shared/redxSlice";


export const CardUI = React.memo((props: any) => {
    const theme = useAppTheme()
    return (
        <Card style={{marginBottom: 10}} onPress={() => props.handleRouteToDetailsPage(props.movie_id)}>
            <Card.Cover source={{ uri: props.image, }} />
            <Card.Content style={{backgroundColor: theme.appBackground}}>
                <Text variant="titleLarge" style={{color: theme.inverseBlack}}>{props.title}</Text>
                <Text variant="bodyMedium" style={{color: theme.gray}}>{props.desc}</Text>
            </Card.Content>
        </Card>
    )
})

export const SearchBox = React.memo((props: any) => {
    // const [searchValue, setSearchValue] = React.useState<string>('')
    const theme = useAppTheme()
    const dispatch = useAppDispatch()
    const searchValue = useAppSelector(state => state.main.searchValue)

    

    return (
        <View style={{marginBottom: 10}}>
            <TextInput
                label="Search movies..."
                value={searchValue}
                editable={props.editable == undefined}
                onPressIn={() => props.onPress?.()}
                onChangeText={text => dispatch(updateSearchValue(text))}
                contentStyle={{backgroundColor: theme.appBackground, color: theme.gray}}
                onSubmitEditing={() => props.onSubmitEditing()}
            />
        </View>
    )
})