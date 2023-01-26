import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js"
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 10);

export class User extends Model {
    static associate(models) {
    }
}

User.init(
    {
        _id: DataTypes.STRING,
        first_name: DataTypes.STRING,
        user_type: {
            type: DataTypes.ENUM,
            values: ["admin", "employee", "manager"],
            defaultValue: "employee",
        },
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        dob: DataTypes.DATE,
        profile_img: DataTypes.STRING,
        designetion: {
            allowNull: true,
            type: DataTypes.STRING
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_suspended: {
            type: DataTypes.STRING,
            defaultValue: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "users",
    }
);

User.addHook('beforeValidate', (user, options) => {
    user._id = nanoid();
});