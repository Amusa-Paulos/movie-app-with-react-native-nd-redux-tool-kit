import React from "react";
import { Alert, View, Image, ActivityIndicator, Linking } from "react-native";
import { useAppTheme } from "./shared/appTheme";
import { movie_detail } from "./shared/functions";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native-paper";
import { IMAGE_URL } from "./shared/constants";
import { TProductionCompanies } from "./shared/types";
import { Link } from "iconsax-react-native";

// {
//     "adult": false,
//     "backdrop_path": "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
//     "belongs_to_collection": null,
//     "budget": 0,
//     "genres": [
//         {
//             "id": 28,
//             "name": "Action"
//         },
//         {
//             "id": 14,
//             "name": "Fantasy"
//         },
//         {
//             "id": 27,
//             "name": "Horror"
//         }
//     ],
//     "homepage": "https://www.disneyplus.com/movies/werewolf-by-night/J1sCDfT3MaDl",
//     "id": 894205,
//     "imdb_id": "tt15318872",
//     "original_language": "en",
//     "original_title": "Werewolf by Night",
//     "overview": "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
//     "popularity": 36.534,
//     "poster_path": "/jmv7EbqBuEk4V1U7OoSBaxkwawO.jpg",
//     "production_companies": [
//         {
//             "id": 420,
//             "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
//             "name": "Marvel Studios",
//             "origin_country": "US"
//         },
//         {
//             "id": 176762,
//             "logo_path": null,
//             "name": "Kevin Feige Productions",
//             "origin_country": "US"
//         }
//     ],
//     "production_countries": [
//         {
//             "iso_3166_1": "US",
//             "name": "United States of America"
//         }
//     ],
//     "release_date": "2022-09-25",
//     "revenue": 0,
//     "runtime": 55,
//     "spoken_languages": [
//         {
//             "english_name": "English",
//             "iso_639_1": "en",
//             "name": "English"
//         }
//     ],
//     "status": "Released",
//     "tagline": "There's no escaping the night.",
//     "title": "Werewolf by Night",
//     "video": false,
//     "vote_average": 7.0,
//     "vote_count": 1053
// }



const MovieDetails = React.memo((props: any) => {
    const theme = useAppTheme()
    const movie_id = props.route.params.movie_id
    const [movieDetail, setMovieDetails] = React.useState<any>({})
    const [loading, setLoading] = React.useState<boolean>(false)

    const fetch_details = React.useCallback(async () => {
        setLoading(true)
        const request = await movie_detail(movie_id)
        setLoading(false)
        if (request == undefined) {
            Alert.alert('Error Fetching', "Could not fetch movie details")
            return props.navigation.goBack()
        }
        console.log(request);
        setMovieDetails(request)
        

    }, [])

    React.useLayoutEffect(() => {
        console.log("movie_id:", movie_id)
        fetch_details()
        props.navigation.setOptions({
            headerStyle: {
                backgroundColor: theme.appBackground
            },
            headerTitleStyle: {
                color: theme.inverseBlack
            }
        })
    }, [])

//         {
//             "english_name": "English",
//             "iso_639_1": "en",
//             "name": "English"
//         }

    const MakeSpokenLanguages = React.memo(() => {
       return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>Spoken Languages: </Text>
            {
                movieDetail.spoken_languages.map((language: {english_name: string; iso_639_1: string; name: string}) => 
                    <Text style={{marginRight: 10, color: theme.gray}} key={language.iso_639_1}>{language.name}</Text>)
            }
        </View>
       ) 
    })
    //         {
//             "iso_3166_1": "US",
//             "name": "United States of America"
//         }

    const MakeProductionCountries = React.memo(() => {
       return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>Production Countries: </Text>
            {
                movieDetail.production_countries.map((countries: {iso_3166_1: string; name: string}) => 
                    <Text style={{marginRight: 10, color: theme.inverseBlack}} key={countries.iso_3166_1}>{countries.name}</Text>)
            }
        </View>
       ) 
    })

    const MakeGenres = React.memo(() => {
       return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>Genres: </Text>
            {
                movieDetail.genres.map((genre: {id: number; name: string}) => 
                    <Text style={{marginRight: 10, color: theme.gray}} key={genre.id}>{genre.name}</Text>)
            }
        </View>
       ) 
    })

        //     {
        //     "id": 420,
        //     "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
        //     "name": "Marvel Studios",
        //     "origin_country": "US"
        // },

    const MakeProductionCompanies = React.memo(() => {
        return (
            <View>
                <View style={{marginBottom: 5}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.inverseBlack}}>Production Companies</Text>
                </View>
                {
                    movieDetail.production_companies.map((comp: TProductionCompanies) =>
                        <View style={{flexDirection: 'row', marginBottom: 5}} key={comp.id}>
                            <View style={{marginRight: 10, backgroundColor: 'lightgray'}}>
                                <Image 
                                    source={{uri: IMAGE_URL + comp.logo_path}}
                                    width={40}
                                    height={40}
                                    resizeMode="contain"
                                />
                            </View>
                            <View>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: theme.inverseBlack}}>{comp.name}</Text>
                                <Text style={{color: theme.gray}}>{comp.origin_country}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    })

    return (
        <View style={{flex: 1, backgroundColor: theme.appBackground,}}>
            {
                loading ? 
                <View style={{width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={30} />
                    <Text style={{color: theme.inverseBlack}}>Loading...</Text>
                </View>
                 :
                <FlashList
                    data={[{}]}
                    contentContainerStyle={{paddingBottom: 25}}
                    renderItem={() => 
                        <View>
                            <Image 
                                source={{uri: IMAGE_URL + movieDetail.backdrop_path}} 
                                style={{width: '100%', height: 300}}
                            />

                            <View style={{paddingHorizontal: 10}}>
                                <View>
                                    <Text variant="titleLarge" style={{fontWeight: 'bold', color: theme.inverseBlack}}>
                                        {movieDetail.title}
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{color: theme.gray}}>
                                        {movieDetail.tagline}
                                    </Text>
                                </View>

                                <View>
                                    <MakeGenres />
                                </View>

                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>Released On: </Text>
                                    <Text style={{color: theme.gray}}>{movieDetail.release_date}</Text>
                                </View>

                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>Vote Count: </Text>
                                    <Text style={{color: theme.gray}}>{movieDetail.vote_count} votes</Text>
                                </View>

                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <Text style={{fontWeight: 'bold', color: theme.inverseBlack}}>Revenue: </Text>
                                    <Text style={{color: theme.gray}}>{movieDetail.revenue} USD</Text>
                                </View>

                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <MakeProductionCountries />
                                </View>

                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <MakeSpokenLanguages />
                                </View>

                                <View style={{marginTop: 10}}>
                                    <MakeProductionCompanies />
                                </View>

                                <View style={{marginTop: 10}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.inverseBlack}}>
                                        Overview
                                    </Text>
                                    <Text style={{color: theme.gray}}>
                                        {movieDetail.overview}
                                    </Text>
                                </View>

                                <View style={{marginTop: 10, flexDirection: 'row'}} onTouchEnd={() => Linking.openURL(movieDetail.homepage)}>
                                    <Text style={{color: '#57d4f7', marginRight: 5}}>View movie home page</Text>
                                    <Link size="20" color={'#57d4f7'}/>
                                </View>

                            </View>


                        </View>
                    }
                    estimatedItemSize={1}
                />
            }
        </View>
    )
})

export default MovieDetails