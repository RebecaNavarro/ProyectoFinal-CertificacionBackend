export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "SuperChero API",
    version: "1.0.0",
    description:
      "API REST para la gestión de una tienda de ropa en línea: categorías, prendas, usuarios y pedidos, con autenticación JWT y autorización por roles.",
  },
  servers: [
    { url: "http://localhost:3000", description: "Servidor de desarrollo local" },
    // Reemplaza por mi URL pública de Render cuando esté desplegada:
    { url: "https://TU-APP.onrender.com", description: "Servidor de producción (Render)" },
  ],
  tags: [
    { name: "Autenticación", description: "Registro e inicio de sesión" },
    { name: "Usuarios", description: "Gestión de usuarios (solo administradores)" },
    { name: "Categorías", description: "Gestión del catálogo de categorías" },
    { name: "Prendas", description: "Gestión del catálogo de prendas" },
    { name: "Pedidos", description: "Creación y gestión de pedidos" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token JWT obtenido en POST /api/auth/login. Formato: Bearer <token>",
      },
    },
    schemas: {
      Category: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c0d" },
          name: { type: "string", example: "Poleras" },
          description: { type: "string", example: "Prendas para la parte superior" },
          active: { type: "boolean", example: true },
        },
      },
      CategoryInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Poleras" },
          description: { type: "string", example: "Prendas para la parte superior" },
        },
      },
      Clothes: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c0e" },
          name: { type: "string", example: "Polera básica negra" },
          description: { type: "string", example: "Algodón 100%" },
          category: { $ref: "#/components/schemas/Category" },
          price: { type: "number", example: 80 },
          size: { type: "string", enum: ["XS", "S", "M", "L", "XL", "XXL"], example: "M" },
          stock: { type: "integer", example: 15 },
          color: { type: "string", example: "negro" },
          imageURL: { type: "string", example: "https://ejemplo.com/polera.jpg" },
          active: { type: "boolean", example: true },
        },
      },
      ClothesInput: {
        type: "object",
        required: ["name", "description", "category", "price", "size", "stock"],
        properties: {
          name: { type: "string", example: "Polera básica negra" },
          description: { type: "string", example: "Algodón 100%" },
          category: { type: "string", description: "Id de una categoría activa", example: "665f1a2b3c4d5e6f7a8b9c0d" },
          price: { type: "number", minimum: 0, example: 80 },
          size: { type: "string", enum: ["XS", "S", "M", "L", "XL", "XXL"], example: "M" },
          stock: { type: "integer", minimum: 0, example: 15 },
          color: { type: "string", example: "negro" },
          imageURL: { type: "string", example: "https://ejemplo.com/polera.jpg" },
        },
      },
      PaginatedClothes: {
        type: "object",
        properties: {
          data: { type: "array", items: { $ref: "#/components/schemas/Clothes" } },
          pagination: {
            type: "object",
            properties: {
              total: { type: "integer", example: 42 },
              page: { type: "integer", example: 1 },
              limit: { type: "integer", example: 10 },
              totalPages: { type: "integer", example: 5 },
            },
          },
        },
      },
      PriceConversion: {
        type: "object",
        properties: {
          clothes: { type: "string", example: "Polera básica negra" },
          baseCurrency: { type: "string", example: "BOB" },
          basePrice: { type: "number", example: 80 },
          targetCurrency: { type: "string", example: "USD" },
          rate: { type: "number", example: 0.1446 },
          convertedPrice: { type: "number", example: 11.57 },
          rateUpdatedAt: { type: "string", example: "Thu, 26 Jun 2026 00:02:31 +0000" },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c0f" },
          name: { type: "string", example: "Rebeca Navarro" },
          email: { type: "string", example: "rebeca@correo.com" },
          role: { type: "string", enum: ["admin", "cliente"], example: "cliente" },
          active: { type: "boolean", example: true },
        },
      },
      RegisterInput: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Rebeca Navarro" },
          email: { type: "string", example: "rebeca@correo.com" },
          password: { type: "string", minLength: 6, example: "123456" },
        },
      },
      UserInput: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Nuevo Admin" },
          email: { type: "string", example: "nuevoadmin@superchero.com" },
          password: { type: "string", minLength: 6, example: "123456" },
          role: { type: "string", enum: ["admin", "cliente"], example: "admin" },
        },
      },
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "admin@superchero.com" },
          password: { type: "string", example: "123456" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          user: {
            type: "object",
            properties: {
              id: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c0f" },
              name: { type: "string", example: "Admin" },
              email: { type: "string", example: "admin@superchero.com" },
              role: { type: "string", example: "admin" },
            },
          },
        },
      },
      OrderItem: {
        type: "object",
        properties: {
          clothes: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c0e" },
          name: { type: "string", example: "Polera básica negra" },
          quantity: { type: "integer", example: 2 },
          unitPrice: { type: "number", example: 80 },
        },
      },
      Order: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c10" },
          user: { type: "string", example: "665f1a2b3c4d5e6f7a8b9c0f" },
          items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
          totalPrice: { type: "number", example: 160 },
          status: {
            type: "string",
            enum: ["pendiente", "en proceso", "enviado", "entregado", "cancelado"],
            example: "pendiente",
          },
          date: { type: "string", format: "date-time" },
          active: { type: "boolean", example: true },
        },
      },
      OrderInput: {
        type: "object",
        required: ["items"],
        properties: {
          items: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["clothes", "quantity"],
              properties: {
                clothes: { type: "string", description: "Id de la prenda", example: "665f1a2b3c4d5e6f7a8b9c0e" },
                quantity: { type: "integer", minimum: 1, example: 2 },
              },
            },
          },
        },
      },
      OrderStatusInput: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: ["en proceso", "enviado", "entregado"],
            example: "en proceso",
          },
        },
      },
      Error: {
        type: "object",
        properties: { error: { type: "string", example: "Mensaje de error" } },
      },
    },
    responses: {
      Unauthorized: {
        description: "Token no proporcionado o inválido",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      Forbidden: {
        description: "No tienes permiso para realizar esta acción",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      NotFound: {
        description: "Recurso no encontrado",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      BadRequest: {
        description: "Datos inválidos",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Autenticación"],
        summary: "Registrar un usuario (siempre como cliente)",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterInput" } } },
        },
        responses: {
          201: { description: "Usuario creado", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          409: { description: "El email ya está registrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Autenticación"],
        summary: "Iniciar sesión y obtener el token JWT",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LoginInput" } } },
        },
        responses: {
          200: { description: "Sesión iniciada", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { description: "Credenciales inválidas", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          403: { description: "La cuenta está desactivada", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },

    "/api/users": {
      get: {
        tags: ["Usuarios"],
        summary: "Listar usuarios",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de usuarios", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
      post: {
        tags: ["Usuarios"],
        summary: "Crear un usuario (puede ser admin)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UserInput" } } } },
        responses: {
          201: { description: "Usuario creado", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        tags: ["Usuarios"],
        summary: "Obtener un usuario",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Usuario encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        tags: ["Usuarios"],
        summary: "Actualizar un usuario",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/UserInput" } } } },
        responses: {
          200: { description: "Usuario actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        tags: ["Usuarios"],
        summary: "Baja lógica de un usuario",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Usuario dado de baja", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },

    "/api/categories": {
      get: {
        tags: ["Categorías"],
        summary: "Listar categorías (solo activas por defecto)",
        parameters: [
          { name: "active", in: "query", schema: { type: "boolean" }, description: "Usar active=false para ver las inactivas" },
        ],
        responses: {
          200: { description: "Lista de categorías", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Category" } } } } },
        },
      },
      post: {
        tags: ["Categorías"],
        summary: "Crear una categoría",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryInput" } } } },
        responses: {
          201: { description: "Categoría creada", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          409: { description: "Ya existe una categoría con ese nombre", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/categories/{id}": {
      get: {
        tags: ["Categorías"],
        summary: "Obtener una categoría",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Categoría encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        tags: ["Categorías"],
        summary: "Actualizar una categoría",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryInput" } } } },
        responses: {
          200: { description: "Categoría actualizada", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        tags: ["Categorías"],
        summary: "Baja lógica de una categoría",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Categoría dada de baja", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },

    "/api/clothes": {
      get: {
        tags: ["Prendas"],
        summary: "Listar prendas con filtros, paginación y orden",
        parameters: [
          { name: "category", in: "query", schema: { type: "string" }, description: "Id de categoría" },
          { name: "size", in: "query", schema: { type: "string", enum: ["XS", "S", "M", "L", "XL", "XXL"] } },
          { name: "color", in: "query", schema: { type: "string" } },
          { name: "active", in: "query", schema: { type: "boolean" }, description: "active=false incluye inactivas" },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
          { name: "sortBy", in: "query", schema: { type: "string", example: "price" } },
          { name: "order", in: "query", schema: { type: "string", enum: ["asc", "desc"] } },
        ],
        responses: {
          200: { description: "Lista paginada de prendas", content: { "application/json": { schema: { $ref: "#/components/schemas/PaginatedClothes" } } } },
        },
      },
      post: {
        tags: ["Prendas"],
        summary: "Crear una prenda",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ClothesInput" } } } },
        responses: {
          201: { description: "Prenda creada", content: { "application/json": { schema: { $ref: "#/components/schemas/Clothes" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/clothes/{id}/price": {
      get: {
        tags: ["Prendas"],
        summary: "Precio de una prenda convertido a otra moneda (API externa)",
        description: "Consulta el tipo de cambio en tiempo real desde ExchangeRate-API y convierte el precio (en BOB) a la moneda indicada.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "currency", in: "query", schema: { type: "string", default: "USD" }, description: "Código ISO 4217 (USD, EUR, ARS, ...)" },
        ],
        responses: {
          200: { description: "Precio convertido", content: { "application/json": { schema: { $ref: "#/components/schemas/PriceConversion" } } } },
          400: { description: "Moneda inválida", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          404: { $ref: "#/components/responses/NotFound" },
          502: { description: "No se pudo conectar con el servicio de tipo de cambio", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/clothes/{id}": {
      get: {
        tags: ["Prendas"],
        summary: "Obtener una prenda",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Prenda encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Clothes" } } } },
          400: { $ref: "#/components/responses/BadRequest" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        tags: ["Prendas"],
        summary: "Actualizar una prenda",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/ClothesInput" } } } },
        responses: {
          200: { description: "Prenda actualizada", content: { "application/json": { schema: { $ref: "#/components/schemas/Clothes" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        tags: ["Prendas"],
        summary: "Baja lógica de una prenda",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Prenda dada de baja", content: { "application/json": { schema: { $ref: "#/components/schemas/Clothes" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },

    "/api/orders": {
      post: {
        tags: ["Pedidos"],
        summary: "Crear un pedido (valida y descuenta stock)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/OrderInput" } } } },
        responses: {
          201: { description: "Pedido creado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
          400: { description: "Stock insuficiente o datos inválidos", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
      get: {
        tags: ["Pedidos"],
        summary: "Listar todos los pedidos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de pedidos", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/orders/mine": {
      get: {
        tags: ["Pedidos"],
        summary: "Listar mis pedidos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Mis pedidos", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/orders/user/{userId}": {
      get: {
        tags: ["Pedidos"],
        summary: "Listar los pedidos de un cliente",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Pedidos del cliente", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/orders/{id}": {
      get: {
        tags: ["Pedidos"],
        summary: "Obtener un pedido (dueño o admin)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Pedido encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/orders/{id}/status": {
      patch: {
        tags: ["Pedidos"],
        summary: "Cambiar el estado de un pedido",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/OrderStatusInput" } } } },
        responses: {
          200: { description: "Estado actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
          400: { description: "Transición de estado no permitida", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/orders/{id}/cancel": {
      patch: {
        tags: ["Pedidos"],
        summary: "Cancelar un pedido (devuelve el stock)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Pedido cancelado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
          400: { description: "El pedido no se puede cancelar en su estado actual", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
  },
};
