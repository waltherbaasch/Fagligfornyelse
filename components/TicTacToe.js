import { useState, useEffect } from 'react';

const TicTacToe = ({ initialScoreX = 0, initialScoreO = 0 }) => {
  const [cells, setCells] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);
  const [scoreX, setScoreX] = useState(parseInt(initialScoreX, 10));
  const [scoreO, setScoreO] = useState(parseInt(initialScoreO, 10));

  const cellClicked = (index) => {
    if (cells[index] === '' && !winner) {
      const updatedCells = [...cells];
      updatedCells[index] = currentPlayer;
      setCells(updatedCells);
      checkWinner(updatedCells);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (currentCells) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentCells[a] !== '' &&
        currentCells[a] === currentCells[b] &&
        currentCells[a] === currentCells[c]
      ) {
        setWinner(currentPlayer);
        setWinningCombination(pattern);
        updateScore(currentPlayer);
        return;
      }
    }

    if (!currentCells.includes('')) {
      setWinner('Nobody');
    }
  };

  const updateScore = (player) => {
    if (player === 'X') {
      setScoreX(scoreX + 1);
    } else if (player === 'O') {
      setScoreO(scoreO + 1);
    }
  };

  const resetGame = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCombination([]);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="border border-gray-500 rounded p-4 bg-white">
        <h1 className="text-2xl mb-4 text-center">Kryds og bolle</h1>
        <div className="grid grid-cols-3 gap-2">
          {cells.map((cell, index) => (
            <div
              key={index}
              onClick={() => cellClicked(index)}
              className={`w-12 h-12 flex items-center justify-center bg-gray-200 cursor-pointer text-2xl rounded ${
                winningCombination.includes(index) ? 'bg-green-200' : ''
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && <p className="mt-4 text-center">{winner === 'Nobody' ? 'Nobody wins!' : `Winner: ${winner}`}</p>}
        <div className="flex justify-center mt-4">
          <p>Score X: {scoreX}</p>
          <p className="ml-4">Score O: {scoreO}</p>
        </div>
        <button onClick={resetGame} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-md block mx-auto">
          Genstart
        </button>
        <Leaderboard />
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-box ">
      <h2 className="text-lg font-bold mb-2">Online Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index} className="flex justify-between">
            <span>{entry.player}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default TicTacToe;
