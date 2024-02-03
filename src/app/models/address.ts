import { Team } from "./team";

export interface Address {
    city: string;
    street: string;
    state: string;
    post_code: string;
    geo_location: number[];
}
