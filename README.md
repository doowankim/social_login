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
