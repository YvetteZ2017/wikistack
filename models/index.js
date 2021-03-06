var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {type: Sequelize.STRING, allowNull: false},
    urlTitle: {type: Sequelize.STRING},//, allowNull: false},
    content: {type: Sequelize.TEXT, allowNull: false},
    status: Sequelize.BOOLEAN,
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    route: {type: Sequelize.STRING, get() {
        return '/wiki/'+ this.getDataValue('urlTitle');
    }}
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


  Page.hook('beforeValidate', (page, options) => {
    
    if (page.title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
        page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
  });

  Page.belongsTo(User, {
      as: 'author'
  });

//   User.findOrCreate