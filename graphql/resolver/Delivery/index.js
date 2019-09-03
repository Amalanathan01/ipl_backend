import { Delivery } from "../../../models/deliveryModel";

export default {
    Query: {
        deliveries: async (parent, { match_id }, context, info) => {
            const deliveries = await Delivery.find({ match_id }).populate().exec();
            return deliveries.map(delivery => ({
                match_id: delivery.match_id,
                inning: delivery.inning,
                batting_team: delivery.batting_team,
                bowling_team: delivery.bowling_team,
                over: delivery.over,
                ball: delivery.ball,
                batsman: delivery.batsman,
                non_striker: delivery.non_striker,
                bowler: delivery.bowler,
                is_super_over: delivery.is_super_over,
                wide_runs: delivery.wide_runs,
                bye_runs: delivery.bye_runs,
                legbye_runs: delivery.legbye_runs,
                noball_runs: delivery.noball_runs,
                penalty_runs: delivery.penalty_runs,
                batsman_runs: delivery.batsman_runs,
                extra_runs: delivery.extra_runs,
                total_runs: delivery.total_runs,
                player_dismissed: delivery.player_dismissed,
                dismissal_kind: delivery.dismissal_kind,
                fielder: delivery.fielder
            }));
        },
    }
};