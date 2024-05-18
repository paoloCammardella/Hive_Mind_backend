import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Hive Mind API',
      version: '1.0.0',
      description: 'API for the social media "Hive Mind"',
      contact:{
        name: "Paolo Cammardella"
      }
    },
  },
  apis: ['./router/*Router.js'], // Specifica il percorso completo del file delle route
};

const specs = swaggerJSDoc(options);

export default specs;