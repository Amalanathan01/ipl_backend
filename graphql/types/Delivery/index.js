export default `
  type Delivery {
    match_id: Int!,
    inning: Int!,
    batting_team: String!,
    bowling_team: String!,
    over: Int!,
    ball: Int!,
    batsman: String!,
    non_striker: String!,
    bowler: String!,
    is_super_over: Boolean,
    wide_runs: Int,
    bye_runs: Int,
    legbye_runs: Int,
    noball_runs: Int ,
    penalty_runs: Int,
    batsman_runs: Int,
    extra_runs: Int,
    total_runs: Int,
    player_dismissed: String,
    dismissal_kind: String,
    fielder: String
  }
  type Query {
    deliveries(match_id: ID!): [Delivery]!
  }
`;