import { Team } from "./team";
import { Venue } from "./venue";

export interface Participant {
    team_id: string;
    score: number; 
    team_name: string;
    result: string;
    home:boolean;

}
