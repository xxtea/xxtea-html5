# XXTEA 加密算法的 HTML5 实现

## 简介

XXTEA 是一个快速安全的加密算法。本项目是 XXTEA 加密算法的 HTML5 实现。

它不同于原始的 XXTEA 加密算法。它是针对 Uint8Array 类型数据进行加密的，而不是针对 uint32 数组。同样，密钥也是 Uint8Array 类型。如果你想加密字符串，你可以使用 xxtea.toBytes(str) 来将字符串转换为 Uint8Array。当你解密 Uint8Array 时，你可以使用 xxtea.toString(bytes) 来将结果转换为字符串。字符串与 Uint8Array 之间的转换，是采用 UTF8 编码的。

## 安装

```sh
go get github.com/xxtea/xxtea-go/xxtea
```

## 使用

```go

package main

import (
    "fmt"
    "github.com/xxtea/xxtea-go/xxtea"
)

func main() {
    str := "Hello World! 你好，中国！"
    key := "1234567890"
    encrypt_data := xxtea.Encrypt([]byte(str), []byte(key))
    decrypt_data := string(xxtea.Decrypt(encrypt_data, []byte(key)))
    if str == decrypt_data {
        fmt.Println("success!")
    } else {
        fmt.Println("fail!")
    }
}
```