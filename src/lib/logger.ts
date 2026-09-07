/** Minimal structured console logger — never pass secrets (passwords, tokens) as context. */
function log(level: "info" | "warn" | "error", scope: string, message: string, context?: Record<string, unknown>) {
  const entry = { time: new Date().toISOString(), level, scope, message, ...context };
  const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.info;
  fn(`[${scope}] ${message}`, entry);
}

export const logger = {
  info: (scope: string, message: string, context?: Record<string, unknown>) => log("info", scope, message, context),
  warn: (scope: string, message: string, context?: Record<string, unknown>) => log("warn", scope, message, context),
  error: (scope: string, message: string, context?: Record<string, unknown>) => log("error", scope, message, context),
};
