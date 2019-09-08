const graphql = require('graphql');
const Delivery = require('../models/deliveryModel');
const Match = require('../models/matchModel');

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList, GraphQLNonNull, GraphQLBoolean
} = graphql; 

const DeliveryType = new GraphQLObjectType({
    name: 'Delivery',
    fields: () => ({
        match_id: { type: GraphQLInt },
        inning: { type: GraphQLInt },
        batting_team: { type: GraphQLString },
        bowling_team: { type: GraphQLString },
        over: { type: GraphQLInt },
        ball: { type: GraphQLInt },
        batsman: { type: GraphQLString },
        non_striker: { type: GraphQLString },
        bowler: { type: GraphQLString },
        is_super_over: { type: GraphQLBoolean },
        wide_runs: { type: GraphQLInt },
        bye_runs: { type: GraphQLInt },
        legbye_runs: { type: GraphQLInt },
        noball_runs: { type: GraphQLInt },
        penalty_runs: { type: GraphQLInt },
        batsman_runs: { type: GraphQLInt },
        extra_runs: { type: GraphQLInt },
        total_runs: { type: GraphQLInt },
        player_dismissed: { type: GraphQLString },
        dismissal_kind: { type: GraphQLString },
        fielder: { type: GraphQLString },
        match: {
            type: MatchType,
            resolve(parent, args) {
                return Match.find({ id: parent.matchId });
            }
        }
    
    })
});

const MatchType = new GraphQLObjectType({
    name: 'Match',
    fields: () => ({
        id: { type: GraphQLInt },
        season: { type: GraphQLID },
        city: { type: GraphQLString },
        date: { type: GraphQLString },
        team1: { type: GraphQLString },
        team2: { type: GraphQLString },
        toss_winner: { type: GraphQLString },
        toss_decision: { type: GraphQLString },
        result: { type: GraphQLString },
        dl_applied: { type: GraphQLBoolean },
        winner: { type: GraphQLString },
        win_by_runs: { type: GraphQLInt },
        win_by_wickets: { type: GraphQLInt },
        player_of_match: { type: GraphQLString },
        venue: { type: GraphQLString },
        umpire1: { type: GraphQLString },
        umpire2: { type: GraphQLString },
        umpire3: { type: GraphQLString },
        delivery:{
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return Delivery.find({ match_id: parent.id });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        deliveries: {
            type: new GraphQLList(DeliveryType),
            args: { matchid: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parent, args) {
                return Delivery.find({ match_id :args.matchid });
            }
        },
        match:{
            type: new GraphQLList(MatchType),
            args: { matchid : { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parent, args) {
                return Match.find({ id :args.matchid });
            }
        },
        matches:{
            type: new GraphQLList(MatchType),
            resolve(parent, args) {
                return Match.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMatch: {
            type: MatchType,
            args: {
                id: { type: GraphQLInt },
                season: { type: GraphQLID },
                city: { type: GraphQLString },
                date: { type: GraphQLString },
                team1: { type: GraphQLString },
                team2: { type: GraphQLString },
                toss_winner: { type: GraphQLString },
                toss_decision: { type: GraphQLString },
                result: { type: GraphQLString },
                dl_applied: { type: GraphQLBoolean },
                winner: { type: GraphQLString },
                win_by_runs: { type: GraphQLInt },
                win_by_wickets: { type: GraphQLInt },
                player_of_match: { type: GraphQLString },
                venue: { type: GraphQLString },
                umpire1: { type: GraphQLString },
                umpire2: { type: GraphQLString },
                umpire3: { type: GraphQLString }
            },
            resolve(parent, args) {
                let match = new Match({
                    id: args.id === '' ? null : parseInt(args.id),
                    season: args.season,
                    city: args.city,
                    date: args.date === '' ? null : new Date(args.date),
                    team1: args.team1,
                    team2: args.team2,
                    toss_winner: args.toss_winner,
                    toss_decision: args.toss_decision,
                    result: args.result,
                    dl_applied: args.dl_applied === 'Yes' ? false : true,
                    winner: args.winner,
                    win_by_runs: args.win_by_runs === '' ? null : args.win_by_runs,
                    win_by_wickets: args.win_by_wickets === '' ? null : args.win_by_wickets,
                    player_of_match: args.player_of_match,
                    venue: args.venue,
                    umpire1: args.umpire1,
                    umpire2: args.umpire2,
                    umpire3: args.umpire3
                });
                return match.save();
            }
        },
        addDelivery:{
            type: DeliveryType,
            args:{
                match_id: { type: GraphQLInt },
                inning: { type: GraphQLInt },
                batting_team: { type: GraphQLString },
                bowling_team: { type: GraphQLString },
                over: { type: GraphQLInt },
                ball: { type: GraphQLInt },
                batsman: { type: GraphQLString },
                non_striker: { type: GraphQLString },
                bowler: { type: GraphQLString },
                is_super_over: { type: GraphQLBoolean },
                wide_runs: { type: GraphQLInt },
                bye_runs: { type: GraphQLInt },
                legbye_runs: { type: GraphQLInt },
                noball_runs: { type: GraphQLInt },
                penalty_runs: { type: GraphQLInt },
                batsman_runs: { type: GraphQLInt },
                extra_runs: { type: GraphQLInt },
                total_runs: { type: GraphQLInt },
                player_dismissed: { type: GraphQLString },
                dismissal_kind: { type: GraphQLString },
                fielder: { type: GraphQLString }
            },
            resolve(parent,args){
                let delivery = new Delivery({
                    match_id: args.match_id === '' ? null : parseInt(args.match_id),
                    inning: args.inning === '' ? null : parseInt(args.inning),
                    batting_team: args.batting_team,
                    bowling_team: args.bowling_team,
                    over: args.over === '' ? null : parseInt(args.over),
                    ball: args.ball === '' ? null : parseInt(args.ball),
                    batsman: args.batsman,
                    non_striker: args.non_striker,
                    bowler: args.bowler,
                    is_super_over: args.is_super_over === '0' ? false : true,
                    wide_runs: args.wide_runs === '' ? null : parseInt(args.wide_runs),
                    bye_runs: args.bye_runs === '' ? null : parseInt(args.bye_runs),
                    legbye_runs: args.legbye_runs === '' ? null : parseInt(args.legbye_runs),
                    noball_runs: args.noball_runs === '' ? null : parseInt(args.noball_runs),
                    penalty_runs: args.penalty_runs === '' ? null : parseInt(args.penalty_runs),
                    batsman_runs: args.batsman_runs === '' ? null : parseInt(args.batsman_runs),
                    extra_runs: args.extra_runs === '' ? null : parseInt(args.extra_runs),
                    total_runs: args.total_runs === '' ? null : parseInt(args.total_runs),
                    player_dismissed: args.player_dismissed,
                    dismissal_kind: args.dismissal_kind,
                    fielder: args.fielder
                })
                return delivery.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});