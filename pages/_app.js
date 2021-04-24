import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import SPAContext from "../src/contexts/SPAContext";
import SAMLContext from "../src/contexts/SAMLContext";
import Header from "../src/frills/Header";

export default function MyApp(props) {
    const {Component, pageProps} = props;
    const [client, setClient] = useState(null);
    const [accountID, setAccountID] = useState(null);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <SAMLContext.Provider value={{client: client, setClient: setClient, accountID: accountID, setAccountID: setAccountID}}>
            <SPAContext.Provider value={process.env.NEXT_PUBLIC_SPA_CLIENT_ID}>
                <Head>
                    <title>My page</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    <Header/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </SPAContext.Provider>
        </SAMLContext.Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
