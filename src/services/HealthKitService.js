import AppleHealthKit from 'rn-apple-healthkit';
const RNFS = require('react-native-fs');

const PERMS = AppleHealthKit.Constants.Permissions;
const healtKitInitOptions = {
  permissions: {
    read: [PERMS.HeartRate],
  },
};

const initHealthKit = () => {
  const promise = new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(healtKitInitOptions, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

  return promise;
};

const getHeartRateSamples = () => {
  let options = {
    unit: 'bpm', // optional; default 'bpm'
    startDate: new Date(2016, 4, 27).toISOString(), // required
    endDate: new Date().toISOString(), // optional; default now
    ascending: false, // optional; default false
    limit: 10, // optional; default no limit
  };
  const promise = new Promise((resolve, reject) => {
    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
        reject(err);
      }
      console.log(results);
      const hd = results.map(result => {
        const {value, startDate} = result;
        return {
          value,
          startDate,
        };
      });

      resolve(hd);
    });
  });

  return promise;
};

export {initHealthKit, getHeartRateSamples};
