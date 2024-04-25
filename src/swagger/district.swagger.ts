export const DistrictControllerSwagger = {
  tags: ['Districts'],
  security: [{ bearerAuth: [] }],
  controllers: 'district',
  operations: {
    findAll: {
      summary: 'Fetches districts data',
      description:
        'Fetch districts paginated with the chance to filter by name, countryCode and postalCode',
      responses: {
        200: {
          description: 'Success fetching districts.',
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
      summary: 'Fetches a district by its ID',
      description: 'Fetch district by ID',
      responses: {
        200: {
          description: 'Success fetching the district.',
        },
        404: {
          description: 'District not found',
        },
      },
    },
    create: {
      summary: 'Creates a new district',
      description: 'Create district',
      responses: {
        201: {
          description: 'District created successfully.',
        },
        400: {
          description: 'Validation error',
        },
      },
    },
    update: {
      summary: 'Updates an existing district',
      description: 'Update district by ID',
      responses: {
        200: {
          description: 'District updated successfully.',
        },
        400: {
          description: 'Validation error',
        },
        404: {
          description: 'District not found',
        },
      },
    },
    delete: {
      summary: 'Deletes a district',
      description: 'Delete district by ID',
      responses: {
        200: {
          description: 'District deleted successfully.',
        },
        404: {
          description: 'District not found',
        },
      },
    },
  },
};
