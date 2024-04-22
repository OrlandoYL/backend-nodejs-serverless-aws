import { handlerPath } from '@libs/handler-resolver';
export const getAllPersonas = {
    handler: `${handlerPath(__dirname)}/handler.getAllPersonas`,
    events: [
        {
            http: {
                method: 'get',
                path: 'persona/',
            },
        },
    ],
};
export const createPersona = {
    handler: `${handlerPath(__dirname)}/handler.createPersona`,
    events: [
        {
            http: {
                method: 'post',
                path: 'persona',
            },
        },
    ],
};
//# sourceMappingURL=index.js.map