const Sequelize = require('sequelize');

class Likey_comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                liked_ip: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                is_like: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: 'Likey_comment',
                tableName: 'likey_comments',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }
    static associate(db) {
        db.Likey_comment.belongsTo(db.Comment, { foreignKey: 'commentLiker', targetKey: 'id' });
        // db.Likey_comment (belongTo) db.Comment = N:1 관계 이다.
        // foreignKey 외래키 컬럼은 commentLiker
        // targetKey 부모키 컬럼은 id
    }
};

module.exports = Comment;

