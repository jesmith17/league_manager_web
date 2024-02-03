import { Division } from "./division";

export interface League {
    name: string;
    sport: string;
    id: string;
    season: string;
    default: boolean;
    divisions: Division[];
}
