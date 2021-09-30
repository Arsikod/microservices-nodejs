import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket, TicketDoc } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });

  await ticket.save();

  return ticket;
};

const buildOrder = async (cookie: string[], ticket: TicketDoc) => {
  const order = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  return order;
};

it("mark an order as cancelled", async () => {
  // create a ticket
  const ticket = await buildTicket();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order } = await buildOrder(user, ticket);

  // make request to delete the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  // create a ticket
  const ticket = await buildTicket();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order } = await buildOrder(user, ticket);

  // make request to delete the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
