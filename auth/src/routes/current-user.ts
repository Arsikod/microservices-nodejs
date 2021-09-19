import express from "express";

import { AuthUrls } from "../enums/enums";
import { currentUser } from "@nurdev/common";

const router = express.Router();

router.get(AuthUrls.currentUser, currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
