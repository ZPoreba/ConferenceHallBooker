const API_URL = process.env.REACT_APP_API_URL;
const userKey = { key: 'user' };


const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const login = (email, password) => {
    let url = `${API_URL}/auth/login`;
    const loginQs = {
        email: email,
        password: password
    };

    const fetchData = {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    var esc = encodeURIComponent;
    var query = Object.keys(loginQs)
    .map(k => esc(k) + '=' + esc(loginQs[k]))
    .join('&');

    url = url + "?" + query;

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.json())
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const logout = () => {
    localStorage.removeItem(userKey.key);
};

const isAuthenticated = () => {
    const userData = window.localStorage.getItem(userKey.key);
    return userData ? JSON.parse(userData) : null;
};

const authenticateUser = (user) => {
    window.localStorage.setItem(userKey.key, JSON.stringify(user));
};

export const authService = { login, logout, isAuthenticated, authenticateUser };