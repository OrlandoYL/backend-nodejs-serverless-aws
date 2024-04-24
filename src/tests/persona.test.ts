import axios from "axios";
import PersonasService from "../services/PersonasService";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import {getAllPersonas as getAllPersons} from '../functions/persona/handler'
import { Context } from "aws-lambda";

// Creamos un mock para el servicio de personas
// const mockPersonasService = {
//   getAllPersonas: jest.fn(),
// };

// Mockeamos la implementación del servicio
// jest.mock('../services/PersonasService', () => ({
//   __esModule: true,
//   default: jest.fn(() => mockPersonasService),
// }));

describe('getVehiclesSwapi',()=>{
    test("Verify statuscode endpoint vehicles of Swapi.com", async () => {
        const API_URL_SWAPI = 'https://swapi.py4e.com/api/vehicles/';
        const res = await axios.get(`${API_URL_SWAPI}`)
        expect(res.status).toEqual(200)
      })
})

// describe('getAllPersonas', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
//   });

//   test('should return all personas', async () => {
//     // Datos ficticios de personas que se espera que devuelva el servicio
//     const mockPersonas = [{ id: 1, nombres: 'Persona 1',apellidos:'Ape 1',genero:'Masculino',fnacimiento:'02-11-1994',estado:true,creado:'' },
//      { id: 2, nombres: 'Persona 2',apellidos:'Ape 2',genero:'Femenino',fnacimiento:'07-05-1994',estado:true,creado:'' }];
    
//     // Mockear la implementación del servicio para devolver los datos ficticios
//     //mockPersonasService.getAllPersonas.mockResolvedValue(mockPersonas);

//     // Llamar a la función y obtener el resultado
//     const result = await getAllPersonas;
//     //console.log(result)
//     // Verificar que el servicio se haya llamado una vez
//     //expect(personasService.getAllPersonas).toHaveBeenCalledTimes(1);

//     // Verificar que el resultado devuelto coincida con los datos ficticios esperados
//     expect(result).toEqual<APIGatewayProxyResult>({
//       statusCode: 200,
//       body: JSON.stringify({ personas: mockPersonas }),
//     });
//   });
// });

describe('PersonasService', () => {
  // Instancia de DynamoDB DocumentClient mock
  const docClientMock = {
      scan: jest.fn().mockReturnThis(),
      promise: jest.fn(),
  };

  // Instancia de PersonasService con el mock DocumentClient
  const personasService = new PersonasService(docClientMock as unknown as DocumentClient);

  // Test para getAllPersonas
  describe('getAllPersonas', () => {
      it('should return personas from DynamoDB', async () => {
          // Datos ficticios de personas que se espera que devuelva DynamoDB
          const mockPersonas = [{ id: 1, nombres: 'Persona 1',apellidos:'Ape 1',genero:'Masculino',fnacimiento:'02-11-1994',estado:true,creado:'' },
          { id: 2, nombres: 'Persona 2',apellidos:'Ape 2',genero:'Femenino',fnacimiento:'07-05-1994',estado:true,creado:'' }];
              
          // Mockear el comportamiento de DynamoDB
          docClientMock.promise.mockResolvedValueOnce({ Items: mockPersonas });

          // Llamar a la función y obtener el resultado
          const personas = await personasService.getAllPersonas();

          const event = {
            httpMethod: 'GET', // Método HTTP (ejemplo: POST)
          body: null, // Cuerpo de la solicitud en formato JSON
          headers: {
            'Content-Type': 'application/json', // Tipo de contenido
          },} as any; 
          const context = {} as Context;
      
          // Llama a la función getAllPersons
          const result = await getAllPersons(event,context);
      
          //const rawResponse: APIGatewayProxyResult = await getAllPersons;
          //console.log(rawResponse);
          expect(result.statusCode).toBe(200);
          // Verificar que se haya llamado a scan con los parámetros correctos
          expect(docClientMock.scan).toHaveBeenCalledWith({ TableName: 'PersonasTable' });

          // Verificar que el resultado devuelto coincida con los datos ficticios esperados
          expect(personas).toEqual(mockPersonas);
          
      });
  });
});