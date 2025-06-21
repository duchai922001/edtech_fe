import { useEffect, useState } from "react";
import "./style.css";
import { useRanking } from "../../../../hooks/useRanking";
import type { GetRankingPayload } from "../../../../services/ranking.service";
import Loading from "../../../../components/base/Loading";

interface Player {
  position: number;
  previousPosition: number;
  username: string;
  avatar: string;
  time: string;
  bestLap: string;
  first: number;
  second: number;
  third: number;
  totalRaces: number;
  winRate: number;
  sector1: number;
  sector2: number;
  sector3: number;
  isLive?: boolean;
}

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
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const {
    mutate: fetchRanking,
    data: rankingData,
    isPending,
    isError,
  } = useRanking();

  console.log(refId, "68522b53943cefeda18742f3");

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

  const leaderboardPlayers: Player[] = rankingData?.data || [];

  if (isPending) {
    return (
      <div className="leaderboard-container">
        <div className="header">
          <div className="header-title">
            <span>LEADERBOARD</span>
          </div>
        </div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="leaderboard-container">
        {/* Header */}
        <div className="header">
          <div className="header-title">
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
        <div className="header">
          <div className="header-title">
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
      <div className="header">
        <div className="header-title">
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
          {leaderboardPlayers.map((player, index) => (
            <div
              key={player.position}
              className={`player-row ${
                selectedPlayer?.position === player.position ? "selected" : ""
              } ${player.position <= 3 ? "podium" : ""}`}
              onClick={() => setSelectedPlayer(player)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Position */}
              <div className="cell position-cell">
                <div className="position-content">
                  <MedalIcon position={player.position} />
                  <span
                    className={`position-number ${
                      player.position === 1 ? "first-place" : ""
                    }`}
                  >
                    {player.position}
                  </span>
                </div>
              </div>

              {/* Player Info */}
              <div className="cell player-cell">
                <div className="player-info">
                  <div className="avatar-container">
                    <div className="avatar-border">
                      <img
                        src={player.avatar || "/placeholder.svg"}
                        alt={player.username}
                        className="avatar-image"
                      />
                    </div>
                  </div>
                  <div className="player-details">
                    <div className="player-name">{player.username}</div>
                    <div className="best-lap">Tốt nhất: {player.bestLap}</div>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="cell time-cell">
                <span className="time-display">{player.time}</span>
              </div>

              {/* Sectors */}
              <div className="cell sectors-cell">
                <div className="sectors-container">
                  {[player.sector1, player.sector2, player.sector3].map(
                    (sector, i) => (
                      <div key={i} className="sector-item">
                        <div className="sector-bar-container">
                          <div
                            className="sector-bar"
                            style={{ width: `${sector}%` }}
                          ></div>
                        </div>
                        <span className="sector-value">{sector}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Detail Modal
      {selectedPlayer && (
        <div className="player-detail-modal">
          <div className="modal-header">
            <div className="modal-player-info">
              <div className="modal-avatar-container">
                <div className="modal-avatar-border">
                  <img
                    src={selectedPlayer.avatar || "/placeholder.svg"}
                    alt={selectedPlayer.username}
                    className="modal-avatar-image"
                  />
                </div>
              </div>
              <div className="modal-player-details">
                <h3 className="modal-player-name">{selectedPlayer.username}</h3>
                <p className="modal-subtitle">Thống kê chi tiết</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedPlayer(null)}
              className="close-button"
            >
              ×
            </button>
          </div>

          <div className="modal-stats-grid">
            <div className="modal-stat-card win-rate">
              <div className="modal-stat-value">{selectedPlayer.winRate}%</div>
              <div className="modal-stat-label">Tỷ lệ thắng</div>
            </div>
            <div className="modal-stat-card total-races">
              <div className="modal-stat-value">
                {selectedPlayer.totalRaces}
              </div>
              <div className="modal-stat-label">Tổng cuộc đua</div>
            </div>
            <div className="modal-stat-card best-lap">
              <div className="modal-stat-value">{selectedPlayer.bestLap}</div>
              <div className="modal-stat-label">Vòng tốt nhất</div>
            </div>
            <div className="modal-stat-card current-time">
              <div className="modal-stat-value">{selectedPlayer.time}</div>
              <div className="modal-stat-label">Thời gian hiện tại</div>
            </div>
          </div>

          <div className="modal-podium-stats">
            <div className="podium-stat first">
              <div className="podium-value">{selectedPlayer.first}</div>
              <div className="podium-label">Hạng 1</div>
            </div>
            <div className="podium-stat second">
              <div className="podium-value">{selectedPlayer.second}</div>
              <div className="podium-label">Hạng 2</div>
            </div>
            <div className="podium-stat third">
              <div className="podium-value">{selectedPlayer.third}</div>
              <div className="podium-label">Hạng 3</div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
