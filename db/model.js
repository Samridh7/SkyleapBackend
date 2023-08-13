const sequelize = require("sequelize");

const db = new sequelize({
    dialect: "mysql",
    database: 'heroku_8b009c0a6955c0e',
    username: 'b95cb0bc45cb1c',
    password: 'cf47b17a',
    host: 'us-cdbr-east-06.cleardb.net'
})

// mysql://b95cb0bc45cb1c:cf47b17a@us-cdbr-east-06.cleardb.net/heroku_8b009c0a6955c0e?reconnect=true

const COLID_DEF = {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
}

const COL_USERNAME_DEF = {
    type: sequelize.DataTypes.STRING(30),
    allowNull: false,
    unique: true
}

const COL_TITLE_DEF = {
    type: sequelize.DataTypes.STRING(100),
    allowNull: false
}

const Users = db.define('user', {
    id: COLID_DEF,
    name: COL_USERNAME_DEF,
    password: {
        type: sequelize.DataTypes.STRING(30),
        allowNull: false
    }
})

const Posts = db.define('post', {
    id: COLID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: sequelize.DataTypes.TEXT,
        allowNull: false
    }
})

const Comments = db.define('comment', {
    id: COLID_DEF,
    title: COL_TITLE_DEF,
    body: {
        type: sequelize.DataTypes.TEXT({length: "tiny"}),
        allowNull: false
    }
})

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

module.exports = {
    db,
    Users,
    Posts,
    Comments
}