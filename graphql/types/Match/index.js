export default `
  scalar Date

  type Match {
    id: Int!,
    season: String!,
    city: String!,
    date: Date!,
    team1: String!,
    team2: String!,
    toss_winner: String!,
    toss_decision: String!,
    result: String!,
    dl_applied: Boolean,
    winner: String!,
    win_by_runs: Int!,
    win_by_wickets: Int!,
    player_of_match: String!,
    venue: String!,
    umpire1: String!,
    umpire2: String!,
    umpire3: String!
  }
  type Query {
    matches: [Match]
  }
`;