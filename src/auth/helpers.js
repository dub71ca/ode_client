import cookie from 'js-cookie';

// set in cookie
export const setCookie = (key, value) => {
    if(window !== 'undifined') {
        cookie.set(key, value, {
            expires: 1
        });
    } 
}

// remove from cookie
export const removeCookie = (key) => {
    if(window !== 'undifined') {
        cookie.remove(key);
    } 
}

// get from cookie
export const getCookie = (key) => {
    if(window !== 'undifined') {
        return cookie.get(key);
    } 
}

// set in localstorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undifined') {
        localStorage.setItem(key, JSON.stringify(value));
    } 
}

// remove from localstorage
export const removeLocalStorage = (key) => {
    if(window !== 'undifined') {
        localStorage.removeItem(key);
    } 
}

// access user info from localstorage
export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false; 
            }
        }
    }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const signOut = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}


