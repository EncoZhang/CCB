const StorageCache = {
    // 存入
    putStorage : function (bigKey, key, value) {
        var storage = storages.create(bigKey);
        storage.put(key, value);
    },

    // 获取
    getStorage : function (bigKey, key) {
        var storage = storages.create(bigKey);
        return storage.get(key);
    },

    // 移除
    removeStorage : function(bigKey, key, value){
        var storage = storages.create(bigKey);
        storage.remove(key, value);
    }
}
module.exports = StorageCache;