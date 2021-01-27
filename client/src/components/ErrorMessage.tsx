import React from 'react';

const ErrorMessage = (props: any) => {
    return (
        <div className="ErrorBox">
           <div className="ErrorText" id='error__message'>{props.text}</div>
        </div>
    );
};

export default ErrorMessage;
