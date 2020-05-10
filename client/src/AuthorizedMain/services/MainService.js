const API_URL = process.env.REACT_APP_API_URL;


const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const getAllRooms = () => {
    let url = `${API_URL}/api/rooms`;
    
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: 'cors',
    };

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const filterRooms = (filterArguments) => {
    let url = `${API_URL}/api/rooms/filter`;
    
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(filterArguments)
    .map(k => esc(k) + '=' + esc(JSON.stringify(filterArguments[k])))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

export const mainService = { getAllRooms, filterRooms };