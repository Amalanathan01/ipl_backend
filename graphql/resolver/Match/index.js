import { Match } from "../../../models/matchModel";

export default {
    Query: {
        matches: async (parent, args, context, info) => {
            const matches = await Match.find({}).populate().exec();
            return matches.map(match => ({
                id: match.id,
                season: match.season,
                city: match.city,
                date: match.date,
                team1: match.team1,
                team2: match.team2,
                toss_winner: match.toss_winner,
                toss_decision: match.toss_decision,
                result: match.result,
                dl_applied: match.dl_applied,
                winner: match.winner,
                win_by_runs: match.win_by_runs,
                win_by_wickets: match.win_by_wickets,
                player_of_match: match.player_of_match,
                venue: match.venue,
                umpire1: match.umpire1,
                umpire2: match.umpire2,
                umpire3: match.umpire3
            }));
        },
    }
};