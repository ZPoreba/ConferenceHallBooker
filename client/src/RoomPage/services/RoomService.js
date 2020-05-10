const API_URL = process.env.REACT_APP_API_URL;


const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
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

const getReservationsById = (reservationIds) => {
    let url = `${API_URL}/api/reservations`;
    
    const fetchData = {
        method: "GET",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = reservationIds.map((element) => esc('id') + '=' + esc(element))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const createProxyUser = (userDetails) => {
    let url = `${API_URL}/api/proxy_user`;
    
    const fetchData = {
        method: "POST",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(userDetails)
    .map(k => esc(k) + '=' + esc(userDetails[k]))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const createReservation = (reservationData) => {
    let url = `${API_URL}/api/reservations`;
    
    const fetchData = {
        method: "POST",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(reservationData)
    .map(k => {
        if (Array.isArray(reservationData[k]))    
            return esc(k) + '=' + esc(JSON.stringify(reservationData[k]))
        else 
            return esc(k) + '=' + esc(reservationData[k])
    }
    )
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const editReservation = (reservationData) => {
    let url = `${API_URL}/api/reservations`;
    
    const fetchData = {
        method: "PUT",
        headers: new Headers(),
        mode: 'cors',
    };

    var esc = encodeURIComponent;
    var query = Object.keys(reservationData)
    .map(k => {
        if (Array.isArray(reservationData[k]))    
            return esc(k) + '=' + esc(JSON.stringify(reservationData[k]))
        else 
            return esc(k) + '=' + esc(reservationData[k])
    }
    )
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const getPicturesNames = (room_id) => {
    let url = `${API_URL}/api/rooms/pictures_names`;

    const roomQs = {
        id: room_id
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

export const roomService = { getRoomById, getReservationsById, createProxyUser, createReservation, getPicturesNames, editReservation };