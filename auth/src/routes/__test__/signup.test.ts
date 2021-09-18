import request from "supertest";
import { app } from "../../app";
import { AuthUrls } from "../../enums/enums";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post(AuthUrls.signup)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post(AuthUrls.signup)
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post(AuthUrls.signup)
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post(AuthUrls.signup)
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);

  await request(app)
    .post(AuthUrls.signup)
    .send({
      email: "",
      password: "asdasdasd",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post(AuthUrls.signup)
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post(AuthUrls.signup)
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("sets a cookie after successfull signup", async () => {
  const response = await request(app)
    .post(AuthUrls.signup)
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
