<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This is a project that implements the Prisma ORM to query a simple database (the database is described in the DB section).

## Installation

1. Clone the repository:

```
git clone https://github.com/Johan-FF/Enterprise-Project-Rest-API---Nest-js.git
cd Enterprise-Project-Rest-API---Nest-js
```

2. Install the required dependencies:

```
npm install
```

## DB

[![modelo.png](https://i.postimg.cc/4xW5Ssm4/modelo.png)](https://postimg.cc/dhTr7M2g)

For the database script see prisma/migrations/20240213152623_init/migration.sql or prisma/schema.prisma.

In general the tables have this structure:

```
type Enterprise = {
  enterpriseId: number;
  name: string;
  createdAt: Date;
  updateAt: Date;
}

type Project = {
  projectId: number;
  description: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updateAt: Date;
  state: string;
  enterpriseId: number;
}

type User = {
  userId: number;
  username: string;
  password: string;
  profesionalHeadline: string;
  createdAt: Date;
  updateAt: Date;
  projectId: number;
  enterpriseId: number;
}

type UserProject = {
  userProjectId: number;
  projectId: number;
  userId: number;
}
```

The UserProject table has a zero or many relationship with the Project and User tables; the User and Project tables have a zero or many relationship with the Enterprise table.

## API

| METHOD |            URI             |                                                     BODY                                                     |                         DESCRIPTION                          |
| :----: | :------------------------: | :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------: |
|  GET   |        /enterprise         |                                                                                                              |              Returns a list of type Enterprise.              |
|  GET   |      /enterprise/:id       |                                                                                                              |              Returns a data of type Enterprise.              |
|  POST  |        /enterprise         |                                              { name: string; }                                               | Creates and returns the complete Enterprise type structure.  |
|  PUT   |      /enterprise/:id       |                                              { name: string; }                                               | Updates and returns the complete Enterprise type structure.  |
| DELETE |      /enterprise/:id       |                                                                                                              | Removes and returns the complete Enterprise type structure.  |
|  GET   |          /project          |                                                                                                              |               Returns a list of type Project.                |
|  GET   |        /project/:id        |                                                                                                              |               Returns a data of type Project.                |
|  POST  |          /project          |                 { description: string; name: string; state: string; enterpriseId: number; }                  |   Creates and returns the complete Project type structure.   |
|  PUT   |        /project/:id        |                 { description: string; name: string; state: string; enterpriseId: number; }                  |   Updates and returns the complete Project type structure.   |
|  PUT   |     /project/start/:id     |                                                      {}                                                      |      Updates the value of the Project startDate field.       |
|  PUT   |      /project/end/:id      |                                                      {}                                                      |       Updates the value of the Project endDate field.        |
| DELETE |        /project/:id        |                                                                                                              |   Removes and returns the complete Project type structure.   |
|  GET   |           /user            |                                                                                                              |                 Returns a list of type User.                 |
|  GET   |         /user/:id          |                                                                                                              |                 Returns a data of type User.                 |
|  POST  |           /user            | { username: string; password: string; profesionalHeadline: string; projectId: number; enterpriseId: number;} |    Creates and returns the complete User type structure.     |
|  PUT   |         /user/:id          | { username: string; password: string; profesionalHeadline: string; projectId: number; enterpriseId: number;} |    Updates and returns the complete User type structure.     |
| DELETE |         /user/:id          |                                                                                                              |    Removes and returns the complete User type structure.     |
|  GET   |       /user-project        |                                                                                                              |             Returns a list of type UserProject.              |
|  GET   |     /user-project/:id      |                                                                                                              |             Returns a data of type UserProject.              |
|  GET   | /user-project/projects/:id |                                                                                                              |       Returns a list of records that have the User ID.       |
|  GET   |  /user-project/users/:id   |                                                                                                              |     Returns a list of records that have the Project ID.      |
| DELETE |     /user-project/:id      |                                                                                                              | Removes and returns the complete UserProject type structure. |

## Running the app

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
