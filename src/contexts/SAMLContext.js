import React from 'react';

const SAMLContext = React.createContext({
    client: null,
    setClient: (client) => {},
    accountID: null,
    setAccountID: (accountID) => {}
});

export default SAMLContext;
