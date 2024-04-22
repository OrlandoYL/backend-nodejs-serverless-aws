import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import vehiculosService from '../../services';
export const getAllPersonas = middyfy(async () => {
    const personas = await vehiculosService.getAllPersonas();
    return formatJSONResponse({
        personas
    });
});
export const createPersona = middyfy(async (event) => {
    try {
        const id = v4();
        const requestBody = JSON.parse(event.body);
        const persona = await vehiculosService.createPersona({
            id: id,
            title: requestBody.title,
            description: requestBody.description,
            creado: new Date().toISOString(),
            estado: false
        });
        return formatJSONResponse({
            persona
        });
    }
    catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});
//# sourceMappingURL=handlers.js.map