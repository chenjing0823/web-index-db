class IndexDBDemo {
  db = null

  constructor(name, storeOptions = {}, key = null, indexOptions = {}) {
    if (!this.db) {
      this.init(name, storeOptions, key, indexOptions)
    }
    return this.db
  }

	// 初始化
  init (name, storeOptions = {}, key = null, indexOptions = {}) {
    console.log('init')
    const request = indexedDB.open(name)

    return new Promise((res, reject) => {
      request.onsuccess = () => {
        this.db = request.result
      }
  
      request.onupgradeneeded = function ({ target: { result } }) {
        this.db = result
        if (!this.db.objectStoreNames.contains(name)) {
          const req = this.db.createObjectStore(name, storeOptions)
          if (key) {
            req.createIndex(key, key, indexOptions)
          }
        }
        res()
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  add (name, data) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name], 'readwrite')
        .objectStore(name)
        .add(data)

      request.onsuccess = (event) => {
        result(event)
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  remove(name, key) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name], 'readwrite')
        .objectStore(name)
        .delete(key)

      request.onsuccess = (event) => {
        result(event)
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  update (name, data) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name], 'readwrite')
        .objectStore(name)
        .put(data)

      request.onsuccess = (event) => {
        result(event)
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }

  search (name, index) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name])
        .objectStore(name)
        .get(index)

      request.onsuccess = (event) => {
        if (request.result) {
          result(request.result)
        } else {
          console.log('no data', event)
          reject()
        }
      }

      request.onerror = (error) => {
        console.log('事务失败',error)
        reject(error)
      }
    })
  }

  searchIndex(name, key, index) {
    return new Promise((result, reject) => {
      const request = this.db.transaction([name])
        .objectStore(name)
        .index(key)
        .get(index)

      request.onsuccess = (event) => {
        if (request.result) {
          result(request.result)
        } else {
          console.log('no data', event)
          reject()
        }
      }

      request.onerror = (error) => {
        reject(error)
      }
    })
  }
}
export default {
  IndexDBDemo
}

// 使用
// this.db = new IndexDBDemo(name, { keyPath: 'id', autoIncrement: true }, 'name', { unique: false })
// this.db.add(name, obj).then().catch()
// this.db.remove(name, key).then().catch()
// this.db.update(name, obj).then().catch()
// this.db.search(name, key).then().catch()
// this.db.searchIndex(name, '索引', '索引值').then().catch()