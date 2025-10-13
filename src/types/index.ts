export type UserRole = "admin" | "hr";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  departament?: string;
}

export type RequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "in_progress"
  | "completed"
  | "failed";

export type RequestType = "onboarding" | "offboarding";

export interface AccessRequest {
  id: string;
  type: RequestType;
  employeeName: string;
  employeeEmail: string;
  department: string;
  position: string;
  startDate: string;
  endDate?: string;
  status: RequestStatus;
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  systems: string[];
  notes?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  automationStatus?: AutomationStatus;
}

export interface System {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  automationEnabled?: boolean;
  lastUpdate?: string;
  successRate?: number;
}

export interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  onboardingRequests: number;
  offboardingRequests: number;
  failedRequests: number;
  averageProcessingTime: number;
  automationSuccessRate: number;
  systemsOnline: number;
  totalSystems: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
  priority?: "low" | "medium" | "high";
  actionRequired?: boolean;
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  badge?: Badge;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

// Automation Types
export interface AutomationStatus {
  id: string;
  name: string;
  isRunning: boolean;
  lastRun?: string;
  successRate: number;
  totalExecutions: number;
  failedExecutions: number;
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  steps: AutomationStep[];
  isActive: boolean;
  triggers: string[];
  estimatedTime: string;
}

export interface AutomationStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: number;
  errorMessage?: string;
}

// Dashboard Analytics
export interface AnalyticsData {
  period: string;
  requests: number;
  completionRate: number;
  averageTime: number;
  automationUsage: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
