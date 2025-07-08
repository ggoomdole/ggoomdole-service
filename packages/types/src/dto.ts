export interface AddLoadDTO {
    title: string;
    intro: string;
    categoryId: number;
    spots: SpotDTO[] | string;
}

export interface SpotDTO {
    spotId: number;
    number: number;
    introSpot: string;
}