import { Division } from './division';
import {Result} from './result'
import {League} from './league'
import {Record} from './record'

export interface Team {
    id: string;
    name: string;
    age: string;
    record: Record;
    coach: string;
    results: Result[];
    league: League;
    division: Division;
}
