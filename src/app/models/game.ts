import { Participant } from "./participant";
import { Venue } from "./venue";

export interface Game {
    home_team_id: string;
    home_team_name: string;
    away_team_id: string;
    away_team_name: string;
    away_score: number;
    home_score: number;
    game_time: Date;
    venue: Venue;
    id: string;
    field: string;
    completed: boolean;
    result: string;

}


