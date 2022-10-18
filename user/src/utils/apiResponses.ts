export function apiSuccess(message?: string | null, data?: object) {
  return { success: true, message, data };
}

export function apiError(message?: string | null, data?: object) {
  return { success: false, message: `Error: ${message}`, data };
}
