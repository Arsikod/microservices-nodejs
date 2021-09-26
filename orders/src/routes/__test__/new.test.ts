import { OrderStatus } from "@nurdev/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { buildOrder, buildTicket } from "./common";

it("returns an error if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId,
    })
    .expect(404);
});

it("returns an error if ticket reserved", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const order = Order.build({
    userId: "asdhasjkdhjsa",
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = await buildTicket();
  await buildOrder(global.signin(), ticket);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
