import buildClient from "../api/build-client";
import { AuthUrls } from "../common/api-urls";

export default function LandingPage({ currentUser }) {
  return currentUser ? <h1>You are signed in</h1> : <h1>Not signed in</h1>;
}

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get(AuthUrls.currentUser);

  return data;
};
