import { Router } from "express";
import { battle, rank } from "./controller.js";

const router = Router();

router.post("/battle", battle)
router.get("/ranking", rank)

export default router