export const CityControllerSwagger = {
  tags: ['Cities'],
  security: [{ bearerAuth: [] }],
  controllers: 'city',
  operations: {
    findAll: {
      summary: 'Fetches cities data',
      description:
        'Fetch cities paginated with the chance to filter by name and countryCode',
      responses: {
        200: {
          description: 'Success fetching cities.',
        },
        400: {
          description: 'Unauthorized Exception',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
    findById: {
      summary: 'Fetches a city by its ID',
      description: 'Fetch city by ID',
      responses: {
        200: {
          description: 'Success fetching the city.',
        },
        404: {
          description: 'City not found',
        },
      },
    },
    create: {
      summary: 'Creates a new city',
      description: 'Create city',
      responses: {
        201: {
          description: 'City created successfully.',
        },
        400: {
          description: 'Validation error',
        },
      },
    },
    update: {
      summary: 'Updates an existing city',
      description: 'Update city by ID',
      responses: {
        200: {
          description: 'City updated successfully.',
        },
        400: {
          description: 'Validation error',
        },
        404: {
          description: 'City not found',
        },
      },
    },
    delete: {
      summary: 'Deletes a city',
      description: 'Delete city by ID',
      responses: {
        200: {
          description: 'City deleted successfully.',
        },
        404: {
          description: 'City not found',
        },
      },
    },
  },
};
