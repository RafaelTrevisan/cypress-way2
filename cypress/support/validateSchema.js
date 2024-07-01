
//importação do AJV (especifica draft 2019-09 para conseguir validar vários tipos de registros, no caso 'https')
import Ajv2019 from "ajv/dist/2019"
//All errors: Passar em todos os parametros de cada schema / verbose: informar detalhado a referência do schema
const ajv = new Ajv2019({allErrors: true, verbose: true}) 

//Função para validar schema passando um json e o corpo da resposta da requisição
export const validateSchema = (jasonSchema, body) => {
    cy.fixture(jasonSchema).then((schema) => {
        const validate = ajv.compile(schema)
        const valid = validate(body)
        if (!valid) {
            cy.log(validate.errors).then(() => {
                throw new Error ('Falha ao validar schema. Ver log acima')
            })
        }else {
            Cypress.log({
                name: 'validateSchema',
                displayName: 'schema',
                message: '${jsonSchema} validado!'
            })
        }
    })
}

