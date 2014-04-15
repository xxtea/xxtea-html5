# XXTEA 加密算法的 HTML5 实现

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
        <script src="xxtea.js" type="text/javascript"></script>
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