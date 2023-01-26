export default (userService, authService) => {
    // User Signup

    const signup = async (req, res, next) => {
        try {
            const data = await authService.createUser(req);
            res.status(201).json({
                message: "User Created.",
                status: "success",
                data,
            });
            next();
        } catch (error) {
            next(error);
        }
    };

    // User login
    const login = async (req, res, next) => {
        try {
            const data = await authService.authenticate(req);

            res.status(200).json({
                message: "Authentication Successful.",
                status: "success",
                data,
            });
            next();
        } catch (error) {
            next(error);
        }
    };

    // Get all users with pagination
    const getAllUsers = async (req, res, next) => {
        try {
            /*
             *pagination based on query
             *select can be used to display specific data
             */

            const data = await userService.findUser(req);
            res.status(200).json({
                message: "Displaying Results",
                status: "success",
                ...data,
            });

            next();
        } catch (error) {
            next(error); // pass error for logging
        }
    };

    // Get user specific to ID
    const getUser = async (req, res, next) => {
        try {
            const data = await userService.findUserById(req);

            res.status(200).json({
                total: data.length,
                message: "Displaying Result.",
                status: "success",
                data,
            });

            next();
        } catch (error) {
            next(error);
        }
    };

    // Update
    const updateUser = async (req, res, next) => {
        try {
            const data = await userService.update(req);
            res.status(200).json({
                message: "User Updated.",
                status: "success",
                data,
            });
            next();
        } catch (error) {
            next(error);
        }
    };

    // Chenge Password
    const changePassword = async (req, res, next) => {
        try {
            const data = await authService.resetPassword(req);
            res.status(200).json({
                message: "Password Updated.",
                status: "success",
                data,
            });
            next();
        } catch (error) {
            next(error);
        }
    };

    // Delete
    const deleteUser = async (req, res, next) => {
        try {
            const data = await userService.removeUser(req);
            res.status(200).json({
                data,
                status: "success",
                message: "User Deleted",
            });
            next();
        } catch (error) {
            next(error);
        }
    };

    return Object.freeze({
        login,
        getAllUsers,
        getUser,
        deleteUser,
        signup,
        updateUser,
        changePassword,
    });
};
