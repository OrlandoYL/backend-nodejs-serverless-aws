import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import personasService from '../../services'
import { IntegrationService } from "@services/integration";
import { VehiculoRequest } from "@model/request.vehiculo";
import moment from 'moment-timezone';


export const getAllPersonas = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const personas = await personasService.getAllPersonas();
    return formatJSONResponse ({
        personas
    })
});
export const getAllVehiculosSwapi = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const service = new IntegrationService();
    const vehiculoRequest: VehiculoRequest = { id:""};
    const data = await service.auth(vehiculoRequest);
    console.log(data);
    return formatJSONResponse ({    
        data
    })
});
export const createPersona= middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const peruTime = moment().tz('America/Lima');
        const utcTime = peruTime.format('YYYY-MM-DD HH:mm:ss');
        let requestBody;
        if (typeof event.body === 'string') {
            requestBody = JSON.parse(event.body);
        } else {
            // Si event.body ya es un objeto, usarlo directamente
            requestBody = event.body;
        }
        //const modelPersona = requestBody as Persona;
        const persona = await personasService.createPersona({
            id: id,
            nombres: requestBody.nombres,
            apellidos: requestBody.apellidos,
            genero:requestBody.genero,
            fnacimiento:requestBody.fnacimiento,
            creado: utcTime,
            estado: true
        })
        return formatJSONResponse({
            persona
        });
    } catch (e) {
        console.error('Error al analizar el cuerpo del evento:', e);

        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});