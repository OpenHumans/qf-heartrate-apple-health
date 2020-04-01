import {acc} from 'react-native-reanimated';

const RNFS = require('react-native-fs');
import axios from 'axios';
import {FILENAME_PREFIX, OPEN_HUMANS_BASE} from '../common/config';

const writeFile = (filePath, jsonToWrite) => {
  return RNFS.writeFile(filePath, JSON.stringify(jsonToWrite), 'utf8');
};

const deleteOldFiles = accessToken => {
  const deleteUrl = `${OPEN_HUMANS_BASE}api/direct-sharing/project/files/delete/?access_token=${accessToken}`;
  return axios({
    method: 'post',
    url: deleteUrl,
    data: {
      all_files: true,
    },
  });
};

const buildCSV = jsonData => {
  const {heart_rate, resting_heart_rate} = jsonData;
  let csv = '';
  heart_rate.forEach(item => {
    const itemDate = new Date(item.startDate);
    csv += `${item.value},${itemDate.getTime()},H;`;
  });
  resting_heart_rate.forEach(item => {
    const itemDate = new Date(item.startDate);
    csv += `${item.value},${itemDate.getTime()},R;`;
  });

  return csv;
};

const putToS3 = (url, data) => {
  return axios.put(url, buildCSV(data), {
    headers: {
      'Content-Type': '',
    },
  });
};

const createUploadResource = (accessToken, filename) => {
  const uploadUrl = `${OPEN_HUMANS_BASE}api/direct-sharing/project/files/upload/direct/?access_token=${accessToken}`;
  return axios({
    method: 'post',
    url: uploadUrl,
    data: {
      filename: filename,
      metadata: JSON.stringify({
        tags: ['heartrate'],
        description: 'Heart rate data',
      }),
    },
  });
};

const closeUploadREsource = (accessToken, id) => {
  return axios({
    method: 'post',
    url:
      OPEN_HUMANS_BASE +
      'api/direct-sharing/project/files/upload/complete/?access_token=' +
      accessToken,
    data: {
      file_id: id,
    },
  });
};

const uploadData = async (accessToken, heartData) => {
  return new Promise(async (resolve, reject) => {
    // WRITE THE FILE
    const filename = `${FILENAME_PREFIX}${new Date().getTime()}.json`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
    try {
      // await writeFile(filePath, heartData);
      await deleteOldFiles(accessToken);
      const {data} = await createUploadResource(accessToken, filename);
      await putToS3(data.url, heartData);
      //      await doMultipartUpload(
      //        [
      //          {
      //            filename: filename,
      //            filepath: filePath,
      //          },
      //        ],
      //        data.url,
      //        data.id,
      //      );
      await closeUploadREsource(accessToken, data.id);
      resolve();
    } catch ({response}) {
      reject(response);
    }
  });
};

export {uploadData};
