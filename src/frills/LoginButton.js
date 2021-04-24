import theme from "../theme";

import dynamic from "next/dynamic";
import {useContext, useEffect, useState} from "react";
import SPAContext from "../contexts/SPAContext";
import SAMLContext from "../contexts/SAMLContext";
import Author from "../icons/Author";

const MicrosoftLogin = dynamic(() => import("react-microsoft-login"), {ssr: false});
const graph = require('@microsoft/microsoft-graph-client');

export default function LoginButton(props) {
    const spaClientID = useContext(SPAContext);
    const {setClient, setAccountID, accountID} = useContext(SAMLContext);

    const [buttonTheme, setButtonTheme] = useState("light");

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > theme.breakpoints.values.md && buttonTheme !== "light") {
                // console.log("expand!", buttonTheme)
                setButtonTheme("light");
            } else if (window.innerWidth < theme.breakpoints.values.md && buttonTheme !== "light_short") {
                // console.log("shrink!", buttonTheme)
                setButtonTheme("light_short")
            }
        }

        window?.addEventListener('resize', handleResize)

        return _ => {
            window?.removeEventListener('resize', handleResize)
        }
    }, [buttonTheme]);

    if (accountID) return <Author accountId={accountID}/>

    return (
        <MicrosoftLogin
            buttonTheme={buttonTheme} tenantUrl={"https://login.microsoftonline.com/uwrf.onmicrosoft.com"} style={{float: "right"}} clientId={spaClientID}
            authCallback={async (err, data) => {
                if (err) console.log(err, data);
                const client = graph.Client.init({
                    authProvider: (done) => {
                        done(null, data.accessToken);
                    }
                })
                setClient(client);
                setAccountID((await client.api('/me').get()).id);
            }}/>
    )
}
