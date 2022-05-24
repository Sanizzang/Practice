//index.js: DB를 정의하고, 모델과 테이블을 연결

const Sequelize = require("sequelize");

const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';

const config = require("../config/config.json")[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;


// 모델과 테이블 종합적인 설정이 설정된다.
User.init(sequelize);
Comment.init(sequelize);

// db객체 안에 있는 모델들 간의 관계가 설정된다.
User.associate(db);
Comment.associate(db);

module.exports = db;