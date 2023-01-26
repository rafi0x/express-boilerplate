import { User } from "./user.model.js";
import { GenericRepository } from "../../repository/generic.repository.js";

export class UserRepository extends GenericRepository {
    constructor() {
        super(User);
    }
}