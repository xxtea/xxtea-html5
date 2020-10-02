# XXTEA for HTML5

<a href="https://github.com/xxtea/">
    <img src="https://avatars1.githubusercontent.com/u/6683159?v=3&s=86" alt="XXTEA logo" title="XXTEA" align="right" />
</a>


[![Build Status](https://travis-ci.org/xxtea/xxtea-html5.svg?branch=master)](https://travis-ci.org/xxtea/xxtea-html5)
[![Join the chat at https://gitter.im/xxtea/xxtea-html5](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/xxtea/xxtea-html5?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![bower version](https://img.shields.io/bower/v/xxtea-html5.svg)](http://bower.io/search/?q=xxtea-html5)
[![GitHub release](https://img.shields.io/github/release/xxtea/xxtea-html5.svg)](https://github.com/xxtea/xxtea-html5/releases)
[![License](https://img.shields.io/github/license/xxtea/xxtea-html5.svg)](http://opensource.org/licenses/MIT)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/xxtea-html5.svg)](https://saucelabs.com/u/xxtea-html5)

## Introduction

XXTEA is a fast and secure encryption algorithm. This is a XXTEA library for HTML5.

It is different from the original XXTEA encryption algorithm. It encrypts and decrypts Uint8Array instead of uint32[], and the key is also Uint8Array. If you want to encrypt String, you can use xxtea.toBytes(str) to convert String to Uint8Array, when you decrypt Uint8Array, you can use xxtea.toString(bytes) to convert the result to String. Conversion between string and Uint8Array is using UTF8 encoding.

## Usage

```html
<!DOCTYPE html>
<html>
    <head>
        <title>XXTEA test</title>
        <meta charset="UTF-8">
        <script src="dist/xxtea.min.js" type="text/javascript"></script>
    </head>
    <body>
        <script type="text/javascript">
            var str = "Hello World! 你好，中国！";
            var key = "1234567890";
            var encrypt_data = xxtea.encrypt(xxtea.toBytes(str), xxtea.toBytes(key));
            console.log((btoa(String.fromCharCode.apply(String, encrypt_data))));
            var decrypt_data = xxtea.toString(xxtea.decrypt(encrypt_data, xxtea.toBytes(key)));
            console.assert(str === decrypt_data);
        </script>
    </body>
</html>
```

## ChangeLog

1.1.0 update

* Fixed Emoji encode & decode bug.
* Improved Long String encrypt and decrypt.
* Added `encryptToString` and `decryptToString`, for example:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>XXTEA test</title>
        <meta charset="UTF-8">
        <script src="dist/xxtea.min.js" type="text/javascript"></script>
    </head>
    <body>
        <script type="text/javascript">
            var str = "Hello World! 你好，中国🇨🇳！";
            var key = "1234567890";
            var encrypt_data = xxtea.encryptToString(str, key);
            console.log(encrypt_data);
            var decrypt_data = xxtea.decryptToString(encrypt_data, key);
            console.assert(str === decrypt_data);
        </script>
    </body>
</html>
```
