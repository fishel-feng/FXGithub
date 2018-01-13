import {AsyncStorage} from "react-native";
import GitHubTrending from 'GitHubTrending';

export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};
export default class DataRepository {
  constructor(flag) {
    this.flag = flag;
    if (flag === FLAG_STORAGE.flag_trending) {
      this.trending = new GitHubTrending();
    }
  }

  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalRepository(url).then(result => {
        if (result) {
          resolve(result);
        } else {
          this.fetchNetRepository(url).then(result => {
            resolve(result);
          }).catch(error => {
            reject(error);
          });
        }
      }).catch(error => {
        this.fetchNetRepository(url).then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      if (this.flag === FLAG_STORAGE.flag_trending) {
        this.trending.fetchTrending(url).then(result => {
          if (!result) {
            reject(new Error('null response'));
            return;
          }
          this.saveRepository(url, result);
          resolve(result);
        });
      } else {
        fetch(url).then(response => response.json()).catch(error => {
          reject(error);
        }).then(result => {
          if (!result || !result.items) {
            reject(new Error('null response'));
            return;
          }
          resolve(result.items);
          this.saveRepository(url, result.items);
        }).done();
      }
    });
  }

  saveRepository(url, items, callBack) {
    if (!url || !items) {
      return;
    }
    let wrapData = {items: items, update_date: new Date().getTime()};
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
  }

  checkData(longTime) {
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime);
    if (cDate.getMonth() !== tDate.getMonth()) {
      return false;
    }
    if (cDate.getDay() !== tDate.getDay()) {
      return false;
    }
    return cDate.getHours() - tDate.getHours() <= 4;

  }
}