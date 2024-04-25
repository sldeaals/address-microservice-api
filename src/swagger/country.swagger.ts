export const CountryControllerSwagger = {
  tags: ['Countries'],
  security: [{ bearerAuth: [] }],
  controllers: 'country',
  operations: {
    findAll: {
      summary: 'Fetches countries data',
      description:
        'Fetch countries paginated with the chance to filter by name, cca2 and cca3',
      responses: {
        200: {
          description: 'Success fetching countries.',
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
      summary: 'Fetches a country by its ID',
      description: 'Fetch country by ID',
      responses: {
        200: {
          description: 'Success fetching the country.',
        },
        404: {
          description: 'Country not found',
        },
      },
    },
    create: {
      summary: 'Creates a new country',
      description: 'Create country',
      responses: {
        201: {
          description: 'Country created successfully.',
        },
        400: {
          description: 'Validation error',
        },
      },
    },
    update: {
      summary: 'Updates an existing country',
      description: 'Update country by ID',
      responses: {
        200: {
          description: 'Country updated successfully.',
        },
        400: {
          description: 'Validation error',
        },
        404: {
          description: 'Country not found',
        },
      },
    },
    delete: {
      summary: 'Deletes a country',
      description: 'Delete country by ID',
      responses: {
        200: {
          description: 'Country deleted successfully.',
        },
        404: {
          description: 'Country not found',
        },
      },
    },
  },
};
