export interface RoadRequestDTO {
    title: string;
    intro: string;
    categoryId: number;
    spots: SpotDTO[];
}

export interface RoadResponseDTO {
    roadId: number;
    title: string;
    intro: string;
    imageUrl: string | null;
    public: boolean;
    categoryId: number;

    spots: SpotDTO[];
    participants: ParticipantDTO[];

    createAt: Date;
    updateAt: Date;
}

export interface SpotDTO {
    spotId: number;
    number: number;
    introSpot: string;
}

export interface ParticipantDTO {
    userId: number;
    type: boolean;
}


export interface AllRoadResponseDTO {
    roadId: number;
    title: string;
    intro: string;
    imageUrl: string | null;
    categoryId: number;
    participants: number;
    native?: Native | null;
}

export type Native = 'SHORT_TERM' | 'MID_TERM' | 'LONG_TERM' | 'RESIDENT';

export interface OneRoadResponseDTO {
    roadId: number;
    title: string;
    intro: string;
    imageUrl: string | null;
    categoryId: number;
    spots: SpotReviewDTO[];
}

export interface SpotReviewDTO {
    spotId: number;
    number: number;
    introSpot: string;
    avgReview: string;
    numReview: string;
}