const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                comment: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
                class: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                order: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                groupNum: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                }
            },
            {
                sequelize,
                timestamps: false,
                modelName: 'Comment',
                tableName: 'comments',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
        // db.Comment (belongTo) db.User = N:1 관계 이다.
        // foreignKey 외래키 컬럼은 commenter
        // targetKey 부모키 컬럼은 id
        db.Comment.hasMany(db.Post, { foreignKey: 'postComment', sourceKey: 'id'});
        db.Comment.hasMany(db.Likey_comment, {foreignKey: 'commentLiker', sourceKey: 'id'});
    }
};

module.exports = Comment;

