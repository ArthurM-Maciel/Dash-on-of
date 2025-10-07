import React from "react";
import { Badge, Achievement } from "../types";

interface BadgeComponentProps {
  badge: Badge;
  size?: "small" | "medium" | "large";
  showTooltip?: boolean;
}

export const BadgeComponent: React.FC<BadgeComponentProps> = ({
  badge,
  size = "medium",
  showTooltip = false,
}) => {
  const sizeClasses = {
    small: "w-8 h-8 text-lg",
    medium: "w-12 h-12 text-2xl",
    large: "w-16 h-16 text-3xl",
  };

  const colorClasses: Record<string, string> = {
    blue: "bg-raiô-100 border-raiô-300",
    purple: "bg-raiô-200 border-raiô-400",
    yellow: "bg-yellow-100 border-yellow-300",
    green: "bg-green-100 border-green-300",
    gold: "bg-yellow-200 border-yellow-400",
  };

  return (
    <div className="relative group">
      <div
        className={`
        ${sizeClasses[size]} 
        ${colorClasses[badge.color]} 
        border-2 rounded-full flex items-center justify-center
        ${badge.unlockedAt ? "opacity-100" : "opacity-40 grayscale"}
        transition-all duration-300 hover:scale-110
      `}
      >
        <span>{badge.icon}</span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
            <div className="font-semibold">{badge.name}</div>
            <div className="text-gray-300">{badge.description}</div>
            {badge.unlockedAt && (
              <div className="text-gray-400 text-xs mt-1">
                Desbloqueado:{" "}
                {new Date(badge.unlockedAt).toLocaleDateString("pt-BR")}
              </div>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: "blue" | "green" | "purple" | "yellow";
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  color = "blue",
  showPercentage = true,
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  const colorClasses = {
    blue: "bg-raiô-500",
    green: "bg-green-500",
    purple: "bg-raiô-600",
    yellow: "bg-raiô-400",
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-gray-500">
              {current}/{max}
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${colorClasses[color]} h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20 transition-transform duration-500 ease-out`}
            ref={(el) => {
              if (el) {
                el.style.transform = `translateX(${percentage - 100}%)`;
              }
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onClick,
}) => {
  const isCompleted = achievement.progress === achievement.maxProgress;

  return (
    <div
      className={`
        p-4 bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer
        hover:shadow-md hover:scale-105
        ${
          isCompleted
            ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50"
            : "border-gray-200"
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 mb-3">
        {achievement.badge && (
          <BadgeComponent badge={achievement.badge} size="medium" />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
          <p className="text-sm text-gray-600">{achievement.description}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-raiô-600">
            +{achievement.points}
          </div>
          <div className="text-xs text-gray-500">XP</div>
        </div>
      </div>

      {achievement.maxProgress && (
        <ProgressBar
          current={achievement.progress || 0}
          max={achievement.maxProgress}
          color={isCompleted ? "yellow" : "blue"}
        />
      )}

      {isCompleted && achievement.unlockedAt && (
        <div className="mt-2 text-xs text-green-600 font-medium">
          ✅ Concluído em{" "}
          {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
        </div>
      )}
    </div>
  );
};

interface XPBarProps {
  currentXP: number;
  currentLevel: number;
  xpToNextLevel?: number;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  currentLevel,
  xpToNextLevel = 1000,
}) => {
  const currentLevelXP = currentXP % xpToNextLevel;
  const progressPercentage = (currentLevelXP / xpToNextLevel) * 100;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚡</span>
          <span className="font-semibold text-gray-800">
            Nível {currentLevel}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {currentLevelXP}/{xpToNextLevel} XP
        </div>
      </div>

      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`bg-gradient-to-r from-raiô-400 to-raiô-600 h-4 rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse transition-transform duration-700 ease-out"
              ref={(el) => {
                if (el) {
                  el.style.transform = `translateX(${
                    progressPercentage - 100
                  }%)`;
                }
              }}
            ></div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
        {xpToNextLevel - currentLevelXP} XP para o próximo nível
      </div>
    </div>
  );
};

interface LeaderboardProps {
  players: Array<{
    id: string;
    name: string;
    level: number;
    points: number;
    avatar?: string;
    department?: string;
  }>;
  currentUserId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  players,
  currentUserId,
}) => {
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        🏆 Ranking Geral
      </h3>

      <div className="space-y-3">
        {sortedPlayers.slice(0, 10).map((player, index) => (
          <div
            key={player.id}
            className={`
              flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${
                player.id === currentUserId
                  ? "bg-raiô-50 border border-raiô-200"
                  : "hover:bg-gray-50"
              }
            `}
          >
            <div className="text-lg font-bold text-gray-600 w-8 text-center">
              {getRankIcon(index)}
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-raiô-400 to-raiô-600 flex items-center justify-center text-white font-semibold">
              {player.name.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="font-medium text-gray-900">{player.name}</div>
              <div className="text-sm text-gray-500">
                Nível {player.level} • {player.department}
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-raiô-600">
                {player.points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface NotificationToastProps {
  message: string;
  type: "achievement" | "level_up" | "badge" | "xp";
  icon?: string;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type,
  icon,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    achievement: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
    level_up: "bg-gradient-to-r from-raiô-500 to-raiô-600 text-white",
    badge: "bg-gradient-to-r from-green-400 to-raiô-500 text-white",
    xp: "bg-gradient-to-r from-raiô-400 to-raiô-600 text-white",
  };

  const defaultIcons = {
    achievement: "🏆",
    level_up: "⚡",
    badge: "🎖️",
    xp: "✨",
  };

  return (
    <div
      className={`
      fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border-2 border-white
      transform transition-all duration-500 animate-bounce
      ${typeStyles[type]}
    `}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon || defaultIcons[type]}</span>
        <div>
          <div className="font-semibold">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
