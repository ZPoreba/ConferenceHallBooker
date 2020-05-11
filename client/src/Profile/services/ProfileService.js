const API_URL = process.env.REACT_APP_API_URL;

const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const getUserProfile = () => {
    let url = `${API_URL}/api/users`;
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user.user_id;

    const userQs = {
        id: id
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


export const profileService = { getUserProfile };