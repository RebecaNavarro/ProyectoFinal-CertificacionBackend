import { test } from "node:test";
import assert from "node:assert/strict";
import { validateRegisterBody, validateLoginBody } from "../src/utils/userValidator.js";

test("validateRegisterBody: acepta un body válido", () => {
  const errors = validateRegisterBody({ name: "Ana", email: "ana@mail.com", password: "123456" });
  assert.equal(errors.length, 0);
});

test("validateRegisterBody: rechaza email sin @", () => {
  const errors = validateRegisterBody({ name: "Ana", email: "correo-malo", password: "123456" });
  assert.ok(errors.length > 0);
});

test("validateRegisterBody: rechaza contraseña corta", () => {
  const errors = validateRegisterBody({ name: "Ana", email: "ana@mail.com", password: "123" });
  assert.ok(errors.length > 0);
});

test("validateLoginBody: exige email y contraseña", () => {
  assert.ok(validateLoginBody({}).length >= 1);
  assert.equal(validateLoginBody({ email: "a@a.com", password: "x" }).length, 0);
});