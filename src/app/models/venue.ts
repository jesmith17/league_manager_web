import { Address } from "./address";
import { Team } from "./team";

export interface Venue {
    name: string;
    venue_url: string; 
    address: Address;
    id: string;
}
