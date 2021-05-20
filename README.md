<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## :computer: Sobre

A Aplicação consiste em uma API de Cadastro de Usuários, com implementação de Autenticação e Autorização.

Os Usuários devem ser cadastrados com as seguintes propriedades:
- Nome
- Email
- Senha
- Telefones
- Perfil (Admin ou Comum)

<p>Apenas os Usuários com Perfil Admin são autorizados para Consultar os Usuários cadastrados e Adicionar um novo Usuário (fora da rota de Sign Up).</p>
<p>Cada Usuário consegue alterar seus próprios dados ou excluir sua conta, porém só os Usuários com Perfil Admin podem acessar, editar e deletar dados de outros Usuários.</p>
---

### :dvd: **Executar o Projeto**

```bash
# Clone este repositório
$ git clone https://github.com/pedrocvm/nest_auth_api

# Acesse a pasta do projeto no terminal/cmd
$ cd nest_auth_api

# UTILIZANDO DOCKER
# Inicialize o Container
$ docker-compose up -d

# NÃO UTILIZANDO DOCKER
# Instale as Dependências
$ yarn

# Execute a Aplicação
$ yarn start:dev
```
Projeto Iniciado em 19/05/2021

### :boy: **Autor**

<div align="center">

<a href="https://github.com/pedrocvm">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60618486?s=460&u=661e1932902d4a8d7bf9c9f28038a68a4d5d0984&v=4" width="100px;" alt="Foto de Perfil Pedro Matos"/>
 <br />
 <sub><b>Pedro Matos</b></sub></a>


Feito com ❤️ por Pedro Matos 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Pedro_Matos-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pedrocvm/)](https://www.linkedin.com/in/pedrocvm/)
[![Github Badge](https://img.shields.io/badge/-pedrocvm-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/pedrocvm)](https://github.com/pedrocvm)
[![Gmail Badge](https://img.shields.io/badge/-pedrocvm3@gmail.com-FA5C5C?style=flat-square&logo=gmail&logoColor=white&link=mailto:pedrocvm3@gmail.com)](mailto:pedrocvm3@gmail.com)

</div>

---
### :page_facing_up: **Licença**

Copyright © 2021 [Pedro Matos](https://github.com/pedrocvm).<br />
Este projeto é licenciado pelo [MIT](./LICENSE).
