import { qrcode } from "@libs/qrcode";
import { J, J3x3 } from "./protocol";


/** returns line by line encoded data: first line is modules amount, then `,`-separated 3x3 bits wrapped in a pair of `[` `]`. 
 * 
 * Example:
 * ```
 * 25
 * [335,199,333,81,383,201,335,199,73]
 * [109,27,333,167,228,89,109,27,73]
 * [135,327,485,290,237,450,199,199,65]
 * [209,350,270,62,200,208,289,32,9]
 * [103,248,469,29,461,422,473,157,73]
 * [62,0,284,74,450,251,316,92,64]
 * [335,199,109,494,112,403,485,125,65]
 * [109,27,333,264,222,385,118,83,8]
 * [7,7,1,5,7,7,3,4,1]
 * ```
 * 
*/
export function toLined3x3String(q: string) {
  const j = toQrCode3x3(q);
  const result: string[] = [];
  //result.push(j.q);
  result.push(j.modules.toString());
  for (const line of j.qr3x3) {
    result.push("[" + line.join(",") + "]");
  }
  return result;
}

export function toQrCode(q: string): J {
  const a = qrcode(q, { output: "array" });
  const qr = booleanArrayToIntArray(a);
  return { q: q, qr: qr, modules: a.length };
}

export function toQrCode3x3(q: string): J3x3 {
  const a = qrcode(q, { output: "array" });
  const qr3x3 = booleanArrayToPack3x3IntArray(a);
  return { q: q, qr3x3: qr3x3, modules: a.length };
}



export function booleanArrayToIntArray(boolArray: boolean[][]): number[][] {
  // 2D array of booleans. Y is indexed first (e.g. [y][x] NOT [x][y]), [0][0] is the top left, and true means black.
  const intArray: number[][] = [];
  for (let i = 0; i < boolArray.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < boolArray[i].length; j++) {
      row.push(boolArray[i][j] ? 1 : 0);
    }
    intArray.push(row);
  }
  return intArray;
}

export function booleanArrayToPack3x3IntArray(boolArray: boolean[][]): number[][] {
  // 2D array of booleans. Y is indexed first (e.g. [y][x] NOT [x][y]), [0][0] is the top left, and true means black.
  //    +-----+-----+-----+-----+
  //    |0 0 0|1 1 0|1 0 1|0 0 1|
  //    |1 1 0|1 0 1|1 0 1|0 1 1|
  //    |0 0 0|1 1 0|1 0 1|0 0 1|
  //    +-----+-----+-----+-----+
  //    |0 0 0|1 1 0|1 0 1|0 0 1|
  //    |1 1 0|1 0 1|1 0 1|0 1 1|
  //    |0 0 0|1 1 0|1 0 1|0 0 1|
  //    +-----+-----+-----+-----+
  //   
  //    +------------+
  //    |1   2   4   |   1<<0  1<<1   1<<2
  //    |8   16  32  |   1<<3  1<<4   1<<5
  //    |64  128 256 |   1<<6  1<<7   1<<8
  //    +------------+
  //
  const intArray: number[][] = [];
  for (let y = 0; y < boolArray.length; y += 3) {
    const row: number[] = [];
    for (let x = 0; x < boolArray[y].length; x += 3) {
      let shift = 0;
      let result = 0;
      for (let y_ = 0; y_ < 3; y_++) {
        for (let x_ = 0; x_ < 3; x_++) {
          if ((y + y_) < boolArray.length && (x + x_) < boolArray[y + y_].length) {
            result += (boolArray[y + y_][x + x_] ? 1 : 0) << shift;
          }
          shift++;
        }
      }
      row.push(result);
    }
    intArray.push(row);
  }
  return intArray;
}
