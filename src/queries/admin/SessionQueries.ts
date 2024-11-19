export const SessionQueries = {
    createSession: "INSERT INTO Sessions (UserKey, Token, DateExpiration) VALUES (?, ?, ?)",
    getLatestSessionByUser: "SELECT * FROM Sessions WHERE UserKey = ? ORDER BY DateExpiration desc LIMIT 1",
    getLatestSessionByToken: "SELECT * FROM Sessions WHERE Token = ? ORDER BY DateExpiration desc LIMIT 1"
}