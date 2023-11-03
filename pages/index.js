import { useState, useEffect } from 'react';
import TicTacToe from "../components/TicTacToe";
import Quiz from "../components/Quiz";
import Footer from "../components/Footer";

const HomePage = ({ questions, footballResults, copenhagenTime }) => {
  const [time, setTime] = useState(copenhagenTime);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCopenhagenTime();
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const fetchCopenhagenTime = async () => {
    try {
      const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Copenhagen");
      const data = await res.json();
      setTime(data.datetime);
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/Parken.jpeg')` }}>
      <div className="flex flex-col">
        <TicTacToe />
        <div className="bg-gray-200 p-2 rounded mt-4 color-blue" style={{ textAlign: 'center' }}>
          <p className="text-sm">Copenhagen Time:</p>
          <p className="text-xs">{time}</p>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded color-blue">
        <Quiz questions={questions} />
        <div className="mt-4">
          <h2 className="mb-4">
            Champions League 2024 Semi-Finale Resultater:
          </h2>
          <img
            src="/images/champions_league_logo.png"
            alt="Champions League Logo"
            className="w-48 h-auto mr-4"
          />
          <ul className="list-none p-0">
            {footballResults.map((match) => (
              <li key={match.id} className="mb-4 border-b border-gray-300 pb-2">
                <strong>{`${match.homeTeam} ${match.result} ${match.awayTeam}`}</strong>
                <span className="ml-4 color-gray-600">
                  Dato: {match.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-auto col-span-2">
        <Footer />
      </div>
      <div className="absolute bottom-0 right-0">
        <img
          src="/images/fck.png"
          alt="FCK Logo"
          className="w-12 h-12"
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Copenhagen");
    const data = await res.json();
    const copenhagenTime = data.datetime;

    const resFootball = await fetch("http://localhost:3000/api/championsLeagueResults");
    const footballResults = await resFootball.json();

    const questions = [];

    return {
      props: { questions, footballResults, copenhagenTime },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { questions: [], footballResults: [], copenhagenTime: "" },
    };
  }
}

export default HomePage;
