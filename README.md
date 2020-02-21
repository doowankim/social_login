# 소셜 로그인 제작

## Tool
* Language & Framework : Node.js, Express.js
* Database : MongoDB

## 의도
* 쇼핑몰 제작의 로그인 기능을 바탕으로 대중적인 facebook, google 로그인을 제작해보기 위함

## 기획

### 1. 서버 구상
* google과 facebook의 Client ID, ClientSecret을 .env로 저장한 후, google의 accessToken, facebook의 accessToken을 각각 받아와서
REST api 테스트

#### API Verb
- [x] 회원가입
- [x] 소셜로그인

### 써드파티 패키지

| 모듈                                                                                        | 역할                                                                                                                                                                         | 사용한 부분        |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [passport](https://github.com/wonism/TIL/tree/master/back-end/nodejs/passport-example) | OAuth 인증을 간편하게 해주는 Node JS 미들웨어                                                                                                                                                                                                                                                     
| [passport-facebook-token](https://github.com/drudge/passport-facebook-token)                                                | OAuth 2.0 API를 사용하여 Facebook 액세스 토큰으로 인증  
| [passport-google-plus-token](https://github.com/ghaiklor/passport-google-plus-token)                                                | OAuth 2.0 API를 사용하여 Google Plus 액세스 토큰으로 인증                                                                                                                           
| [passport-jwt](https://github.com/motdotla/dotenv)                                                | passport를 인증하기 위한 jsonwebtoken                  
| [mongoose](https://github.com/velopert/mongoose_tutorial)                                                | RESTful API 구현을 위함 
| [joi](https://github.com/hapijs/joi)                                                | 데이터 유효성 검사기 
| [gravatar](https://github.com/emerleite/node-gravatar)                                                | Node.js를 기반으로 Gravatar에 URL을 생성 
| [validator](https://github.com/validatorjs/validator.js?files=1)                                                | 환경변수 로드  
| [dotenv](https://github.com/motdotla/dotenv)                                                | 문자열 검사 라이브러리  
| [bcriptjs](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)                | Node.js 암호화 모듈                                                                                                                        | -                  |
| [express](https://github.com/expressjs/express)                                             | Node.js 웹 애플리케이션 프레임워크                                                                                                                                           | -                  |
| [morgan](https://github.com/expressjs/morgan)                                               | node.js 용 HTTP 요청 로거 미들웨어                                                                                                                                                                                                                                                                            | -                  |
| [body-parser](https://github.com/expressjs/body-parser)                            | Node.js 본문 구문 분석 미들웨어                                                                                                                                                | -                  |

### devDependencies

| 모듈                                                                                                                      | 역할                                                                        | 사용한 부분 |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| [nodemon](https://github.com/remy/nodemon)                                                                                | node.js 응용 프로그램의 변경 사항을 모니터링하고 서버를 자동으로 다시 시작   | -           |
