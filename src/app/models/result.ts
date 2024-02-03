import { Team } from "./team";
import { Venue } from "./venue";

export interface Result {
    opponent_id: string;
    opponent_score: Number;
    opponent_name: string;
    score: Number; 
    scheduled_date: Date;
    venue: Venue;
    id: string;
    field_number: string;
    completed: boolean;
    result: string;
    home_team:boolean;

}
