const RNFS = require('react-native-fs');
import axios from 'axios';
import {OPEN_HUMANS_BASE} from '../common/config';

const uploadData = (accessToken, heartData) => {
  const promise = new Promise((resolve, reject) => {
    // WRITE THE FILE
    const filename = `heartrate_samples_${new Date().getTime()}.txt`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

    // write the file
    RNFS.writeFile(filePath, JSON.stringify(heartData), 'utf8')
      .then(success => {
        const uploadUrl = `${OPEN_HUMANS_BASE}api/direct-sharing/project/files/upload/direct/?access_token=${accessToken}`;

        axios({
          method: 'post',
          url: uploadUrl,
          data: {
            filename: filename,
            metadata: JSON.stringify({
              tags: ['heartrate'],
              description: 'Heart rate data',
            }),
          },
        })
          .then(function({data}) {
            console.log(data);
            //handle success
            const files = [
              {
                filename: filename,
                filepath: filePath,
              },
            ];

            var uploadBegin = response => {
              var jobId = response.jobId;
              console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
            };

            var uploadProgress = response => {
              var percentage = Math.floor(
                (response.totalBytesSent / response.totalBytesExpectedToSend) *
                  100,
              );
              console.log('UPLOAD IS ' + percentage + '% DONE!');
            };

            // upload files
            RNFS.uploadFiles({
              toUrl: data.url,
              binaryStreamOnly: true,
              files: files,
              headers: {
                'Content-Type': '',
              },
              method: 'PUT',
              fields: {
                file_id: data.id,
              },
              begin: uploadBegin,
              progress: uploadProgress,
            })
              .promise.then(response => {
                if (response.statusCode == 200) {
                  axios({
                    method: 'post',
                    url:
                      OPEN_HUMANS_BASE +
                      'api/direct-sharing/project/files/upload/complete/?access_token=' +
                      accessToken,
                    data: {
                      file_id: data.id,
                    },
                  })
                    .then(completeRes => {
                      resolve();
                    })
                    .catch(err => {
                      reject(err);
                    });
                } else {
                  reject('SERVER_ERROR');
                }
              })
              .catch(err => {
                if (err.description === 'cancelled') {
                  // cancelled by user
                  reject('cancelled');
                }
                console.log(err);
                reject(err);
              });
          })
          .catch(response => {
            //handle error
            console.log(response);
            reject(response);
          });
      })
      .catch(err => {
        console.log(err.message);
        reject(err.message);
      });
  });

  return promise;
};

export {uploadData};
