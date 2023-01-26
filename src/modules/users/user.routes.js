import express from "express";
// import { changePassword, deleteUser, getUsers, getUserWithID, listUserByDate, login, signup, updateUser } from '../modules/users.module.js';
// import { loginValidator, userValidator, validate } from '../middlewares/validator.js';
// import { updatePassValidator } from '../middlewares/validators/user.validator.js';

const router = express.Router();
export default (module) => {
    // POST: api/users/signup
    // user signup
    router.route("/signup").post(module.signup);

    // POST: api/users/login
    // user login
    router.route("/login").post(module.login);

    router.route("/").get(module.getAllUsers);

    router
        .route("/:id")
        .get(module.getUser)
        .put(module.updateUser)
        .patch(module.changePassword)
        .delete(module.deleteUser);


    // router.delete('/:id', module.deleteUser);

    return router;
};

// export default router;
