const Sequelize = require('sequelize');

class Likey_post extends Sequelize.Model {
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
                modelName: 'Likey_post',
                tableName: 'likey_posts',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }
    static associate(db) {
        db.Likey_post.belongsTo(db.Post, { foreignKey: 'postLiker', targetKey: 'id' });
        // db.Likey_comment (belongTo) db.Comment = N:1 관계 이다.
        // foreignKey 외래키 컬럼은 postLiker
        // targetKey 부모키 컬럼은 id
};

module.exports = Comment;

