export const ConflictException = (msg = '') => {
    const error = new Error(msg.length>0 ? msg : 'Conflict');
    error.name = 'ConflictException';
    error.status = 409;
    return error;
}

export const NotFoundException = (msg = '') => {
    const error = new Error(msg.length>0 ? msg : 'Not Found');
    error.name = 'NotFoundException';
    error.status = 404;
    return error;
}


export const BadRequestException = (msg = '') => {
    const error = new Error(msg.length>0 ? msg : 'Bad Request');
    error.name = 'BadRequestException';
    error.status = 400;
    return error;
}

export const InternalServerException = (msg = 'Internal Server Error') => {
    const error = new Error(msg);
    error.status = 500;
    return error;
};

export const UnauthorizedException = (msg = 'Unauthorized') => {
    const error = new Error(msg);
    error.status = 401;
    return error;
}
