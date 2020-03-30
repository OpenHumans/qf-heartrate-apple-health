import AppleHealthKit from '@gedankenstuecke/rn-apple-healthkit';

const PERMS = AppleHealthKit.Constants.Permissions;
const healtKitInitOptions = {
  permissions: {
    read: [PERMS.HeartRate, PERMS.RestingHeartRate],
  },
};

const initHealthKit = () => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(healtKitInitOptions, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

const getHeartRateSamples = () => {
  let options = {
    unit: 'bpm', // optional; default 'bpm'
    startDate: new Date(2016, 4, 27).toISOString(), // required
    endDate: new Date().toISOString(), // optional; default now
    ascending: false, // optional; default false
    // limit: 10, // optional; default no limit
  };
  return new Promise((resolve, reject) => {
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
};


const getRestingHeartRate = () => {
  let options = {
    unit: 'bpm', // optional; default 'bpm'
    startDate: new Date(2016, 4, 27).toISOString(), // required
    endDate: new Date().toISOString(), // optional; default now
    ascending: false, // optional; default false
    // limit: 10, // optional; default no limit
  };
  return new Promise((resolve, reject) => {
    AppleHealthKit.getRestingHeartRate(options, (err, results) => {
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
};

export {initHealthKit, getHeartRateSamples, getRestingHeartRate};
