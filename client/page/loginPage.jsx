import React, {useEffect} from "react";
import {randomString, sha256} from "../index";
import {fetchJSON} from "../fetchJSON";

export function LoginPage() {
    /*************FOR GOOGLE LOG IN*******************/
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

    /************FOR AZURE ACTIVE DIRECTORY LOG IN********************/
    useEffect(async () => {
        const {authorization_endpoint} = await fetchJSON(
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