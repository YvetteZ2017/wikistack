var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {type: Sequelize.STRING, allowNull: false},
    urlTitle: {type: Sequelize.STRING, allowNull: false, get() {
        return '/wiki/'+this.getDataValue('urlTitle');
    }},
    content: {type: Sequelize.TEXT, allowNull: false},
    status: Sequelize.BOOLEAN,
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    
});

const User = db.define('user', {
    name: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false, validate: { isEmail: true}}
});

module.exports = {
    Page: Page,
    User: User,
    db: db
};