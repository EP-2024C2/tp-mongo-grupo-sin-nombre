[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/QBnwEJ5z)
# TP-Mongo 

Repositorio del TP.2, creado por el Grupo sinNombre.

## Descripción

Este proyecto implementa una API REST utilizando Node.js y Express, con dos tipos de asociaciones:

- Asociacion incrustada para la relación Productos-Componentes
- Asociacion por Referencias para la relación Productos-Fabricantes

Se utiliza MongoDB como base de datos principal.

## Estructura del Proyecto

- src/app.js: Punto de entrada de la aplicación.
- /models: Modelos Mongoose que definen la estructura de los documentos MongoDB.
- /routes: Rutas para interactuar con los recursos.
- /controllers: Lógica para manejar las solicitudes y respuestas de las rutas.
- /db: Contiene la configuración de conexión a MongoDB y Redis.
- /middlewares: Contiene los middlewares personalizados y manejo de caché con Redis.
- /schemas: Define los esquemas de validación de datos utilizando Joi.

## Rutas

Las rutas definidas en la aplicación son:

## Fabricantes

- GET /fabricantes: Obtiene todos los fabricantes.
- GET /fabricantes/:id: Obtiene un fabricante por su ID.
- POST /fabricantes: Crea un nuevo fabricante.
- DELETE /fabricantes/:id: Elimina un fabricante por su ID.
- PUT /fabricantes/:id: Actualiza un fabricante por su ID.

### Fabricantes de Productos

- GET /fabricantes/:id/productos: Obtiene los productos asociados a un fabricante por su ID.

## Productos 

- GET /productos: Obtiene todos los productos.
- GET /productos/:id: Obtiene un producto por su ID.
- POST /productos: Crea un nuevo producto.
- DELETE /productos/:id: Elimina un producto por su ID.
- PUT /productos/:id: Actualiza un producto por su ID.

### Componentes de Productos

- GET /productos/:id/componentes: Obtiene los componentes de un producto.
- GET /productos/:id/componentes/:componenteId: Obtiene un componente específico de un producto.
- POST /productos/:id/componentes: Agrega un componente a un producto.
- PUT /productos/:id/componentes/:componenteId: Actualiza un componente de un producto.
- DELETE /productos/:id/componentes/:componenteId: Elimina un componente de un producto.


### Productos de Fabricantes

- GET /productos/:id/fabricantes: Obtiene los fabricantes de un producto.
- POST /productos/:id/fabricantes: Asocia o crea un fabricante a un producto.

## Integrantes

- Martina Leguizamon Falco
- Carla Escalante
- Leandro Nahuel Rodriguez
