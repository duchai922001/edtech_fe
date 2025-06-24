import { useEffect, useState } from "react";
import "./style.css";
import { useRanking } from "../../../../hooks/useRanking";
import type { GetRankingPayload } from "../../../../services/ranking.service";

// interface Player {
//   position: number;
//   previousPosition: number;
//   username: string;
//   avatar: string;
//   time: string;
//   bestLap: string;
//   first: number;
//   second: number;
//   third: number;
//   totalRaces: number;
//   winRate: number;
//   sector1: number;
//   sector2: number;
//   sector3: number;
//   isLive?: boolean;
// }

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(name.split(" ").length - 2, name.split(" ").length);
};

function MedalIcon({ position }: { position: number }) {
  if (position > 3) return null;

  const medals = {
    1: "👑",
    2: "🥈",
    3: "🥉",
  };

  return (
    <span className="medal-icon">
      {medals[position as keyof typeof medals]}
    </span>
  );
}

export default function RaceLeaderboard({ refId }: { refId?: string }) {
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

  const {
    mutate: fetchRanking,
    data: rankingData,
    isPending,
    isError,
  } = useRanking();

  useEffect(() => {
    if (refId) {
      const payload: GetRankingPayload = {
        type: "chinese",
        refId: refId,
        languageId: "68522b53943cefeda18742f3",
      };
      fetchRanking(payload);
    }
  }, [refId, fetchRanking]);

  const leaderboardPlayers = rankingData?.data || [];
  console.log("data", leaderboardPlayers);

  if (isPending) {
    return (
      <div className="leaderboard-container">
        <div className="header-leaderboard">
          <div className="header-leaderboard-title">
            <span>LEADERBOARD</span>
          </div>
        </div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="leaderboard-container">
        {/* Header */}
        <div className="header-leaderboard">
          <div className="header-leaderboard-title">
            <span>LEADERBOARD</span>
          </div>
        </div>

        {/* Main Leaderboard */}
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="header-cell position">No.</div>
            <div className="header-cell player">User</div>
            <div className="header-cell time">Time</div>
            <div className="header-cell sectors">Date</div>
          </div>
        </div>
        <p style={{ textAlign: "center", padding: "2rem" }}>
          Fail to load data
        </p>
      </div>
    );
  }

  if (leaderboardPlayers.length === 0) {
    return (
      <div className="leaderboard-container">
        {/* Header */}
        <div className="header-leaderboard">
          <div className="header-leaderboard-title">
            <span>LEADERBOARD</span>
          </div>
        </div>

        {/* Main Leaderboard */}
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="header-cell position">No.</div>
            <div className="header-cell player">User</div>
            <div className="header-cell time">Time</div>
            <div className="header-cell sectors">Date</div>
          </div>
        </div>
        <p style={{ textAlign: "center", padding: "2rem" }}>No data yet</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="header-leaderboard">
        <div className="header-leaderboard-title">
          <span>LEADERBOARD</span>
        </div>
      </div>

      {/* Main Leaderboard */}
      <div className="leaderboard-table">
        <div className="table-header">
          <div className="header-cell position">No.</div>
          <div className="header-cell player">User</div>
          <div className="header-cell time">Time</div>
          <div className="header-cell sectors">Date</div>
        </div>

        <div className="table-body">
          {leaderboardPlayers.data.map((player: any, index: any) => (
            <div
              key={player._id}
              className={`player-row ${
                selectedPlayer?.position === index ? "selected" : ""
              } ${index + 1 <= 3 ? "podium" : ""}`}
              onClick={() => setSelectedPlayer(player)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Position */}
              <div className="cell position-cell">
                <div className="position-content">
                  <MedalIcon position={index + 1} />
                  <span
                    className={`position-number ${
                      index + 1 === 1 ? "first-place" : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Player Info */}
              <div className="cell player-cell">
                <div className="player-info">
                  <div className="avatar-container">
                    <div className="avatar-border">
                      <div className="player-avatar">
                        {getInitials(player.userId.fullName)}
                      </div>
                    </div>
                  </div>
                  <div className="player-details">
                    <div className="player-name">{player.userId.fullName}</div>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="cell time-cell">
                <span className="time-display">
                  {formatDuration(player.duration)}
                </span>
              </div>

              {/* Date */}
              <div className="cell sectors-cell">
                <div className="sectors-container">
                  <div className="cell time-cell">
                    <span className="time-display">
                      {formatDate(player.submittedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${h}:${m}:${s}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý: tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
