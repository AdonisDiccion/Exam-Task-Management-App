import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

class Task extends Model {
    public taskid!: number;
    public title!: string;
    public description!: string;
    public status!: boolean;
    public userid!: number;
}

Task.init(
    {
        taskid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'tasks',
        timestamps: true
    }
);


User.hasMany(Task, {foreignKey: 'userid'});
Task.belongsTo(User, {foreignKey: 'userid'});

export default Task;