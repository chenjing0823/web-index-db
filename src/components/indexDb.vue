<!--
 * @Author: jing.chen
 * @Date: 2020-09-21 09:55:04
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-09-21 11:28:09
 * @Description: 
-->
<template>
  <div class="indexDb">
    <!-- <button @click="createDb">创建一个数据库</button> -->
    <button @click="add">增</button>
    <button @click="remove">删</button>
    <button @click="update">改</button>
    <button @click="find">查</button>
  </div>
</template>

<script>
// 创建数据库，open方法接收两个参数 一个是数据库名字 第二个是版本号，整数，默认为1或当前版本
let request = indexedDB.open('myDatabase', 1)
let db
request.onerror = (event) => {
  console.log('数据库打开报错', event)
}

request.onsuccess = () => {
  db = request.result
  console.log('数据库打开成功', db)
}
request.onupgradeneeded = ({ target: { result } }) => {
  // changing objectStore data is done here, as opposed to a transaction enum:
  db = result
  let objStore
  // Node.contains()返回的是一个boolean，来表示传入的节点是否为该节点的后代节点。
  // 判断是否有person对象仓库 若没有则新建一个对象仓库(即新建表)
  if (!db.objectStoreNames.contains('person')) {
    /**
     * 新建person表 主键(key)是默认建立的索引，比如下面我们使用id做为主键
     * @param name: string
     * @param optionalParameters?: IDBIndexParameters
     * keyPath
     * autoIncrement
    */
    objStore = db.createObjectStore('person', { keyPath: 'id' })
    /**
     * 创建索引 用于快速检索
     * @param name: string
     * @param keyPath: string | string[]
     * @param optionalParameters?: IDBIndexParameters
    */
    objStore.createIndex('nameIndex', 'name', { unique: false })
    console.log('创建对象仓库成功')
  }
}
export default {
  name: 'indexDb',

  data () {
    return {
    }
  },
  methods: {
    add () {
      let content = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

      content.onsuccess = () => {
        console.log('数据写入成功')
      }

      content.onerror = () => {
        console.log('数据写入失败')
      }
    },
    remove () {
      const request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .delete(1)

      request.onsuccess = (event) => {
        console.log('数据删除成功', event)
      }

      request.onerror = (event) => {
        console.log('数据删除失败', event)
      }
    },
    update () {
      const request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' })

      request.onsuccess = (event) => {
        console.log('数据删除成功', event)
      }

      request.onerror = (event) => {
        console.log('数据删除失败', event)
      }
    },
    find () {
      // 新建查询事务
      const request = db.transaction(['person'])
        .objectStore('person')
        // 查询主键是1的  
        .get(1)
        // 通过索引查
        // .index('name')
        // .get('李四')
      request.onsuccess = (event) => {
        if (request.result) {
          console.log('data===', request.result)
        } else {
          console.log('未获得数据记录', event)
        }
      }
      
      request.onerror = (event) => {
        console.log('事务失败',event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
