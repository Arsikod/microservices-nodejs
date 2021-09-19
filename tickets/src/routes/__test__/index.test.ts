import request from "supertest";
import { app } from "../../app";
import { TicketsUrls } from "../../enums/enums";

const createTicket = () => {
  return request(app)
    .post(TicketsUrls.tickets)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 20,
    });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get(TicketsUrls.tickets)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
