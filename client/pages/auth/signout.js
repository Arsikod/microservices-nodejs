import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthUrls } from "../../common/api-urls";
import useRequest from "../../hooks/use-request";

export default function SignOut() {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: AuthUrls.signout,
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing out</div>;
}
