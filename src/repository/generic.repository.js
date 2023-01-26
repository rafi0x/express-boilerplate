import { Op } from 'sequelize';
import { sequelize } from '../database/index.js';
export class GenericRepository {
    constructor(model) {
        this.model = model;
    }
    countDocuments = async () => {
        return await this.model.count();
    };

    find = async ({ query = {}, include, attributes, start, limit, sort = { createdAt: 'ASC' } }) => {
        // const order = Object.entries(sort).flat()
        const result = await this.model.findAll({
            where: query,
            include,
            attributes,
            offset: start,
            limit,
            // order
        });
        if(result.length) {
            return result.map(
                (item) => item.get({ plain: true })
            )
        }
        return []
    };

    findOne = async ({query = {}, include, attributes,  sort = { createdAt: 'ASC' }}) => {
        // const order = sort.Object.entries(sort).flat()
        const result = await this.model.findOne({
            where: query,
            include,
            attributes,
            // order
        });
        if(result) {
            return result.get({ plain: true })
        }
        return null
    };

    findById = async ({id, include, attributes}) => {
        const result = await this.model.findOne(
            {
                where: { _id: id },
            },
            {
            include,
            attributes
        });
        if(result) {
            return result.get({ plain: true })
        }
        return null
    };

    create = async (payload) => {
        return await this.model.create(payload);
    };

    bulkCreate = async (payloads) => {
        return await this.model.bulkCreate(payloads);
    };

    update = async ({query = {}, payload}) => {
        return await this.model.update(payload, {
            where: query,
            returning: true
        });
    };

    save = async (data) => {
        if (data.id) {
            // update
            const result = await this.model.update(data, {
                where: { id: data.id },
                returning: true
            });
            if(result.length > 1) {
                return result[1][0]
            }
            return null
        } else {
            //create
            return await this.model.create(data);
        }
    }

    findByIdAndUpdate = async ({id, payload}) => {
        const result = await this.model.update(payload, {
            where: { _id: id }
        });
        if(!result.length || result[0] !== 1) {
            console.log("🚀 ~ file: generic.repository.js:95 ~ GenericRepository ~ findByIdAndUpdate= ~ result", result)
            return null
        }
        return await this.findById({id})
    };

    remove = async ({id}) => {
        return await this.model.destroy({
            where: { id }
        });
    };

    sql = async (sql) => {
        // raw query
        return await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        });
    };
}
