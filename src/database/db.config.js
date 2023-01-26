import "dotenv/config"

export default {
    development: {
        use_env_variable: 'DB_CONNECTION_URI',
        dialect: process.env.DB_DIALECT
    },
    test: {
        use_env_variable: 'DB_CONNECTION_URI',
        dialect: process.env.DB_DIALECT
    },
    production: {
        use_env_variable: 'DB_CONNECTION_URI',
        dialect: process.env.DB_DIALECT
    }
};
