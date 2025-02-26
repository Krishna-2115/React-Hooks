import { useState, useCallback } from "react";

const VotingSystem = () => {
  const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });
  const [userVote, setUserVote] = useState(null);

  const totalVotes = votes.optionA + votes.optionB;

  const getPercentage = (option) => {
    return totalVotes > 0 ? Math.round((votes[option] / totalVotes) * 100) : 0;
  };

  const handleVote = useCallback(
    (option) => {
      if (!userVote) {
        setVotes((prev) => ({ ...prev, [option]: prev[option] + 1 }));
        setUserVote(option);
      } else if (userVote !== option) {
        setVotes((prev) => ({
          ...prev,
          [userVote]: prev[userVote] - 1,
          [option]: prev[option] + 1,
        }));
        setUserVote(option);
      }
    },
    [userVote]
  );

  const handleUndoVote = useCallback(() => {
    if (userVote) {
      setVotes((prev) => ({ ...prev, [userVote]: prev[userVote] - 1 }));
      setUserVote(null);
    }
  }, [userVote]);

  // Define inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #2a4365, #4a90e2, #000)",
    color: "#fff",
    padding: "24px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "640px",
    padding: "32px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    border: "1px solid #2d3748",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.6)",
  };

  const headingStyle = {
    fontSize: "40px",
    fontWeight: "800",
    textAlign: "center",
    color: "#63b3ed",
    marginBottom: "32px",
    textShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
  };

  const buttonStyle = (isSelected, color1, color2) => ({
    width: "100%",
    padding: "16px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "12px",
    background: isSelected
      ? `linear-gradient(to right, ${color1}, ${color2})`
      : "#2d3748",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: isSelected ? `0px 4px 12px rgba(${color2}, 0.6)` : "none",
    transform: isSelected ? "scale(1.05)" : "scale(1)",
  });

  const progressBarStyle = {
    width: "100%",
    backgroundColor: "#4a5568",
    borderRadius: "8px",
    height: "16px",
    marginBottom: "24px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
  };

  const progressFillStyle = (color1, color2, width) => ({
    height: "100%",
    background: `linear-gradient(to right, ${color1}, ${color2})`,
    borderRadius: "8px",
    width: `${width}%`,
    transition: "width 0.5s ease",
  });

  const undoButtonStyle = {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(to right, #f56565, #ed8936)",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 12px rgba(239, 137, 54, 0.6)",
    transform: "scale(1)",
  };

  const totalVotesStyle = {
    marginTop: "32px",
    textAlign: "center",
    fontSize: "14px",
    color: "#edf2f7",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>🗳️ Vote in Real-Time</h1>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
          <button
            style={buttonStyle(userVote === "optionA", "#38b2ac", "#2c7a7b")}
            onClick={() => handleVote("optionA")}
          >
            ✅ Option A ({votes.optionA} votes)
          </button>

          <div style={progressBarStyle}>
            <div
              style={progressFillStyle("#38b2ac", "#2c7a7b", getPercentage("optionA"))}
            ></div>
          </div>

          <button
            style={buttonStyle(userVote === "optionB", "#3182ce", "#2b6cb0")}
            onClick={() => handleVote("optionB")}
          >
            ✅ Option B ({votes.optionB} votes)
          </button>

          <div style={progressBarStyle}>
            <div
              style={progressFillStyle("#3182ce", "#2b6cb0", getPercentage("optionB"))}
            ></div>
          </div>
        </div>

        {userVote && (
          <button
            style={undoButtonStyle}
            onClick={handleUndoVote}
          >
            ❌ Undo My Vote
          </button>
        )}

        <p style={totalVotesStyle}>{totalVotes} total votes cast</p>
      </div>
    </div>
  );
};

export default VotingSystem;
