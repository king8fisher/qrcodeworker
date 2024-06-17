import { assert, expect, test } from "vitest";
import { booleanArrayToIntArray, booleanArrayToPack3x3IntArray, toLined3x3String, toQrCode } from "./util";

test("qrcode test", () => {
  const q = "https://example.com/";
  const qr = toQrCode(q);
  console.log(JSON.stringify({ q: q, qr: qr }));
  expect(qr.modules).toBe(25);
});

test("qrcode modules", () => {
  expect(toQrCode("").modules).toBe(21);
  expect(toQrCode("a").modules).toBe(21);
  expect(toQrCode("aaaaaaaaaaaaaa").modules).toBe(21);
  expect(toQrCode("ZZZZZZZZZZZZZZZZZZZZZ").modules).toBe(25);
});

test("to lined 3x3 string", () => {
  const lines = toLined3x3String("https://example.com/")
  expect(lines.length).toBe(10)
  expect(lines[0]).toBe("25")
})


test("booleanArrayToIntArray", () => {
  assert.deepEqual(booleanArrayToIntArray([[false, false, false], [false, false, false]]), [[0, 0, 0], [0, 0, 0]]);
  assert.deepEqual(booleanArrayToIntArray([[false, false, false], [false, true, false]]), [[0, 0, 0], [0, 1, 0]]);
});


test("booleanArrayToPack3x3IntArray", () => {
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, false, false], [false, false, false], [false, false, false]]), [[0]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, false, false], [false, false, false], [false, false, false]]), [[1]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, true, false], [false, false, false], [false, false, false]]), [[2]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, true, false], [false, false, false], [false, false, false]]), [[3]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, false, false], [false, true, false], [false, false, false]]), [[16]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, false, false], [false, true, false], [false, false, true]]), [[256 + 16]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, true, false], [false, true, false], [false, false, true]]), [[2 + 256 + 16]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, true, true], [false, true, false], [false, false, true]]), [[2 + 4 + 16 + 256]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[false, true, true], [false, true, false], [false, true, true]]), [[2 + 4 + 16 + 128 + 256]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, true, true], [false, true, false], [false, true, true]]), [[1 + 2 + 4 + 16 + 128 + 256]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, true, true], [true, true, true], [true, true, true]]), [[511]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, true, true], [true, true, true]]), [[1 + 2 + 4 + 8 + 16 + 32]], "missing row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, true], [true, true]]), [[1 + 2 + 8 + 16]], "missing col&row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true, true], [true, true, true]]), [[1 + 2 + 8 + 16 + 32]], "missing col&row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true], [true, true, true]]), [[1 + 8 + 16 + 32]], "missing col&row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true], [true, true]]), [[1 + 8 + 16]], "missing col&row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true], [true]]), [[1 + 8]], "missing col&row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[true]]), [[1]], "missing col&row should be counted as 0");
  assert.deepEqual(booleanArrayToPack3x3IntArray([[]]), [[]], "completely missing col should be counted as empty array");
  assert.deepEqual(booleanArrayToPack3x3IntArray([
    [false, false, false, true, true, true],
    [false, false, false, true, true, true],
    [false, false, false, true, true, true]]), [[0, 511]]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([
    [false, false, false, true, true, true],
    [false, false, false, true, true, true],
    [false, false, false, true, true, true],
    [true, false, false, true, true, true],
    [false, false, false, true, true, true],
    [false, false, false, true, true, true]]),
    [
      [0, 511],
      [1, 511]
    ]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([
    [false, false, false, true, true, true],
    [false, false, false, true, true, true],
    [false, false, false, true, true, true],
    [true, false, false, true, true, true],
    [false, false, false, true, true, true],
  ]),
    [
      [0, 511],
      [1, 1 + 2 + 4 + 8 + 16 + 32]
    ]);
  assert.deepEqual(booleanArrayToPack3x3IntArray([
    [false, false, false, true, true],
    [false, false, false, true, true],
    [false, false, false, true, true],
    [true, false, false, true, true],
    [false, false, false, true, true],
  ]),
    [
      [0, 1 + 2 + 8 + 16 + 64 + 128],
      [1, 1 + 2 + 8 + 16]
    ]);
});