import {sequelize} from "./src/database/index.js";
import mountApp from "./src/index.js";
import api from './src/routes/index.routes.js';

//express app listener
(async() =>{
    try {
        await sequelize.authenticate();
        console.log(`[info] Connected to ${process.env.DB_DIALECT} database.`)
        // mount app routes
        const app = mountApp(api);
        app.listen(
            process.env.PORT || 8000,
            () => console.log(`[info] Server running on port ${process.env.PORT || 8000}`)
        );
    } catch (error) {
        console.error(`${new Date().toISOString()} [error] ${error.message}`);
    }
})();