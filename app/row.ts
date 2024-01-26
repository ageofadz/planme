type Row =
    {
        id: string;
        category: string;
        name: string;
    };

    type Options = 
    {
        dragonImage?: string,
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