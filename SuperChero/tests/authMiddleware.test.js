import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET = "secreto-de-prueba";

import { authenticate, authorize } from "../src/middlewares/authMiddleware.js";
import { generateToken } from "../src/utils/token.js";

test("authenticate: sin token, llama next con error 401", () => {
  const req = { headers: {} };
  let err;
  authenticate(req, {}, (e) => { err = e; });
  assert.equal(err.statusCode, 401);
});

test("authenticate: con token válido, asigna req.user y continúa sin error", () => {
  const token = generateToken({ id: "1", role: "cliente" });
  const req = { headers: { authorization: `Bearer ${token}` } };
  let limpio = false;
  authenticate(req, {}, (e) => { limpio = e === undefined; });
  assert.equal(req.user.role, "cliente");
  assert.ok(limpio);
});

test("authorize: rol no permitido, error 403", () => {
  const req = { user: { role: "cliente" } };
  let err;
  authorize("admin")(req, {}, (e) => { err = e; });
  assert.equal(err.statusCode, 403);
});

test("authorize: rol permitido, continúa sin error", () => {
  const req = { user: { role: "admin" } };
  let limpio = false;
  authorize("admin")(req, {}, (e) => { limpio = e === undefined; });
  assert.ok(limpio);
});