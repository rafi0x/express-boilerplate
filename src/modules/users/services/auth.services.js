import * as argon2 from "argon2";
import moment from "moment";
import {
    BadRequestException,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
} from "../../../utils/exceptions/http.exception.js";
import { signJWT } from "../../../helpers/signJwt.helper.js"

export default (repository) => {
    //to check for duplicate emails
    const checkDuplication = async ({ email }) => {
        const user = await repository.find({ query: { email } });
        if (user.length > 0) {
            return true;
        }
        return false;
    };

    //createa new user during user signup
    const createUser = async ({ body }) => {
        // console.log(body);
        const duplicate = await checkDuplication(body);
        if (duplicate) throw ConflictException("Mail Already Exists.");

        const { password } = body;
        const hash = await argon2.hash(password); //generate hash
        body.password = hash;

        await repository.create(body);
        return true;
    };

    //authenticate user
    const authenticate = async ({ body }) => {
        const { email, password } = body;
        if (!email || !password)
            throw UnauthorizedException("Invalid Credentials");

        const user = await repository.findOne({ query: { email } });
        if (!user) throw UnauthorizedException("Invalid Email.");

        const passwordMatch = await argon2.verify(user.password, password);

        if (!passwordMatch) throw UnauthorizedException("Invalid Password.");

        const token = signJWT(
            {
                iat: moment().unix(),
                sub: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                user_type: user.user_type
            }
        );
        return token;
    };

    const resetPassword = async ({ params, body }) => {
        let { newPassword, oldPassword } = body;

        const data = await repository.findById({ id: params.id });

        if (!data) throw NotFoundException("User Not Found!!");

        const passwordMatch = await argon2.verify(data.password, oldPassword);

        if (!passwordMatch)
            throw BadRequestException("Password is incorrect.");

        data.password = await argon2.hash(newPassword);

        await repository.save(data);
        return true;
    };

    return Object.freeze({
        createUser,
        authenticate,
        resetPassword,
    });
};
