
const championsLeagueResults = [
    {
      id: 1,
      homeTeam: 'FCK',
      awayTeam: 'Dortmund',
      result: '7 - 1',
      date: '2024-04-24',
    },
    {
      id: 2,
      homeTeam: 'Liverpool',
      awayTeam: 'Real Madrid',
      result: '6 - 3',
      date: '2024-04-25',
    },
    
  ];
  
  export default (req, res) => {
    res.status(200).json(championsLeagueResults);
  };
  