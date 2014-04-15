/**********************************************************\
|                                                          |
| xxtea.go                                                 |
|                                                          |
| XXTEA encryption algorithm library for Golang.           |
|                                                          |
| Encryption Algorithm Authors:                            |
|      David J. Wheeler                                    |
|      Roger M. Needham                                    |
|                                                          |
| Code Author: Ma Bingyao <mabingyao@gmail.com>            |
| LastModified: Apr 15, 2014                               |
|                                                          |
\**********************************************************/

(function (global) {
    'use strict';

    global.xxtea = global.xxtea || Object.create(null);

    var delta = 0x9E3779B9;

    function toUint8Array(v, includeLength) {
        var length = v.length;
        var n = length << 2;
        if (includeLength) {
            var m = v[length - 1];
            n -= 4;
            if ((m < n - 3) || (m > n)) {
                return null;
            }
            n = m;
        }
        var bytes = new Uint8Array(n);
        for (var i = 0; i < n; ++i) {
            bytes[i] = v[i >>> 2] >>> ((i & 3) << 3);
        }
        return bytes;
    }

    function toInt32Array(bytes, includeLength) {
        var length = bytes.length;
        var n = length >>> 2;
        if ((length & 3) !== 0) {
            ++n;
        }
        var v;
        if (includeLength) {
            v = new Int32Array(n + 1);
            v[n] = length;
        }
         else {
            v = new Int32Array(n);
        }
        for (var i = 0; i < length; ++i) {
            v[i >> 2] |= bytes[i] << ((i & 3) << 3);
        }
        return v;
    }

    function mx(sum, y, z, p, e, k) {
        return ((z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4)) ^ ((sum ^ y) + (k[p & 3 ^ e] ^ z));
    }

    function fixk(k) {
        if (k.length < 4) {
            var key = new Int32Array(4);
            key.set(k);
            k = key;
        }
        return k;
    }

    function encryptInt32Array(v, k) {
        var length = v.length;
        var n = length - 1;
        k = fixk(k);
        var y, z, sum, e, p, q;
        z = v[n];
        y = v[0];
        sum = 0;
        for (q = Math.floor(6 + 52/length) | 0; q > 0; --q) {
            sum += delta;
            e = sum >>> 2 & 3;
            for (p = 0; p < n; ++p) {
                y = v[p + 1];
                z = v[p] += mx(sum, y, z, p, e, k);
            }
            y = v[0];
            z = v[n] += mx(sum, y, z, p, e, k);
        }
        return v;
    }

    function decryptInt32Array(v, k) {
        var length = v.length;
        var n = length - 1;
        k = fixk(k);
        var y, z, sum, e, p, q;
        z = v[n];
        y = v[0];
        q = Math.floor(6 + 52/length);
        for (sum = q * delta; sum !== 0; sum -= delta) {
            e = sum >>> 2 & 3;
            for (p = n; p > 0; --p) {
                z = v[p - 1];
                y = v[p] -= mx(sum, y, z, p, e, k);
            }
            z = v[n];
            y = v[0] -= mx(sum, y, z, p, e, k);
        }
        return v;
    }

    function encrypt(data, key) {
        if (data === undefined || data === null || data.length === 0) {
            return data;
        }
        return toUint8Array(encryptInt32Array(toInt32Array(data, true), toInt32Array(key, false)), false);
    }

    function decrypt(data, key) {
        if (data === undefined || data === null || data.length === 0) {
            return data;
        }
        return toUint8Array(decryptInt32Array(toInt32Array(data, false), toInt32Array(key, false)), true);
    }

    function toBytes(str) {
        var n = str.length;
        if (n === 0) return;
        // A single code unit uses at most 3 bytes.
        // Two code units at most 4.
        var bytes = new Uint8Array(n * 3);
        var length = 0;
        for (var i = 0; i < n; i++) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit < 0x80) {
                bytes[length++] = codeUnit;
            }
            else if (codeUnit < 0x800) {
                bytes[length++] = 0xC0 | (codeUnit >> 6);
                bytes[length++] = 0x80 | (codeUnit & 0x3F);
            }
            else if (codeUnit < 0xD800 || codeUnit > 0xDfff) {
                bytes[length++] = 0xE0 | (codeUnit >> 12);
                bytes[length++] = 0x80 | ((codeUnit >> 6) & 0x3F);
                bytes[length++] = 0x80 | (codeUnit & 0x3F);
            }
            else {
                if (i + 1 < length) {
                    var nextCodeUnit = str.codeUnitAt(i + 1);
                    if (codeUnit < 0xDC00 && 0xDC00 <= nextCodeUnit && nextCodeUnit <= 0xDFFF) {
                        var rune = (((codeUnit & 0xDC00) << 10) | (nextCodeUnit & 0x03FF)) + 0x010000;
                        bytes[length++] = 0xF0 | ((rune >> 18) & 0x3F);
                        bytes[length++] = 0x80 | ((rune >> 12) & 0x3F);
                        bytes[length++] = 0x80 | ((rune >> 6) & 0x3F);
                        bytes[length++] = 0x80 | (rune & 0x3F);
                        i++;
                        continue;
                    }
                }
                throw new Error('Malformed string');
            }
        }
        return bytes.subarray(0, length);
    }

    function toString(bytes) {
        var n = bytes.length;
        var charCodes = new Uint16Array(n);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
            var unit = bytes[off++];
            switch (unit >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                charCodes[i] = unit;
                break;
            case 12:
            case 13:
                if (off < len) {
                    charCodes[i] = ((unit & 0x1F) << 6) |
                                    (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 14:
                if (off + 1 < len) {
                    charCodes[i] = ((unit & 0x0F) << 12) |
                                   ((bytes[off++] & 0x3F) << 6) |
                                   (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 15:
                if (off + 2 < len) {
                    var rune = ((unit & 0x07) << 18) |
                                ((bytes[off++] & 0x3F) << 12) |
                                ((bytes[off++] & 0x3F) << 6) |
                                (bytes[off++] & 0x3F) - 0x10000;
                    if (0 <= rune && rune <= 0xFFFFF) {
                        charCodes[i++] = (((rune >> 10) & 0x03FF) | 0xD800);
                        charCodes[i] = ((rune & 0x03FF) | 0xDC00);
                    }
                    else {
                        throw new Error('Character outside valid Unicode range: 0x' + rune.toString(16));
                    }
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            default:
                throw new Error('Bad UTF-8 encoding 0x' + unit.toString(16));
            }
        }
        if (i < n) {
            charCodes = charCodes.subarray(0, i);
        }
        return String.fromCharCode.apply(String, charCodes);
    }

    Object.defineProperty(global.xxtea, 'encrypt', {
        value: encrypt,
        writable: false,
        configurable: false,
        enumerable: false
    });
    Object.defineProperty(global.xxtea, 'decrypt', {
        value: decrypt,
        writable: false,
        configurable: false,
        enumerable: false
    });
    Object.defineProperty(global.xxtea, 'toBytes', {
        value: toBytes,
        writable: false,
        configurable: false,
        enumerable: false
    });
    Object.defineProperty(global.xxtea, 'toString', {
        value: toString,
        writable: false,
        configurable: false,
        enumerable: false
    });
})(this);