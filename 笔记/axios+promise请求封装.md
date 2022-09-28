# axios+promise封装

```js
import axios from 'axios'
const instance = axios.create({
  withCredentials: true,
})
export default class HttpUtil {
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params })
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) })
        })
    })
  }

  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, { ...params })
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) })
        })
    })
  }

  /** 创建一个new FormData()，用append()方法将数据写入formdata
  var formdata = new FormData()
  //可以通过append()方法来追加数据
  formdata.append('page', this.state.pageNumber)
  formdata.append('status', this.state.status)
  formdata.append('limit', this.state.pageSize)
*/
  //formdata格式post方法
  static post_formdata(url, formdata) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, formdata)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) })
        })
    })
  }
```

