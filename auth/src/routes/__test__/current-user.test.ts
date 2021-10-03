import request from "supertest";
import { app } from "../../app";
import { AuthUrls } from "../../enums/enums";

it("responds with details about current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get(AuthUrls.currentUser)
    .set("Cookie", cookie)
    .send()
    .expect(400);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app)
    .get(AuthUrls.currentUser)
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
