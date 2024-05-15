# Skillflo

![CHECK-BUILD](https://github.com/fastcampus/skillflo-web/actions/workflows/check-skillflo-build.yml/badge.svg)
![AUTH-E2E-TEST](https://github.com/fastcampus/skillflo-web/actions/workflows/skillflo-auth-e2e-test.yml/badge.svg)

## 개발 환경 설정

1. [Node.js] LTS 설치
2. [Linter] Eslint, Prettier (가까운 rc파일을 참고하도록 에디터 설정)

## 실행

1. 환경 변수 설정

```console
$ export D1_ENV=local
```

2. .npmrc 설정

[문서](https://fastcampus.atlassian.net/wiki/spaces/engineering/pages/1323761964/Github+Private+npm+Registry)를 참고하여 설정 완료 후 패키지 설치 단계로 넘어갑니다.

3. 패키지 설치

```console
$ npm ci
```

4. 개발서버 실행 (타 패키지의 경우 역시 동일)

```console
$ npm run serve
```

5. http://localhost:8082 접속

6. 빌드

```console
$ npm run build
```

7. 빌드파일 및 `node_modules` 삭제하기

```console
$ npm run clean
```

## Test

```console
npm run test:auth
```

## 주요 브랜치

- main (병합 즉시 dev 배포, pr을 통해 병합 가능)
- staging (병합 즉시 staging 배포, force push 가능)
- qa (병합 즉시 qa 배포, force push 가능)
- production (pr을 통해 병합 가능)

기능 개발시 main을 기준으로 브랜칭 합니다.

## 환경별 주소

- https://dev.skillflo.io
- https://staging.skillflo.io
- https://qa.skillflo.io
- https://skillflo.io

## 서비스 흐름

https://fastcampus.atlassian.net/wiki/spaces/engineering/pages/2418933808/skillflo

## 사용 기술

- React
- Redux
- Redux toolkit
- React Query
- Typescript
- Emotion
- Webpack
