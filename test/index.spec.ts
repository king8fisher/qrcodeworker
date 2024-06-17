// test/index.spec.ts
import { SELF } from 'cloudflare:test';
import { assert, describe, expect, it } from 'vitest';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('worker', () => {
	// it('responds with Hello World! (unit style)', async () => {
	// 	const request = new IncomingRequest('http://example.com');
	// 	// Create an empty context to pass to `worker.fetch()`.
	// 	const ctx = createExecutionContext();
	// 	const response = await worker.fetch(request, env, ctx);
	// 	// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
	// 	await waitOnExecutionContext(ctx);
	// 	expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	// });

	it('/', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(response.ok).toBe(false);
		expect(response.status).toBe(404);
	});
	
	it('/j', async () => {
		const response = await SELF.fetch('https://example.com/j');
		expect(response.ok).toBe(false);
		expect(response.status).toBe(404);
	});
	
	it('/j/:q', async () => {
		const response = await SELF.fetch('https://example.com/j/test');
		expect(response.ok).toBe(true);
		const json = await response.json();
		expect(json).not.empty;
		expect(typeof json == "object").toBe(true);
		expect(json != null && typeof json == "object" && ("q" in json)).toBe(true);
		expect(json != null && typeof json == "object" && ("qr" in json)).toBe(true);
		expect(json != null && typeof json == "object" && ("qr3x3" in json)).toBe(false);
		expect(json != null && typeof json == "object" && ("modules" in json)).toBe(true);
	});
	
	it('/j3x3/:q', async () => {
		const response = await SELF.fetch('https://example.com/j3x3/test');
		expect(response.ok).toBe(true);
		const json = await response.json();
		expect(json).not.empty;
		expect(typeof json == "object").toBe(true);
		expect(json != null && typeof json == "object" && ("q" in json)).toBe(true);
		expect(json != null && typeof json == "object" && ("qr" in json)).toBe(false);
		expect(json != null && typeof json == "object" && ("qr3x3" in json)).toBe(true);
		expect(json != null && typeof json == "object" && ("modules" in json)).toBe(true);
		if (json != null && typeof json == "object" && ("qr3x3" in json) && ("modules" in json)) {
			expect(json.modules).toBe(21)
			if (Array.isArray(json.qr3x3)) {
				expect(json.qr3x3.length).toBe(7);
				for (let y = 0; y < 7; y++) {
					if (Array.isArray(json.qr3x3[y])) {
						expect(json.qr3x3[y].length).toBe(7);
					} else {
						assert.fail('should not be here');
					}
				}
				expect(json.qr3x3[0]).toEqual([335, 199, 77, 155, 293, 391, 359]);
				expect(json.qr3x3[1]).toEqual([109, 27, 77, 372, 293, 54, 301]);
				expect(json.qr3x3[2]).toEqual([263, 391, 325, 74, 141, 263, 263]);
				expect(json.qr3x3[3]).toEqual([504, 347, 302, 320, 125, 233, 190]);
				expect(json.qr3x3[4]).toEqual([451, 452, 101, 243, 8, 421, 422]);
				expect(json.qr3x3[5]).toEqual([361, 216, 109, 115, 293, 112, 178]);
				expect(json.qr3x3[6]).toEqual([461, 451, 77, 184, 435, 121, 469]);
			} else {
				assert.fail('should not be here');
			}
		} else {
			assert.fail('should not be here');
		}
	});

	it('/t3x3/:q', async () => {
		const response = await SELF.fetch('https://example.com/t3x3/'+encodeURIComponent("https://example.com/"));
		expect(response.ok).toBe(true);
		const text = await response.text();
		console.log(text)
	});

});
