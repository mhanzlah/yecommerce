class AppError extends Error {
    constructor(message, statusCode = 500, errors = null) {
        super(message);

        this.statusCode = statusCode;
        this.success = false;

        if (errors) {
            this.errors = errors;
        }
    }
};

export default AppError;
