import {Express, Response, Request} from 'express'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import {version} from '../../package.json'
import {server } from './config'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info:{
      title: 'Hive Mind API',
      version
    },
    components:{
      securitySchemas:{
        bearerAuth:{
          type: 'http',
          schema: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ]

  },
  apis: ['./src/router/*Router.ts']
}

const specs = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number){
  //Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

  //Docs in JSON format
  app.get('docs.json', (req: Request, res:Response)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.info(`Docs available at http://${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
}

export default swaggerDocs;