const BASE_URL = 'http://localhost:3001';

const apiUserService = {};

 apiUserService.register = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
 }

apiUserService.login = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

apiUserService.profile = async () => {
    try {
        const response = await fetch(`${BASE_URL}/me`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        return data;
        
    } catch (err) {
        console.log(err);
    }
}

apiUserService.logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
export default apiUserService;
