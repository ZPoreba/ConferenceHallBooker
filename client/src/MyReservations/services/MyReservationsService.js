const API_URL = process.env.REACT_APP_API_URL;

const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const getReservationsForUser = (id) => {
    let url = `${API_URL}/api/reservations`;
    const userQs = {
        user_id: id
    };
    
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(userQs)
    .map(k => esc(k) + '=' + esc(userQs[k]))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const getRoomById = (id) => {
    let url = `${API_URL}/api/rooms`;
    const roomQs = {
        id: id
    };
    
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(roomQs)
    .map(k => esc(k) + '=' + esc(roomQs[k]))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const getRoomsByIds = (rooms) => {
    let url = `${API_URL}/api/rooms/filter`;

    const roomsQs = {
        id: rooms
    };
    
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(roomsQs)
    .map(k => esc(k) + '=' + esc(JSON.stringify(roomsQs[k])))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const deleteReservation = (id) => {
    let url = `${API_URL}/api/reservations`;
    const reservationQs = {
        id: id
    };
    
    const fetchData = {
        method: "DELETE",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(reservationQs)
    .map(k => esc(k) + '=' + esc(reservationQs[k]))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};


export const myReservationsService = { getReservationsForUser, getRoomById, getRoomsByIds, deleteReservation };