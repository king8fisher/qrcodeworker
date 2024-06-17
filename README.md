Cloudflare worker, that converts a requested text into QR Code data array,
with API for packing 3x3 modules as 9-bit numbers for low-end devices that expect a packing to reduce their CPU usage:

```
 +-----+-----+-----+-----+        +-----+-----+-----+-----+
 |0 0 0|1 1 0|1 0 1|0 0 1|        |     |     |     |     |
 |1 1 0|1 0 1|1 0 1|0 1 1|        |  24 | 235 | 365 | 308 |
 |0 0 0|1 1 0|1 0 1|0 0 1|        |     |     |     |     |
 +-----+-----+-----+-----+   ->   +-----+-----+-----+-----+
 |0 0 0|1 0 0|1 1 1|0 0 1|        |     |     |     |     |
 |0 0 0|1 0 1|1 1 1|0 0 1|        |  0  | 233 | 511 | 292 |
 |0 0 0|1 1 0|1 1 1|0 0 1|        |     |     |     |     |
 +-----+-----+-----+-----+        +-----+-----+-----+-----+
```

Bits being layed out this way:

```
 +------------+
 |1   2   4   |   1<<0  1<<1   1<<2
 |8   16  32  |   1<<3  1<<4   1<<5
 |64  128 256 |   1<<6  1<<7   1<<8
 +------------+
```

* `npm run deploy`