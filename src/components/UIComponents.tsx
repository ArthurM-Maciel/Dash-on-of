import React, { useState } from "react";

interface InteractiveCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: "blue" | "green" | "yellow" | "red" | "purple";
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  onClick?: () => void;
  children?: React.ReactNode;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  onClick,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: "border-raiô-500 bg-raiô-50",
    green: "border-green-500 bg-green-50",
    yellow: "border-yellow-500 bg-yellow-50",
    red: "border-red-500 bg-red-50",
    purple: "border-raiô-600 bg-raiô-50",
  };

  const iconBgClasses = {
    blue: "bg-raiô-100",
    green: "bg-green-100",
    yellow: "bg-yellow-100",
    red: "bg-red-100",
    purple: "bg-raiô-100",
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm p-6 border-l-4 transition-all duration-300 cursor-pointer
        hover:shadow-lg hover:scale-105 ${colorClasses[color]}
        ${isHovered ? "transform -translate-y-1" : ""}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div
              className={`flex items-center mt-1 text-sm ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-1">{trend.isPositive ? "↗" : "↘"}</span>
              <span>
                {Math.abs(trend.value)}% {trend.period}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 ${
            iconBgClasses[color]
          } rounded-full transition-transform duration-300 ${
            isHovered ? "rotate-12 scale-110" : ""
          }`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

interface PulsingDotProps {
  color: "green" | "red" | "yellow" | "blue";
  size?: "small" | "medium" | "large";
}

export const PulsingDot: React.FC<PulsingDotProps> = ({
  color,
  size = "medium",
}) => {
  const colorClasses = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-raiô-500",
  };

  const sizeClasses = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  };

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
      ></div>
      <div
        className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-ping opacity-75`}
      ></div>
    </div>
  );
};

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "error";
  label: string;
  showPulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showPulse = true,
}) => {
  const statusConfig = {
    online: { color: "green" as const, icon: "🟢" },
    offline: { color: "red" as const, icon: "🔴" },
    warning: { color: "yellow" as const, icon: "🟡" },
    error: { color: "red" as const, icon: "🚨" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center space-x-2">
      {showPulse ? (
        <PulsingDot color={config.color} />
      ) : (
        <span className="text-sm">{config.icon}</span>
      )}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

interface LoadingSkeletonProps {
  lines?: number;
  height?: string;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  lines = 3,
  height = "h-4",
  className = "",
}) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={`bg-gray-200 rounded ${height}`}></div>
      ))}
    </div>
  );
};

interface FloatingActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  color?: "blue" | "green" | "red" | "purple";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  color = "blue",
  position = "bottom-right",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: "bg-raiô-600 hover:bg-raiô-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    purple: "bg-raiô-600 hover:bg-raiô-700",
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          ${colorClasses[color]} text-white rounded-full shadow-lg 
          transition-all duration-300 flex items-center
          ${isHovered ? "scale-110 shadow-xl" : "scale-100"}
          ${isHovered ? "px-4 py-3" : "w-14 h-14"}
        `}
      >
        <span className="text-xl">{icon}</span>
        <span
          className={`ml-2 font-medium transition-all duration-300 ${
            isHovered
              ? "opacity-100 max-w-xs"
              : "opacity-0 max-w-0 overflow-hidden"
          }`}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  backgroundColor = "#e5e7eb",
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
