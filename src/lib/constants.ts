// Ntfly Constants - معلومات ثابتة للتطبيق

export const APP_CONFIG = {
  name: "Ntfly",
  tagline: "أنشئ موقعك الاحترافي بالذكاء الاصطناعي",
  version: "1.0.0-beta",
  betaNote: "هذا إصدار تجريبي لمدة شهر",
} as const;

export const DEVELOPER_INFO = {
  name: "Soufyane",
  instagram: "soufiane__lr__77",
  email: "lrsoufyane2007@gmail.com",
  phone: "0638369776",
} as const;

export const ADMIN_CONFIG = {
  immutableAdminEmail: "lrsoufyane2007@gmail.com",
} as const;

export const STATS = {
  totalSites: "10,000+",
  activeUsers: "5,000+",
  userRating: "4.9",
} as const;

export const PROJECT_STATUS = {
  completed: { label: "مكتمل", variant: "success" },
  inProgress: { label: "قيد التنفيذ", variant: "warning" },
  pending: { label: "معلق", variant: "pending" },
} as const;
