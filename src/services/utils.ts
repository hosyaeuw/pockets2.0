export const setAuthHeaders = (headers: Headers) => {
    const token = 123;

    if (token) {
        headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
};
