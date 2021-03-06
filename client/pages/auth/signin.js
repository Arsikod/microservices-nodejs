import { useState } from "react";
import { useRouter } from "next/router";
import { AuthUrls } from "../../common/api-urls";
import useRequest from "../../hooks/use-request";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: AuthUrls.signin,
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}

      <button className="btn btn-primary">Log in</button>
    </form>
  );
}
