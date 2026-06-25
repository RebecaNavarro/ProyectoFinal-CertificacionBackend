import { test } from "node:test";
import assert from "node:assert/strict";
import { errorHandler } from "../src/middlewares/errorHandler.js";

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };
}

test("errorHandler: respeta el statusCode del error", () => {
  const res = mockRes();
  errorHandler({ message: "No encontrado", statusCode: 404 }, {}, res, () => {});
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.error, "No encontrado");
});

test("errorHandler: sin statusCode responde 500", () => {
  const res = mockRes();
  errorHandler({ message: "Boom" }, {}, res, () => {});
  assert.equal(res.statusCode, 500);
});

test("errorHandler: un CastError responde 400", () => {
  const res = mockRes();
  errorHandler({ name: "CastError", path: "_id" }, {}, res, () => {});
  assert.equal(res.statusCode, 400);
});

test("errorHandler: clave duplicada (11000) responde 409", () => {
  const res = mockRes();
  errorHandler({ code: 11000, keyValue: { email: "a@a.com" } }, {}, res, () => {});
  assert.equal(res.statusCode, 409);
});