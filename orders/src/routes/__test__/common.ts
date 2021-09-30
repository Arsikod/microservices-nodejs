import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

import { Ticket, TicketDoc } from "../../models/ticket";

export const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });

  await ticket.save();

  return ticket;
};

export const buildOrder = async (cookie: string[], ticket: TicketDoc) => {
  return await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);
};
