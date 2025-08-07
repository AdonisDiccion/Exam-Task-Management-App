import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {
    public userid!: number;
    public username!: string;
    public password!: string;
}

User.init(
    {
        userid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true
    }
)

export default User;