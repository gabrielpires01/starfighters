import axios from "axios";
import { notFoundError } from "./handleError.js";
import * as repository from "./repository.js"


const getStars = async(user: String) => {
	
	try {
		const { data: userRepos} = await axios.get(`https://api.github.com/users/${user}/repos`);

		await fighterExists(user)
		
		const totalStars = userRepos.reduce((prev: Number,curr : any) => {
			return +prev + Number(curr.stargazers_count)
		}, 0)
	
		return {username: user, totalStars}
	}catch(err) {
		throw notFoundError()
	}
	
}

const fighterExists = async(user:String) => {
	try {
		const { rows: existFighter} = await repository.getFighter(user);
		if(!existFighter[0]) {
			await repository.createFighter(user)
		}
	} catch (err) {
		throw err
	}
	
}

const battleUsers = async(firstUser: any, secondUser: any) => {
	const result = {
		winner: '',
		loser: '',
		draw: false
	};

	if (firstUser.totalStars > secondUser.totalStars ) {
		result.winner = firstUser.username
		result.loser = secondUser.username 

	} else if (firstUser.totalStars < secondUser.totalStars ) {
		result.winner = secondUser.username
		result.loser = firstUser.username
	} else {
		result.draw = true
	}
	
	if(!result.draw) {
		await repository.updateFigter(result.winner, "wins")
		await repository.updateFigter(result.loser, "losses")
	}else {
		await repository.updateFigter(firstUser.username, "draws")
		await repository.updateFigter(secondUser.username, "draws")
	}

	return result

}

export {
	getStars,
	battleUsers,
}