import { League } from "./league";

export interface Customer {
    name: string;
    id: string;
    base_url: string;
    active_league: League;
    
}
