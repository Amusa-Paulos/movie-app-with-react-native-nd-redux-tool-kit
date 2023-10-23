import React from "react";
import { Alert, Text, View } from "react-native";
import { fetch_movies, search_movies } from "../shared/functions";
import { CardUI, SearchBox } from "../others/Reusables";
import { useAppTheme } from "../shared/appTheme";
import { FlashList } from "@shopify/flash-list";
import { HomeTabContext, IMAGE_URL } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { updateMovieSearchPageNumber, updatePageNumber } from "../shared/redxSlice";
import { useIsFocused } from "@react-navigation/native";

const SearchTab = React.memo((props: any) => {
    const [movieList, setMovieList] = React.useState([])
    const theme = useAppTheme('', '')
    const dispatch = useAppDispatch()
    const currentSearchMoviePage = useAppSelector(state => state.main.searchMoviePage)
    const searchValue = useAppSelector(state => state.main.searchValue)
    const isFocused =  useIsFocused()

    React.useEffect(() => {
        if (isFocused) {

        }
    }, [isFocused])



    // search
    const handleSearch = React.useCallback(async (page = 1) => {
        console.log("currentSearchMoviePage in search:", currentSearchMoviePage, page);
        const request = await search_movies(searchValue, page)
        if (request == undefined) return  Alert.alert('Error Searching', "An error occured while searching please try again")
        console.log(request)
        if (page == 1) {
            setMovieList([]) 
            setTimeout(() => {
                setMovieList(request.results) 
            }, 800);
        }else{
            const all_movies = [...movieList, ...request.results] as any
            setMovieList(all_movies)   
        }
        dispatch(updateMovieSearchPageNumber(request.page))    
        
    }, [searchValue, movieList])


    const handleLoadMoreMovies = React.useCallback(() => {
        if (searchValue == '') return;
        handleSearch(currentSearchMoviePage + 1)
    }, [currentSearchMoviePage, searchValue])

    const handleRouteToDetailsPage = React.useCallback((movie_id: number) => {
        props.navigation.navigate('movieDetails', {movie_id})
    }, [])

    // {
    //     "adult": false,
    //     "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
    //     "id": 951491,
    //     "title": "Saw X",
    //     "original_language": "en",
    //     "original_title": "Saw X",
    //     "overview": "Between the events of 'Saw' and 'Saw II', a sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer, only to discover the entire operation is a scam to defraud the most vulnerable. Armed with a newfound purpose, the infamous serial killer returns to his work, turning the tables on the con artists in his signature visceral way through devious, deranged, and ingenious traps.",
    //     "poster_path": "/b16RAVwj2QN6RAs752UJNzQ9Of0.jpg",
    //     "media_type": "movie",
    //     "genre_ids": [
    //         27,
    //         53
    //     ],
    //     "popularity": 749.58,
    //     "release_date": "2023-09-26",
    //     "video": false,
    //     "vote_average": 7.159,
    //     "vote_count": 214
    // },

    return (
        <View style={{flex: 1, backgroundColor: theme.appBackground}}>
            <SearchBox 
                onSubmitEditing={handleSearch}
            />
            <FlashList
                data={movieList}
                renderItem={({ item }: {item: any}) => 
                    <CardUI
                        image={IMAGE_URL + item.backdrop_path}
                        movie_id={item.id}
                        title={item.title}
                        desc={item.overview.length <= 130 ? item.overview.slice(0, 130) : item.overview.slice(0, 130) + '...'}
                        handleRouteToDetailsPage={handleRouteToDetailsPage}
                    />}
                estimatedItemSize={200}
                onEndReached={handleLoadMoreMovies}
                onEndReachedThreshold={0}
                // @ts-ignore
                keyExtractor={item => item.id}
                contentContainerStyle={{paddingHorizontal: 10}}
            />
        </View>
    )
})

export default SearchTab