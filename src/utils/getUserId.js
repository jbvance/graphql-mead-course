import jwt from 'jsonwebtoken';

const getUserId = (request) => {
    console.log("REQUEST", request.request.headers.authorization);
    const header = request.request.headers.authorization;

    if(!header) {
        throw new Error('Authentication required');
    }

    const token = header.replace('Bearer ', '');

    // This will throw an error if secret is not valid
    const decoded = jwt.verify(token, 'thisisasecret');

    return decoded.userId;
};

export { getUserId as default }