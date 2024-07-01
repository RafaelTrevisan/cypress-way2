O projeto foi utilizado o framework Cypress na versão 12.2.0
npm i cypress@12.2.0 --save-dev

Para validação do json convertando em schema para validar o corpo 
do json foi utilizado ajv JSON schema validator
npm install ajv

Para validar resultados de forma mais eficaz foi utilizado o Allure plugin
npm i -D @shelex/cypress-allure-plugin
npx add allure-commandline -D
Obs: Necessita da instalação do java
Obs²: O plugin Allure é não está compativel com as novas versões do Cypress
Utilizar a versão @12.2.0

terminal utilizado: git bash

Para realizar testes com allure
npx cypress run --env allure=true

Gerar relatório do allure
allure serve
