import connection from "./config/database.js"

const getFighter = async(user:String) => {
	return await connection.query(`
		SELECT * FROM fighters
		WHERE username = $1
	`,[user])
}

const createFighter = async(user:String) => {
	return await connection.query(`
		INSERT INTO fighters (username, wins, losses, draws)
		VALUES ($1, 0, 0, 0)
	`, [user])
}

const updateFigter = async(user:String, type: String) => {
	return await connection.query(`
		UPDATE fighters 
			SET ${type} = ${type} + 1
		WHERE username = $1
	`, [user])
}

const rankFighters = async() => {
	return await connection.query(`
		SELECT username, wins, losses, draws 
		FROM fighters
		ORDER BY wins DESC, draws DESC
	`)
}

export {
	getFighter,
	createFighter,
	updateFigter,
	rankFighters,
}