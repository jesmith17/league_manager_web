export interface Record {
    wins: number;
    losses: number; 
    draws: number;
    goals_for: number;
    goals_allowed: number;
    goal_differential: number;
    points: number;
   
}

function displayRecord(record: Record): String {
    return `${record.wins} - ${record.losses} - ${record.draws}  `
}