import express from "express";

import { AuthUrls } from "../enums/enums";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(AuthUrls.currentUser, currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

// router.get(AuthUrls.currentUser, (req, res) => {
//   console.log(req.session);
//   if (!req.session?.jwt) {
//     return res.send({ currentUser: null });
//   }

//   try {
//     const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
//     res.send({ currentUser: payload });
//   } catch (error) {
//     res.send({ currentUser: null });
//   }
// });

export { router as currentUserRouter };
