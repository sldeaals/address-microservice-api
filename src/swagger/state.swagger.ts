export const StateControllerSwagger = {
  tags: ['States'],
  security: [{ bearerAuth: [] }],
  controllers: 'state',
  operations: {
    findAll: {
      summary: 'Fetches states data',
      description:
        'Fetch states paginated with the chance to filter by name and countryCode',
      responses: {
        200: {
          description: 'Success fetching states.',
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
      summary: 'Fetches a state by its ID',
      description: 'Fetch state by ID',
      responses: {
        200: {
          description: 'Success fetching the state.',
        },
        404: {
          description: 'State not found',
        },
      },
    },
    create: {
      summary: 'Creates a new state',
      description: 'Create state',
      responses: {
        201: {
          description: 'State created successfully.',
        },
        400: {
          description: 'Validation error',
        },
      },
    },
    update: {
      summary: 'Updates an existing state',
      description: 'Update state by ID',
      responses: {
        200: {
          description: 'State updated successfully.',
        },
        400: {
          description: 'Validation error',
        },
        404: {
          description: 'State not found',
        },
      },
    },
    delete: {
      summary: 'Deletes a state',
      description: 'Delete state by ID',
      responses: {
        200: {
          description: 'State deleted successfully.',
        },
        404: {
          description: 'State not found',
        },
      },
    },
  },
};
