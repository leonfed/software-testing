import React from 'react';

export const HOME_MESSAGE = 'This is a home page for simple app.';

export const Home = () => {
    return (
        <div>
            <p id='home__message'>{HOME_MESSAGE}</p>
        </div>
    );
};
