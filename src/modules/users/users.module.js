
import authServices from './services/auth.services.js';
import userService from './services/user.services.js';
import { UserRepository } from './user.repository.js';
import usersController from './users.controller.js';
import userRoutes from './user.routes.js';

const repository = new UserRepository();
const service = userService(repository);
const auth = authServices(repository);
const module = usersController(service, auth);

export default userRoutes(module);