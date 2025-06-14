import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Climafy Weather API",
      version: "1.0.0",
      description:
        "A RESTful API providing weather forecasts, severe weather alerts, and user-specific notifications using OpenWeatherMap data.",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/*.ts", // All route files for endpoint annotations
    "./src/models/*.ts", // Possible for model schema documentation if needed
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
