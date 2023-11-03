
const leaderboardData = [
    { player: 'Thechampion', score: 15 },
    { player: 'Dennæstbedste', score: 12 },
    { player: 'Krydsogbolleguden', score: 10 },
    { player: 'TheKing', score: 9 },
    { player: 'Rockbottom', score: 8 },
  ];
  
  export default (req, res) => {
    res.status(200).json(leaderboardData);
  };
  