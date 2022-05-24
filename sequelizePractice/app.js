const express = require('express');
const path = require('path');
const morgan = require('morgan');

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');

// 라우터 불러오기
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();

app.set('port', process.env.PORT || 3000);

// ejs 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* sync 메서드를 사용하면 서버 실행 시 데이터베이스(MySQL)와 연동되도록 할 수 있다.
force: false 옵션이 되어있는데, 이를 true로 설정하면 서버 실행 시마다 테이블을 재생성한다.
테이블을 잘못 만든 경우에 true로 설정하면 된다. */
sequelize.sync({ force: false })
    .then(() => {
        console.log('******* 데이터베이스 연결됨. *******************************');
    }).catch((err) => {
        console.error(err);
    });

app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 형식 폼 요청 들어오면 파싱
app.use(express.urlencoded({ extended: false })); // uri 방식 폼 요청 들어오면 파싱

// 라우터 연결
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

// 만일 올바른 요청일 경우 라우터 자체에서 render()나 end()를 통해 끝내서 여기까지 올일이 없다.
// 하지만 올바르지 않은 요청일 결우 여기서 정보를 처리하고 에러처리 미들웨어로 보낸다.
app.use(async (req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error); // 에러 처리 미들웨어로 점프
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    // 템플릿 변수 설정
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체
    res.status(err.status || 500);
    res.render('error'); // 템플릿 엔진을 렌더링 하여 응답
});

// 서버 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});