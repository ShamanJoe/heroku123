import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../resources/style.css";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

function ArticleCard({ article: { title, plot, category } }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{category}</h5>
      <div>{plot}</div>
    </div>
  );
}

export function FrontPage() {
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/article")
  );

  if (loading) {
    return <div>loading....</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }
  return (
    <div className={"page-wrap"}>
      <header className={"page-header"}>Daily News</header>
      <nav className={"page-nav"}>
        <Link to={"/"}>The Daily Mail</Link>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/publish"}>Publish</Link>
        <Link to={"/login/profile"}>Profile</Link>
      </nav>

      <div className={"page-main"}>
        <h1>All articles</h1>
        <div>
          {data.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/*function LoginAD() {

    useEffect(async () => {
        const { authorization_endpoint } = await fetchJSON("https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration");

        const state = randomString(50);
        window.sessionStorage.setItem("authorization_state", state);
        const code_verifier = randomString(50);
        window.sessionStorage.setItem("code_verifier", code_verifier);

        const parameters = {
            response_type: "token",
            //response_mode: "fragment",
            state,
            client_id: "1127fa8f-5af0-41b0-bd86-ee1392607b19",
            scope: "openid email profile",
            code_challenge: await sha256(code_verifier),
            code_challenge_method: "S256",
            redirect_uri: window.location.origin + "/login/callback",
            domain_hint: "egms.no",
        };

        window.location.href =
            authorization_endpoint + "?" + new URLSearchParams(parameters)
    }, []);

    return (
        <div>
            <h1>Please wait....</h1>
        </div>
    );
}*/

function LoginPage() {
    //FOR GOOGLE LOG IN
  //const [redirectUrl, setRedirectUrl] = useState()
  /*useEffect(async ()=> {
        const {authorization_endpoint} = await fetchJSON("https://accounts.google.com/.well-known/openid-configuration")

        const parameters = {
            response_type: "token",
            client_id: "1022598625512-5bh76vhsqr09vl45td0horgevn8qpn5b.apps.googleusercontent.com",
            scope: "email profile",
            redirect_uri: window.location.origin + "/login/callback"
        };

        window.location.href =
            authorization_endpoint + "?" + new URLSearchParams(parameters)
    }, [])
    return <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            <nav className={"page-nav"}>
                <Link to={"/"}>The Daily Mail</Link>
                <Link to={"/login"}>Log in</Link>
                <Link to={"/publish"}>Publish</Link>
                <Link to={"/login/profile"}>Profile</Link>
            </nav>
            <div>
                <h1>Please hold (your horses)...</h1>
            </div>
        </div>*/

    //FOR AZURE ACTIVE DIRECTORY LOG IN
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration"
    );

    const state = randomString(50);
    window.sessionStorage.setItem("authorization_state", state);
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);

    const parameters = {
      response_type: "token",
      client_id: "1127fa8f-5af0-41b0-bd86-ee1392607b19",
      scope: "openid email profile",
      code_challenge: await sha256(code_verifier),
      code_challenge_method: "S256",
      state,
      domain_hint: "egms.no",
      redirect_uri: window.location.origin + "/login/callback",
      //response_mode: "fragment",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <div>
      <h1>Please wait....</h1>
    </div>
  );
}

function PublishPage() {
  return (
    <div className={"page-wrap"}>
      <header className={"page-header"}>Daily News</header>
      <nav className={"page-nav"}>
        <Link to={"/"}>The Daily Mail</Link>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/publish"}>Publish</Link>
        <Link to={"/login/profile"}>Profile</Link>
      </nav>
    </div>
  );
}
function LoginCallback() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    console.log(access_token);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    if (res.ok) {
      navigate("/");
    } else {
      setError(`Failed POST /api/login: ${res.status} ${res.statusText}`);
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error}</div>
      </div>
    );
  }

  return <h1>Please wait...</h1>;
}

function Profile() {
  const { loading, data, error } = useLoading(async () => {
    return await fetchJSON("/api/login");
  });

  if (loading) {
    return <div>Please wait...</div>;
  }
  if (error) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <div>
      <h1>
        Profile for {data.name} ({data.email})
      </h1>
      <div>
        <img src={data.picture} alt={"Profile picture"} />
      </div>
    </div>
  );
}
function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/publish"} element={<PublishPage />} />
        <Route path={"/login/callback"} element={<LoginCallback />} />
        <Route path={"/login/profile"} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
//ERROR HANDLING
function useLoading(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => load(), []);

  return { loading, error, data };
}

ReactDOM.render(<Application />, document.getElementById("app"));
