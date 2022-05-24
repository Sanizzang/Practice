const Sequelize = require('sequelize');
class User extends Sequelize.Model {
    // 스태틱 메소드
    // 테이블에 대한 설정
    static init(sequelize) {
        return super.init(
            { // 첫번째 객체 인수는 테이블 필드에 대한 설정
                nick_name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                student_num: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                    unique: true,
                },
                department: {
                    type: Sequelize.STRING(20),
                    allowNull: true,
                },
                phone_number: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                degree: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                project_content: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                tech_stack_content: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                objectives_content: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                github_url: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                notion_url: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                blog_url: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            { // 두번째 객체 인수는 테이블 자체에 대한 설정
                sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
                timestamps: false, /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */
                underscored: false, /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */
                modelName: 'User', /* 모델 이름을 설정. */
                tableName: 'users', /* 데이터베이스의 테이블 이름. */
                paranoid: false, /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */
                charset: 'utf8', /* 인코딩 */
                collate: 'utf8_general_ci'
            }
        );
    }
    // 다른 모델과의 관계
    static associate(db) { // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
        // db.User (hasMany) db.Comment = 1:N 관계 이다.
        // foreignKey 외래키 컬럼은 commenter
        // sourceKey 내 키(부모키) 컬럼은 id
    }
};
module.exports = User;

