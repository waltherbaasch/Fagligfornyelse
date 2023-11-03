import TicTacToe from "../components/TicTacToe";
import Quiz from "../components/Quiz";
import Footer from "../components/Footer";

const HomePage = ({ questions, footballResults }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url('/images/Parken.jpeg')`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ width: "45%" }}>
          <TicTacToe/>
        </div>
        <div
          style={{
            width: "45%",
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
            color: "blue"
          }}
        >
          <Quiz questions={questions} />
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ marginBottom: "10px" }}>
              Champions League 2024 Semi-Finale Resultater:
            </h2>
            <img
              src="/images/champions_league_logo.png"
              alt="Champions League Logo"
              style={{ width: '200px', height: 'auto', marginRight: '10px' }}
            />
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {footballResults.map((match) => (
                <li
                  key={match.id}
                  style={{
                    marginBottom: "10px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "5px",
                  }}
                >
                  <strong>{`${match.homeTeam} ${match.result} ${match.awayTeam}`}</strong>
                  <span style={{ marginLeft: "10px", color: "#555" }}>
                    Dato: {match.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <img
          src="/images/fck.png"
          alt="FCK Logo"
          style={{
            width: '75px',
            height: '75px',
          }}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/championsLeagueResults");
    const footballResults = await res.json();

    const questions = [];

    return {
      props: { questions, footballResults },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { questions: [], footballResults: [] },
    };
  }
}

export default HomePage;
