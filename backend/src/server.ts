import app from "./app";
import { connectDB, sequelize } from "./config/db";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();