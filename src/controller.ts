import { Request, Response } from "express";
import * as service from "./service.js";
import * as repository from "./repository.js"

const battle = async(req: Request ,res: Response) => {
	const { firstUser, secondUser } = req.body;

	const firstUserStars = await service.getStars(firstUser);
	const secondUserStars = await service.getStars(secondUser);

	const result = await service.battleUsers(firstUserStars, secondUserStars)

	res.send(result)
}

const rank = async(req: Request, res: Response) => {
	
	const {rows : fighters} = await repository.rankFighters();

	const result = {
		fighters
	}

	return res.send(result)
}

export {
	battle,
	rank,
}