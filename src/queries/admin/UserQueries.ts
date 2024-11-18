export const UserQueries = {
    createUser: "INSERT INTO Users(UserKey, FirstName, LastName, Email, PasswordHash, Salt, [State], Country, Timezone, DateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    getUserByUserKey: "SELECT * FROM USERS WHERE UserKey = ?", 
    getUserByEmail: "SELECT * FROM USERS WHERE Email = ?", 
    updateUserFirstName: "UPDATE USERS SET FirstName = ? WHERE UserKey = ?",
    updateUserLastName: "UPDATE USERS SET LastName = ? WHERE UserKey = ?",
    updateUserEmail:"UPDATE USERS SET Email = ? WHERE UserKey = ?",
    updateUserPasswordHashWithSalt: "UPDATE USERS SET PasswordHash = ?, SET Salt = ? WHERE UserKey = ?",
    updateUserState: "UPDATE USERS SET [State] = ? WHERE UserKey = ?",
    updateUserCountry: "UPDATE USERS SET Country = ? WHERE UserKey = ?",
    updateUserTimezone: "UPDATE USERS SET Timezone = ? WHERE UserKey = ?",
    deleteUser: "DELETE FROM Users WHERE UserKey =?",
}