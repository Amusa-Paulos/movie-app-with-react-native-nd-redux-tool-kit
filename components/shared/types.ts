// Define a type for the slice state
export interface IMainState {
    page: number;
    searchValue: string;
    searchMoviePage: number;
    colorMode: TThemeMode;
}

export type TProductionCompanies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export type TThemeMode = 'light' | 'dark'