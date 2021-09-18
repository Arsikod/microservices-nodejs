import request from "supertest";
import { app } from "../../app";
import { AuthUrls } from "../../enums/enums";

it("fails when non-existing email is supplied", async () => {
  await request(app)
    .post(AuthUrls.signin)
    .send({ email: "email@smth.com", password: "somepwd" })
    .expect(400);
});

it("fails if incorrect password is supplied", async () => {
  await request(app)
    .post(AuthUrls.signup)
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post(AuthUrls.signin)
    .send({ email: "test@test.com", password: "incorrect" })
    .expect(400);
});

it("responds with cookie for valid credentials", async () => {
  await request(app)
    .post(AuthUrls.signup)
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const response = await request(app)
    .post(AuthUrls.signin)
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
