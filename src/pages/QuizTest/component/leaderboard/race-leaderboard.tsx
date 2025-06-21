"use client";

import { useState } from "react";
import "./style.css";

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
  date: Date;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const players: Player[] = [
  {
    position: 1,
    previousPosition: 1,
    username: "Trần Duy Tài",
    avatar: getInitials("Trần Duy Tài"),
    time: "0:55.510",
    bestLap: "0:54.321",
    first: 15,
    second: 8,
    third: 5,
    totalRaces: 156,
    winRate: 42,
    date: new Date("2024-05-20T10:00:00Z"),
  },
  {
    position: 2,
    previousPosition: 3,
    username: "Phùng Hữu Tài",
    avatar: getInitials("Phùng Hữu Tài"),
    time: "1:15.430",
    bestLap: "1:14.321",
    first: 8,
    second: 12,
    third: 6,
    totalRaces: 120,
    winRate: 35,
    date: new Date("2024-05-19T11:30:00Z"),
  },
  {
    position: 3,
    previousPosition: 2,
    username: "Lê Quang Thọ",
    avatar: getInitials("Lê Quang Thọ"),
    time: "1:21.430",
    bestLap: "1:20.123",
    first: 5,
    second: 7,
    third: 9,
    totalRaces: 80,
    winRate: 28,
    date: new Date("2024-05-20T09:45:00Z"),
  },
  {
    position: 4,
    previousPosition: 4,
    username: "Trần Gia Huy",
    avatar: getInitials("Trần Gia Huy"),
    time: "1:32.213",
    bestLap: "1:31.001",
    first: 2,
    second: 4,
    third: 8,
    totalRaces: 50,
    winRate: 22,
    date: new Date("2024-05-18T15:20:00Z"),
  },
  {
    position: 5,
    previousPosition: 6,
    username: "Trần Minh Vũ",
    avatar: getInitials("Trần Minh Vũ"),
    time: "1:44.594",
    bestLap: "1:43.987",
    first: 1,
    second: 2,
    third: 3,
    totalRaces: 30,
    winRate: 18,
    date: new Date("2024-05-17T18:05:00Z"),
  },
];

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

export default function RaceLeaderboard() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

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
          {players.map((player, index) => (
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
                      <div className="player-avatar">
                        {getInitials(player.avatar)}
                      </div>
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
                <span className="date-display">
                  {player.date.toLocaleDateString()}
                </span>
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
