import { NotFoundError } from "@nurdev/common";
import express, { Request, Response } from "express";
import { TicketsUrls } from "../enums/enums";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(TicketsUrls.ticketId, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
