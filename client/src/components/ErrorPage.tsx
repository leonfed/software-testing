import React from 'react';

export const ERROR_PAGE_MESSAGE = 'Page Not Found';

export const ErrorPage = () => {
    return (
        <div>
            <p id='not_found_page__message'>{ERROR_PAGE_MESSAGE}</p>
        </div>
    );
};
