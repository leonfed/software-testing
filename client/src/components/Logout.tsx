import React from 'react';

export const LOGOUT_MESSAGE = 'This is a home page for simple app.';

const Logout = (props: any) => {
    const logout = () => {
        props.logoutFunction();
    };

    return (
        <div>
            <p>{LOGOUT_MESSAGE}</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
};

export default Logout;
