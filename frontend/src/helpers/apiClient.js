
import axios from 'axios';

// let url = 'http://';

// if (process.env.NODE_ENV === 'production' &&
//   process.env.EASYSERVER_SSL === 'TRUE') {
//   url = 'https://';
// }

// if (process.env.EASYSERVER_HOST) {
//   url += process.env.EASYSERVER_HOST;
// } else {
//   url += 'localhost';
// }

// if (process.env.EASYSERVER_PORT && process.env.EASYSERVER_PORT !== '80') {
//   url += ':' + process.env.EASYSERVER_PORT;
// }

// axios.defaults.baseURL = url + '/';

// const auth = window.customStorage.getItem('easyui_auth');
// if (auth) {
//   const token = JSON.parse(auth).token;
//   Object.assign(axios.defaults, {
//     headers: {
//       Authorization: 'JWT ' + token
//     }
//   });
// }

export default axios;
