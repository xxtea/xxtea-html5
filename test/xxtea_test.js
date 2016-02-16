describe('xxtea', function(){
  describe('#encryptToString()', function(){
    it('should return encrypt data in base64', function(){
        var str = "Hello World! 你好，中国🇨🇳！";
        var key = "1234567890";
        var encrypt_data = xxtea.encryptToString(str, key);
        assert(encrypt_data == "D4t0rVXUDl3bnWdERhqJmFIanfn/6zAxAY9jD6n9MSMQNoD8TOS4rHHcGuE=");
    })
  })
  describe('#decryptToString()', function(){
    it('should return decrypt data in string', function(){
        var str = "Hello World! 你好，中国🇨🇳！";
        var key = "1234567890";
        var encrypt_data = "D4t0rVXUDl3bnWdERhqJmFIanfn/6zAxAY9jD6n9MSMQNoD8TOS4rHHcGuE=";
        var decrypt_data = xxtea.decryptToString(encrypt_data, key);
        console.assert(str === decrypt_data);
    })
  })
})
