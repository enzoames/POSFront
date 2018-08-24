import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    //return `http://${config.apiHost}:${config.apiPort + adjustedPath}`;
    return config.apiHost + path
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  //return `/api${adjustedPath}`;
  return config.apiHost + path
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, authenticated, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        // if (headers) {
        //   request.set(headers);
        // }

        // NEW
        if (typeof localStorage !== 'undefined') {
          // console.log("\n *LOCALSTORAGE APICLIENT", localStorage);
          // console.log("\n *AUTHENTICATED", authenticated);
          if(authenticated) {
            let token = localStorage.getItem('id_token') || null;
            // console.log("\n *TOKEN", token);
            if(token) {
              request.set('Authorization', `JWT ${token}`);
            }
            else {
              throw "No token saved!";
            }
          }
        }


        // if (this.token) {
        //   request.set('Authorization', `Bearer ${this.token}`);
        // }

        // if (files) {
        //   files.forEach(file => request.attach(file.key, file.value));
        // }

        // if (fields) {
        //   fields.forEach(item => request.field(item.key, item.value));
        // }

        if (data) {
          request.send(data);
        }

        // console.log("requestrequestrequest");
        // console.log(request);

        // request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
        request.end((err, { body } = {}) => {
          if (err) {
            reject(body || err);
          } 
          else if (body && typeof body.key !== 'undefined'){
            // console.log("request.end body", body);
            // console.log("request.end body.key", body.key);
            typeof localStorage !== 'undefined' ? localStorage.setItem('id_token', body.key) : '';
          }
          resolve(body);
          })
        });
    });
  }

  setJwtToken(token) {
    this.token = token;
  }
}
