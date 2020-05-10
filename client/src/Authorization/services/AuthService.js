const API_URL = process.env.REACT_APP_API_URL;
const userKey = { key: 'user' };


const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const login = (email, password) => {
    let url = `${API_URL}/api/auth/login`;
    const loginQs = {
        email: email,
        password: password
    };

    const fetchData = {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
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

const register = (nickname, email, first_name, last_name, birth_date, password, repeatPassword) => {
    let url = `${API_URL}/api/auth/register`;
    const registerQs = {
        nickname: nickname,
        email: email,
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        password: password,
        repeatPassword: repeatPassword
    };

    const fetchData = {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    };

    var esc = encodeURIComponent;
    var query = Object.keys(registerQs)
    .map(k => esc(k) + '=' + esc(registerQs[k]))
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

export const authService = { login, logout, isAuthenticated, authenticateUser, register };