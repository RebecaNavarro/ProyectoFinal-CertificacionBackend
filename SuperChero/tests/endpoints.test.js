import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_SECRET = "secreto-de-prueba";

import app from "../src/app.js";
import { User } from "../src/data/user.js";

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("GET / responde 200", async () => {
  const res = await request(app).get("/");
  assert.equal(res.status, 200);
});

test("POST /api/auth/register crea un cliente y no expone la contraseña", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ name: "Ana", email: "ana@mail.com", password: "123456" });
  assert.equal(res.status, 201);
  assert.equal(res.body.role, "cliente");
  assert.equal(res.body.password, undefined);
});

test("POST /api/categories sin token responde 401", async () => {
  const res = await request(app).post("/api/categories").send({ name: "Poleras" });
  assert.equal(res.status, 401);
});

test("un admin inicia sesión y crea una categoría (201)", async () => {
  await request(app).post("/api/auth/register")
    .send({ name: "Admin", email: "admin@mail.com", password: "123456" });
  await User.updateOne({ email: "admin@mail.com" }, { role: "admin" }); // promover en la BD de prueba

  const login = await request(app).post("/api/auth/login")
    .send({ email: "admin@mail.com", password: "123456" });
  const token = login.body.token;

  const res = await request(app)
    .post("/api/categories")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Poleras", description: "Parte superior" });

  assert.equal(res.status, 201);
  assert.equal(res.body.name, "Poleras");
});

test("un cliente NO puede crear una categoría (403)", async () => {
  const login = await request(app).post("/api/auth/login")
    .send({ email: "ana@mail.com", password: "123456" });

  const res = await request(app)
    .post("/api/categories")
    .set("Authorization", `Bearer ${login.body.token}`)
    .send({ name: "Pantalones" });

  assert.equal(res.status, 403);
});