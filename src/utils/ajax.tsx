import axios from "axios";

export const axiosGet = (url, params={}, headers={}) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(url, {
          params,
          headers
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject("system error");
    }
  });
};

export const axiosPost = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, params, {
          headers: {},
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject("system error");
    }
  });
};

export const axiosDelete = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(url, {
          headers: {},
          data: params,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject("system error");
    }
  });
};
