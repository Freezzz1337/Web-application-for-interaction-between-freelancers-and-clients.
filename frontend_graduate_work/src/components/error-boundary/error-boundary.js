import React, {useEffect, useState} from 'react';
import Error from '../error';
const ErrorBoundary = ({children}) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        const handleError = () => {
            setError(true);
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (error) {
        return <Error/>;
    }

    return children;
};

export default ErrorBoundary;