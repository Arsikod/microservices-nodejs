import request from "supertest";
import { app } from "../../app";
import { AuthUrls } from "../../enums/enums";

it("clears cookie after sign out", async () => {
  await request(app)
    .post(AuthUrls.signup)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post(AuthUrls.signout)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
