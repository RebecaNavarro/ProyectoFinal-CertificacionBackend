# Guía para la presentación de propuesta de proyecto

## 1. Nombre del proyecto

SuperChero - Sistema de gestión para una tienda en línea de ropa.

---

## 2. Descripción general del proyecto

El proyecto consiste en la aplicación de los conceptos aprendidos en la certificación de backend, en este caso una API REST. La idea consiste en realizar un sistema de gestión para una tienda en línea de ropa (e-commerce), en el cual se pueda gestionar usuarios, pedidos y un catálogo de prendas organizadas de manera efectiva. Lo que busca el presente proyecto es resolver la problemática de centralizar la información y automatizar procesos involucrados en la venta de ropa.

La propuesta está dirigida a administradores, los cuales podrán gestionar productos y usuarios, y supervisar los pedidos; y a clientes que podrán consultar las prendas disponibles y realizar pedidos de los productos existentes. La información a utilizar serán usuarios, prendas de ropa, categorías de ropa, pedidos y estados de compra.

---

## 3. Objetivo general

Desarrollar una API REST utilizando herramientas como Node.js, Express.js y una base de datos MongoDB, donde se administren prendas de ropa, categorías, usuarios y pedidos de una tienda en línea de ropa, para garantizar la gestión del catálogo y de los procesos de compra.

---

## 4. Usuarios o roles del sistema

* **Administrador:** Gestiona prendas de ropa, categorías y pedidos. 
* **Cliente:** Ingresa al sistema y puede buscar prendas y realizar pedidos.
* **Usuario invitado:** Únicamente ve el catálogo de prendas.

---

## 5. Historias de usuario

1. Como administrador, quiero registrar nuevas prendas de ropa con su información correspondiente, para mantener actualizado el inventario.
2. Como administrador, quiero editar la información de una prenda de ropa, para corregir o actualizar datos.
3. Como administrador, quiero eliminar prendas (lógico), para evitar que la sigan comprando sin perder su historial.
4. Como administrador, quiero poder crear y administrar categorías de prendas de ropa, para permitir la organización del catálogo.
5. Como administrador, quiero ver los pedidos realizados, para gestionar y controlar los pedidos de la tienda.
6. Como administrador, quiero cambiar el estado de los pedidos, para mantener informados a los clientes sobre el progreso de sus compras y dar seguimiento.
7. Como administrador, quiero consultar el stock de las prendas según sus características propias, para gestionar las prendas y evitar faltas.
8. Como cliente, quiero registrarme e iniciar sesión, para poder realizar pedidos.
9. Como cliente o usuario invitado, quiero consultar el catálogo de prendas de ropa, para conocer los productos disponibles y elegir qué pedir.
10. Como cliente o usuario invitado, quiero filtrar el catálogo de prendas de ropa por categoría, para encontrar más fácilmente lo que busco.
11. Como cliente, quiero realizar pedidos de prendas de ropa con caracteristicas como talla y cantidad deseadas, para comprar los productos que necesito.
12. Como cliente, quiero consultar el estado de mis pedidos, para estar informado sobre el progreso de mis compras y saber cuándo recibiré mis productos.
13. Como cliente, quiero cancelar mis pedidos, para evitar recibir productos que ya no deseo o que he cambiado de opinión.
14. Como cliente, quiero consultar el historial de mis pedidos, para revisar mis compras anteriores y repetir pedidos si lo deseo.


---

## 6. Funcionalidades principales del proyecto

| Historia de usuario                            | Funcionalidad    |
| ---------------------------------------------- | ---------------- |
| 1. Registrar prendas | Crear producto |
| 2. Editar información de una prenda | Actualizar producto |
| 3. Eliminar prendas (lógico) | Eliminar producto (lógico) |
| 4. Crear y administrar categorías de prendas de ropa | CRUD de categorías |
| 5. Ver los pedidos realizados | Listar pedidos |
| 6. Cambiar el estado de los pedidos | Actualizar estado del pedido |
| 7. Consultar el stock de las prendas según sus características propias | Consultar stock |
| 8. Registrarse e iniciar sesión | Registro e inicio de sesión |
| 9. Consultar el catálogo de prendas de ropa | Listar productos |
| 10. Filtrar el catálogo de prendas de ropa por categoría | Filtrar productos por categoría |
| 11. Realizar pedidos de prendas de ropa con características como talla y cantidad deseadas | Crear pedido |
| 12. Consultar el estado de mis pedidos | Consultar estado del pedido |
| 13. Cancelar mis pedidos | Cancelar pedido |
| 14. Consultar el historial de mis pedidos | Listar pedidos del cliente |

---

## 7. Modelo de datos inicial


### Clothes

* name
* description
* category
* price
* size
* stock
* color
* imageURL
* active (boolean)

### Category
* name
* description
* active (boolean)

### User
* name
* email
* password
* role (admin o cliente)
* active (boolean)

