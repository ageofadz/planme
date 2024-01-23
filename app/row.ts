type Row =
    {
        id: string;
        category: string;
        name: string;
        options?: {
            song?: {
                songUrl: string,
            }
            rules?: {
                sitNicely: boolean,
                listen: boolean,
                english: boolean,
                nice: boolean,
                tryBest: boolean,
                raiseHand: boolean,
                sticker: boolean,
            }
            sticky?: {
                target: boolean,
            }
            slap?: {
                target: boolean,
            }
            skirts?: {
                generateHandout: boolean,
            }
            bingo?: {
                generateHandout: boolean,
            }
            hotPotato?: {
                timerUrl: string,
            }
            dragonPicture?: {
                dragonImage: string,
            }
        };
    };