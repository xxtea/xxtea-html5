# XXTEA 加密算法的 HTML5 实现

<a href="https://github.com/xxtea/">
    <img src="https://avatars1.githubusercontent.com/u/6683159?v=3&s=86" alt="XXTEA logo" title="XXTEA" align="right" />
</a>

[![Join the chat at https://gitter.im/xxtea/xxtea-html5](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/xxtea/xxtea-html5?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![bower version](https://img.shields.io/bower/v/xxtea.svg)](http://bower.io/search/?q=xxtea)
[![GitHub release](https://img.shields.io/github/release/xxtea/xxtea-html5.svg)](https://github.com/xxtea/xxtea-html5/releases)
[![License](https://img.shields.io/github/license/xxtea/xxtea-html5.svg)](http://opensource.org/licenses/MIT)

## 简介

XXTEA 是一个快速安全的加密算法。本项目是 XXTEA 加密算法的 HTML5 实现。

它不同于原始的 XXTEA 加密算法。它是针对 Uint8Array 类型数据进行加密的，而不是针对 uint32 数组。同样，密钥也是 Uint8Array 类型。如果你想加密字符串，你可以使用 xxtea.toBytes(str) 来将字符串转换为 Uint8Array。当你解密 Uint8Array 时，你可以使用 xxtea.toString(bytes) 来将结果转换为字符串。字符串与 Uint8Array 之间的转换，是采用 UTF8 编码的。

## 使用

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
