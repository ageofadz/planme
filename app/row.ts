import { Activity } from "./types/activity";

export type Row =
    {
        id: string;
        category: string;
        name: Activity;
    };

export    type Options = 
    {
        dragonImage?: string,
        theme?: 'black' | 'white' | 'league' | 'beige' | 'night' | 'serif'| 'simple'| 'solarized'| 'moon'| 'dracula'| 'sky'| 'blood'
        songs?: {
            intro?: string,
            one?: string,
            two?: string,
            three?: string,
            cleanup?: string,
            goodbye?: string,
            timer?: string,
        }
        rules?: {
            sitNicely?: boolean,
            listen?: boolean,
            english?: boolean,
            nice?: boolean,
            tryBest?: boolean,
            raiseHand?: boolean,
            sticker?: boolean,
        }
        generateHandouts?: boolean,
        languageOrReading?: boolean,
        rulesAfterActivities?: boolean,
    };