export default async function authHeader() {
    const localStorageObject = localStorage.getItem('authToken');
    console.log(localStorageObject)
    const authToken = JSON.parse(localStorageObject);

    return authToken ? { Authorization: `Bearer: ${authToken}` } : {};
}