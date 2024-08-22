const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // res.status(statusCode).json({
    //     message: err.message,
    //     stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // });
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({ title: "Validation Error", message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({ title: "Not Found", message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title: "Unauthorized", message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
            break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({ title: "Forbidden", message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({ title: "Server Error", message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
            break;
        default:
            console.log('no error handler');
            break;
    }
}

module.exports = errorHandler;