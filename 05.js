const http = require('http');
const querystring = require('querystring');

class Http_Class {

    get(url){
        let hostname = new URL(url).hostname;
        const path = new URL(url).pathname;
        const options = {
            hostname: hostname,
            path: path,
            method: 'GET'
        }
        const reqGet = new Promise((resolve, reject) => {
          const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d) => {
              process.stdout.write(d)
            })
            // resolve(res.statusCode == 200)
          })
          req.on('error', (error) => {
            reject(error)
          })
          req.end()
        })
        return reqGet;
    }

    post(url, data){
      let hostname = new URL(url).hostname;
      const path = new URL(url).pathname;
      const options = {
          hostname: hostname,
          path: path,
          method: 'POST',
      }
      const reqPost = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
          res.on('data', (d) => {
            process.stdout.write(d)
          })
          resolve();
        })
        req.on('error', (error) => {
          reject(error)
        })
        req.write(querystring.stringify(data))
        req.end();
      })
      return reqPost;
    }

    put(url){
      let hostname = new URL(url).hostname;
      const path = new URL(url).pathname;
      const options = {
          hostname: hostname,
          path: path,
          method: 'PUT',
      }
      const reqPut = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
          res.on('data', (d) => {
            process.stdout.write(d)
          })
          // resolve();
        })
        req.on('error', (error) => {
          reject(error)
        })
        req.write(querystring.stringify(data))
        req.end();
      })
      return reqPut;
    }

    patch(url){
      let hostname = new URL(url).hostname;
      const path = new URL(url).pathname;
      const options = {
          hostname: hostname,
          path: path,
          method: 'PATCH',
      }
      const reqPatch = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
          res.on('data', (d) => {
            process.stdout.write(d)
          })
          // resolve();
        })
        req.on('error', (error) => {
          reject(error)
        })
        req.write(querystring.stringify(data))
        req.end();
      })
      return reqPatch;
    }

    delete(url){
      let hostname = new URL(url).hostname;
      const path = new URL(url).pathname;
      const options = {
          hostname: hostname,
          path: path,
          method: 'DELETE',
      }
      const reqDelete = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
          res.on('data', (d) => {
            process.stdout.write(d)
          })
          // resolve();
        })
        req.on('error', (error) => {
          reject(error)
        })
        req.write(querystring.stringify(data))
        req.end();
      })
      return reqDelete;
    }

    head(url){
      let hostname = new URL(url).hostname;
      const path = new URL(url).pathname;
      const options = {
          protocol: url.protocol,
          hostname: hostname,
          path: path,
          method: 'HEAD',
      }
      const reqHead = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
          resolve(res.headers);
          res.resume()
        })
        req.on('error', (error) => {
          reject(error)
        })
        req.end();
      })
      return reqHead;
    }

    option(url){
      let hostname = new URL(url).hostname;
      const path = new URL(url).pathname;
      const options = {
          hostname: hostname,
          path: path,
          method: 'OPTIONS'
      }
      const reqOption = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
          res.on('data', (d) => {
            process.stdout.write(d)
          })
          resolve(res.statusCode)
        })
        req.on('error', (error) => {
          reject(error)
        })
        req.end()
      })
      return reqOption;
    }
}

// INSTANTIATE
const Http = new Http_Class();
//GET
// Http.get('https://httpbin.org/get').then(response => console.log(response)).catch(error => console.log(error))
// POST
const data = {
  author_id: 43,
  title: 'Lorem ipsum',
  body: '<p><strong>Lorem ipsum</strong> dolor sit amet</p>',
  created_at: (new Date()).toISOString(),
  tags: ['hello', 'world'],
}

// Http.post('https://httpbin.org/post', data).then(response => console.log(response)).catch(error => console.log(error))
// PUT
// Http.put('http://httpbin.org/put', data).then(resp => console.log(resp)).catch(error => console.log(error));
// PATCH
// Http.patch('http://httpbin.org/patch', data).then(resp => console.log(resp)).catch(error => console.log(error));
// DELETE
// Http.delete('http://httpbin.org/delete', data).then(resp => console.log(resp)).catch(error => console.log(error));
// HEAD
// Http.head('http://httpbin.org/head').then(resp => console.log(resp)).catch(error => console.log(error));
// OPTION
Http.option('http://httpbin.org/anything').then(resp => console.log(resp)).catch(error => console.log(error));