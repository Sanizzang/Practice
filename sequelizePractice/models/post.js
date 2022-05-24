const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW
                },
                grade: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                like_count: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                }
            },
            {
                sequelize,
                timestamps: false,
                modelName: 'Post',
                tableName: 'posts',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id' });
        // db.Post (belongTo) db.User = N:1 관계 이다.
        // foreignKey 외래키 컬럼은 writer
        // targetKey 부모키 컬럼은 id
        db.Post.belongsTo(db.Comment, { foreignKey: 'postComment', targetKey: 'id'});
        db.Post.hasMany(db.Likey_post, { foreignKey: 'postLiker', sourceKey: 'id' })
    }
};

module.exports = Comment;

