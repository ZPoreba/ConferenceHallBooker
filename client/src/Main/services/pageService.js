const API_URL = process.env.REACT_APP_API_URL;

const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
}

const getFAQ = () => {
    const url = `${API_URL}/api/faq`;
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
    };

    return fetch(url, fetchData)
    .then(response => checkStatus(response))
    .then(response => response.json())
    .catch(error => {
        return {success: false, status: error.message}
    });
};

export const pageService = { getFAQ };