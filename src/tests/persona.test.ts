import { getAllPersonas } from '@functions/persona/handler';
import { Context} from "aws-lambda";
import { MockProxy, mock } from 'jest-mock-extended';


//import vehiculosService from "../services/PersonasService";

// Simula las dependencias
//jest.mock('@libs/api-gateway');
//jest.mock('../services/PersonasService');
describe('getAllPersonas handler',()=>{
    let context: MockProxy<Context>;


    beforeEach(()=>{
        context = mock<Context>();
    });
    test('should return a valid APIGatewayProxyResult', async () => {
        const result = await getAllPersonas(null,context);
        // Verifica que el resultado retornado sea válido
        expect(result).toBeDefined();
        expect(result.statusCode).toBe(200); // Suponiendo que 200 es el código de estado esperado
        expect(result.body).toBeDefined(); // Asegúrate de que el cuerpo de la respuesta esté definido
    });
})