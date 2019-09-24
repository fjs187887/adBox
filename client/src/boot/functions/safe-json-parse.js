export default function safeJsonParse (json, def) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return def === void 0 ? json : def
  }
}
