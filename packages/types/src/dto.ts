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
    spotId: string;
    number: number;
    introSpot: string;
    name?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    hours?: string;
    avgRate?: number;
}

export interface ParticipantDTO {
    userId: number;
    type: boolean;
}


export interface RoadListResponseDTO {
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
    spotId: string;
    number: number;
    introSpot: string;
    avgReview: string;
    numReview: string;
}

export interface ReviewCreateDTO {
    spotId: string;
    content: string;
    rate: number;
}

export interface ReviewCheckDTO {
    spotId: string;
    content: string;
    rate: number;
}

export interface SpotReqDTO {
    roadId: number; 
    spots: addSpotDTO[];
}

export interface addSpotDTO {
    spotId: string;
    addNumber: number;
    addReason: string;
}

export interface DataSpotDTO {
    title: string;
    image: string | null;
    address: string;
    rating: number;
}  