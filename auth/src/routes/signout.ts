import express from "express";
import { AuthUrls } from "../enums/enums";

const router = express.Router();

router.post(AuthUrls.signout, (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
