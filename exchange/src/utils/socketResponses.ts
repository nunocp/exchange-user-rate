export function socketMessage(message: string) {
  return JSON.stringify({ type: "message", message });
}

export function socketError(message: string | null) {
  return JSON.stringify({ type: "error", message: `Error: ${message}` });
}

export function socketData(data: any) {
  return JSON.stringify({ type: "data", data });
}