### Order
* user
* items (contará con la información de cada prenda, cantidad y precio)
* totalPrice
* status (pendiente, en proceso, enviado, entregado, cancelado)
* date
* active (boolean)

---

## 8. Endpoints tentativos de la API

| Método | Endpoint               | Descripción               |
| ------ | ---------------------- | ------------------------- |
| GET    | /api/clothes          | Listar prendas          |
| GET    | /api/clothes/:id      | Obtener detalles de una prenda |
| POST   | /api/clothes          | Crear nueva prenda      |
| PATCH  | /api/clothes/:id      | Actualizar prenda       |
| DELETE | /api/clothes/:id      | Eliminar prenda         |
| POST   | /api/auth/register       | Registrar nuevo usuario  |
| POST   | /api/auth/login          | Iniciar sesión           |
| GET    | /api/categories       | Listar categorías       |
| GET    | /api/categories/:id   | Obtener detalles de una categoría |
| POST   | /api/categories       | Crear nueva categoría   |
| PATCH  | /api/categories/:id   | Actualizar categoría    |
| DELETE | /api/categories/:id   | Eliminar categoría      |
| GET    | /api/orders           | Listar todos los pedidos          |
| GET    | /api/orders/:id       | Obtener detalles de un pedido |
| GET    | /api/orders/user/:userId | Listar pedidos de un cliente |
| POST   | /api/orders           | Crear nuevo pedido      |
| PATCH  | /api/orders/:id       | Actualizar estado del pedido |
| GET    | /api/users           | Listar usuarios          |
| GET    | /api/users/:id       | Obtener detalles de un usuario |
| POST   | /api/users           | Crear nuevo usuario      |
| PATCH  | /api/users/:id       | Actualizar usuario       |
| DELETE | /api/users/:id       | Eliminar usuario         |

---

## 9. Reglas de negocio

* No se puede crear una prenda sin nombre, descripción, categoría, precio, talla, y stock.
* No se puede crear un pedido sin usuario, items y totalPrice.
* El stock de una prenda no puede ser negativo.
* El precio de una prenda no puede ser negativo.
* Solo los administradores pueden crear, actualizar o eliminar prendas y categorías.
* Al crear una prenda, su estado "active" debe ser verdadero por defecto, el stock debe ser mayor o igual a 0 y el precio debe ser mayor a 0.
* Solo los clientes pueden crear pedidos.
* Los clientes deben iniciar sesión para realizar pedidos y consultar su historial de pedidos.
* Los clientes solo pueden actualizar o cancelar sus propios pedidos.
* Los clientes solo pueden crear pedidos para prendas activas y con stock disponible.
* El estado de un pedido solo puede ser "pendiente", "en proceso", "enviado", "entregado" o "cancelado".
* Un pedido solo puede ser actualizado a "enviado" o "entregado" si su estado actual es "pendiente" o "en proceso".
* Un pedido solo puede ser cancelado si su estado es "pendiente" o "en proceso".
* Un pedido no puede ser actualizado a "enviado" o "entregado" si su estado actual es "cancelado".
* Un pedido cuenta con el total del pedido calculado a partir de la suma del precio por la cantidad de cada prenda incluida en el pedido.
* Todos los borrados de prendas, categorías, usuarios y pedidos serán lógicos, es decir, se mantendrá la información en la base de datos pero con un campo "active" en falso para indicar que ya no está disponible o activo.
* El email de un usuario debe ser único en el sistema.
* Al crear un pedido, el stock disponible de cada prenda debe disminuir según la cantidad solicitada.
* Al realizar un pedido, se debe verificar que el stock disponible de cada prenda sea suficiente para cubrir la cantidad solicitada.
* No existen pedidos sin prendas, es decir, un pedido debe contener al menos una prenda para ser válido.
* Las tallas de una prenda deben ser una de las siguientes: "XS", "S", "M", "L", "XL", "XXL".
* Una prenda se asocia a una categoría activa
* Las prendas y categorías inactivas no se muestran en el catálogo para los clientes, pero sí para los administradores.
* Los usuarios con active = false no podrán iniciar sesión ni realizar operaciones dentro del sistema.

---

## 10. Tecnologías a utilizar

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT para autenticación
* dotenv para variables de entorno
* Postman para pruebas
* GitHub para control de versiones

---

## 11. Alcance del proyecto

### Incluye:

* CRUD de prendas y categorías (borrado lógico)
* Registro e inicio de sesión
* Autorización de usuarios según su rol (administrador o cliente)
* Filtrado de prendas por categoría
* Gestión de pedidos, su estado y stock de prendas
* Validación de datos
* Conexión con MongoDB Atlas

### No incluye:

* Pasarela de pagos real
* Aplicación móvil ni un frontend real, se utiliza Postman.
* Panel visual avanzado
* Envío real de correos electrónicos
* Carrito de compras persistente

---
