# Serverless - AWS Node.js Typescript DynamoDB

Este proyecto se generó utilizando la plantilla `aws-nodejs-typescript` del [Serverless Framework](https://www.serverless.com/).
Se crearon 3 endpoints son los siguientes:
+ METHOD GET - **https://{URL_AWS}/dev/persona/**
    > Este primer endpoint retorna una lista de personas que se guardo en DynamoDB de AWS.

+ METHOD POST - **https://{URL_AWS}/dev/persona/**
    > Este endpoint guarda un nuevo registro, con el siguiente modelo:
    ~~~
        {
            "title": "string",
            "description": "string"
        }
    ~~~
+ METHOD GET - **https://{{URL_AWS}}/dev/vehiculoSwapi/**
    > Este endpoint lista los personas con los atributos en español desde la integracion del api "https://swapi.py4e.com/api/vehicles/"

## Instrucciones de instalación/implementación

Dependiendo de su administrador de paquetes preferido, siga las instrucciones a continuación para implementar su proyecto.

### Configurar AWS CLI
 Intalar AWS a traves de este enlace <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">Instalar AWS</a>

 Cree un usuario de IAM con permisos de administrador que pueda realizar cualquier acción en su cuenta de AWS, solo a través de CLI. Después de crear dicho usuario de IAM, usaremos su clave de acceso (credenciales) para configurar la AWS CLI localmente.

 Deberá configurar los siguientes cuatro elementos en su máquina local antes de poder interactuar con cualquiera de los servicios de AWS:
1. Clave de acceso: es una combinación de una ID de clave de acceso y una clave de acceso secreta. En conjunto, se les conoce como clave de acceso. Puede generar una clave de acceso desde el servicio AWS IAM y especificar el nivel de permisos (autorización) con la ayuda de los roles de IAM.
2. Región de AWS predeterminada: especifica la región de AWS a la que desea enviar sus solicitudes de forma predeterminada.
3. Formato de salida predeterminado: especifica cómo se formatean los resultados. Puede ser un json, yaml, texto o una tabla.
4. Perfil: una colección de configuraciones se denomina perfil. El nombre del perfil predeterminado es el predeterminado; sin embargo, puede crear un perfil nuevo mediante el comando aws configure --profile new_name.

**Estos son los pasos para configurar AWS CLI en su terminal:**
`aws configure`

###

### Swaggger UI

 Se instalo el plugin **`serverless-auto-swagger`** para generar el swagger UI.
 Para acceder a la documentacion, se debe a la ruta siguiente ruta: **`https://{{URL_AWS}}/dev/swagger`**

###

### Utilizando NPM

- Ejecutar `npm i` para instalar todas las dependencias
- Ejecutar `serverless deploy --verbose` para desplegar a AWS

###


### Estructura del proyecto

La base del código del proyecto se encuentra principalmente dentro de la carpeta `src`. Esta carpeta se divide en:

- `functions` - contiene código base y configuración para sus funciones lambda
- `libs` - contiene código base compartido entre sus lambdas

```
.
├── src
│   ├── functions               
│   │   └── persona
│   │       └── handler.ts     
│   │       └── index.ts  
│   │
│   ├── libs                  
│   │   └── apiGateway.ts       
│   │   └── handlerResolver.ts  
│   │   └── lambda.ts  
│   │    
│   ├── model                  
│   │   └── index.ts       
│   │   └── request.persona.ts  
│   │   └── response.persona-es.ts 
│   │   └── response.persona.ts
│   │   └── Persona.ts
│   │
│   └── services                  
│       └── index.ts       
│       └── integration.ts  
│       └── VehiculosServices.ts 
│
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

