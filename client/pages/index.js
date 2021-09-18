import axios from "axios";
import { AuthUrls } from "../common/api-urls";

export default function LandingPage({ currentUser }) {
  console.log(currentUser);
  return <h1>Hello</h1>;
}

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      `http://ingress-nginx.ingress-nginx-controller.svc.cluster.local${AuthUrls.currentUser}`,
      { headers: { Host: "ticketing.dev" } }
    );

    return data;
  } else {
    const { data } = await axios.get(AuthUrls.currentUser);
    return data;
  }

  return {};
};
