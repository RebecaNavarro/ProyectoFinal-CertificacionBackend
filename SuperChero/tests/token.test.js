import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET = "secreto-de-prueba";

import { generateToken, verifyToken } from "../src/utils/token.js";

test("generateToken/verifyToken: ida y vuelta del payload", () => {
  const token = generateToken({ id: "123", role: "admin" });
  const payload = verifyToken(token);
  assert.equal(payload.id, "123");
  assert.equal(payload.role, "admin");
});

test("verifyToken: lanza error con un token inválido", () => {
  assert.throws(() => verifyToken("token-falso"));
});