import React from 'react';

const Logout = (props: any) => {
    const logout = () => {
        props.logoutFunction();
    };

    return (
        <div>
            <p>Do you really want to log out?</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
};

export default Logout;
