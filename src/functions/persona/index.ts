
import { handlerPath } from '@libs/handler-resolver';
/**
 * @function getAllPersonas
 * @summary Obtiene la lista de personas desde DynamoDB
 * @license Orlando Netty Yarasca Lupuche: yarasca.lupuche.orlando@gmail.com
 */
export const getAllPersonas = {
    handler: `${handlerPath(__dirname)}/handler.getAllPersonas`,
    events: [
        {
            http: {
                method: 'get',
                path: 'persona/',
                cors: true
            },
        },
    ],
    layers: [{Ref:"MiddyDependeciesNodeModuleLambdaLayer"}],
};
/**
 * @function createPersona
 * @summary Crear un registro nuevo en DynamoDB
 * @license Orlando Netty Yarasca Lupuche: yarasca.lupuche.orlando@gmail.com
 */
export const createPersona = {
    handler: `${handlerPath(__dirname)}/handler.createPersona`,
    events: [
        {
            http: {
                method: 'post',
                path: 'persona',
                cors: true
            },
        },
    ],
    layers: [{Ref:"MiddyDependeciesNodeModuleLambdaLayer"}],
};
/**
 * @function getAllVehiculosSwapi
 * @summary Obtiene todos los personas del API de SWAPI
 * @license Orlando Netty Yarasca Lupuche: yarasca.lupuche.orlando@gmail.com
 */
export const getAllVehiculosSwapi = {
    handler: `${handlerPath(__dirname)}/handler.getAllVehiculosSwapi`,
    events: [
        {
            http: {
                method: 'get',
                path: 'vehiculoSwapi/',
                cors: true
            },
        },
    ],
    layers: [{Ref:"MiddyDependeciesNodeModuleLambdaLayer"}],
};