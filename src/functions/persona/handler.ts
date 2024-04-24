import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import  middyfy from '@libs/lambda';
import { v4 } from "uuid";
import personasService from '../../services'
import { IntegrationService } from "@services/integration";
import { VehiculoRequest } from "@model/request.vehiculo";
import moment from 'moment-timezone';


export const getAllPersonas = middyfy(async (_event: APIGatewayEvent,
    _context: Context): Promise<APIGatewayProxyResult> => {
    try{
        const personas = await personasService.getAllPersonas();
        const listaPersonas = { listaPersonas:personas } ;
        return formatJSONResponse (200,listaPersonas);
    }catch(err){
        return formatJSONResponse (400,err);
    }
    
});
export const getAllVehiculosSwapi = middyfy(async (_event: APIGatewayEvent,
    _context: Context): Promise<APIGatewayProxyResult> => {
    const service = new IntegrationService();
    const vehiculoRequest: VehiculoRequest = { id:""};
    const data = await service.auth(vehiculoRequest);
    return formatJSONResponse (200,data)
});
export const createPersona= middyfy(async (_event: APIGatewayEvent,
    _context: Context): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const peruTime = moment().tz('America/Lima');
        const utcTime = peruTime.format('YYYY-MM-DD HH:mm:ss');
        let requestBody;
        if (typeof _event.body === 'string') {
            requestBody = JSON.parse(_event.body);
        } else {
            // Si event.body ya es un objeto, usarlo directamente
            requestBody = _event.body;
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
        return formatJSONResponse(201, persona);
    } catch (e) {

        return formatJSONResponse(500,e);
    }
});