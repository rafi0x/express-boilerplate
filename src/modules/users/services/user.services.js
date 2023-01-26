import { getPaginationIndex } from "../../../helpers/pagination_index.helper.js";
import {
    BadRequestException,
    NotFoundException
} from "../../../utils/exceptions/http.exception.js";


export default (repository) => {
    const findUser = async ({ query }) => {
        const value = {};
        const { q, filter } = query;
        let { page = 1, limit = 10 } = query;
        [page, limit] = [parseInt(page), parseInt(limit)];

        if (q) {
            value["$or"] = [
                { name: { $regex: `${q}`, $options: "$i" } },
                { phone: { $regex: `${q}`, $options: "$i" } },
                { email: { $regex: `${q}`, $options: "$i" } },
            ];
        }
        //, end, nextPage, prevPage
        else if (filter) {
            const { startDate, endDate } = filter;
            if (startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    throw new BadRequestException(
                        "start date should be less than end date"
                    );
                }
                value["createdAt"] = {
                    $gte: startDate,
                    $lte: endDate,
                };
            }
        }

        const { start, end } = getPaginationIndex({ page, limit });

        const data = await repository.find({ query: value, start, limit });

        if (data.length === 0) throw NotFoundException("User Not Found.");

        const total = await repository.countDocuments();

        return {
            limit,
            displayingTotal: data.length,
            total,
            nextPage: end < total ? page + 1 : false,
            prevPage: start > 0 ? page - 1 : false,
            data,
        };
    };

    // Get user specific to ID
    const findUserById = async ({ params }) => {
        if (params.id === undefined)
            throw BadRequestException("Invalid ID.");
        const data = await repository.findById({ id: params.id });
        if (!data) throw NotFoundException("User Not Found.");
        return data;
    };

    const update = async ({ params, body }) => {
        body.password ? delete body.password : null;

        if (params.id === undefined)
            throw BadRequestException("Invalid ID.");

        const data = await repository.findByIdAndUpdate({
            id: params.id,
            payload: body,
        });

        if (!data) throw NotFoundException("User Not Found.");

        return data;
    };

    // Delete
    const removeUser = async ({ params }) => {
        if (params.id === undefined)
            throw BadRequestException("Invalid ID.");

        const data = await repository.remove({ id: params.id });

        if (!data) throw NotFoundException("User Not Found.");

        return data;
    };

    return Object.freeze({
        findUser,
        findUserById,
        removeUser,
        update,
    });
};
