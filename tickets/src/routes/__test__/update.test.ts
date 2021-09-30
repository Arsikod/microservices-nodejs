import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { TicketsUrls } from "../../enums/enums";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("returns 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 20,
    })
    .expect(404);
});

it("returns 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "title",
      price: 20,
    })
    .expect(401);
});

it("returns 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(TicketsUrls.tickets)
    .set("Cookie", global.signin())
    .send({
      title: "Title",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "smth",
      price: 1000,
    })
    .expect(401);
});

it("returns 400 if the user provides invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(TicketsUrls.tickets)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: -20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(TicketsUrls.tickets)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Title",
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("New Title");
  expect(ticketResponse.body.price).toEqual(100);
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(TicketsUrls.tickets)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Title",
      price: 100,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updated if the ticket is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(TicketsUrls.tickets)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: 20,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Title",
      price: 100,
    })
    .expect(400);
});
