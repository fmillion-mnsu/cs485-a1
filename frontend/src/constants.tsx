// set the API URL based on environment variable with default of localhost
export const API_URL = (
    (
        process.env.NODE_ENV === 'production' ? 
        window.env.REACT_APP_API_URL : 
        process.env.REACT_APP_API_URL
    ) 
    || ""
).replace(/\/$/, '');
