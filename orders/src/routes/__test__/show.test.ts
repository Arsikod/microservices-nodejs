import request from "supertest";
import { app } from "../../app";
import { TicketDoc } from "../../models/ticket";
import { buildTicket } from "./common";

const buildOrder = async (cookie: string[], ticket: TicketDoc) => {
  const order = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id });

  return order;
};

it("fetches the order", async () => {
  // create a ticket
  const ticket = await buildTicket();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order } = await buildOrder(user, ticket);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error when one user tries to fetch another users order", async () => {
  // create a ticket
  const ticket = await buildTicket();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order } = await buildOrder(user, ticket);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
