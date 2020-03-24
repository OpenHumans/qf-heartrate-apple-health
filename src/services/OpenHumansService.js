const RNFS = require('react-native-fs');
import axios from 'axios';
import {OPEN_HUMANS_BASE} from '../common/config';

const uploadData = (accessToken, heartData) => {
  // WRITE THE FILE
  const savingPath = RNFS.DocumentDirectoryPath + '/heartrate_samples.txt';

  // write the file
  RNFS.writeFile(savingPath, JSON.stringify(heartData), 'utf8')
    .then(success => {
      const uploadUrl = `${OPEN_HUMANS_BASE}api/direct-sharing/project/files/upload/direct/?access_token=${accessToken}`;

      axios({
        method: 'post',
        url: uploadUrl,
        data: {
          filename: 'heartrate-data.txt',
          metadata: JSON.stringify({
            tags: ['heartrate'],
            description: 'Heart rate data',
          }),
        },
      })
        .then(function({data}) {
          console.log(data);
          //handle success
          const readPath =
            RNFS.DocumentDirectoryPath + '/heartrate_samples.txt';
          const files = [
            {
              filename: 'heartrate_samples.txt',
              filepath: readPath,
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
                console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
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
                    console.log('COMPLETE RESP');
                    console.log(completeRes);
                  })
                  .catch(err => {
                    console.log('err', err);
                  });
              } else {
                console.log('SERVER ERROR');
              }
            })
            .catch(err => {
              if (err.description === 'cancelled') {
                // cancelled by user
              }
              console.log(err);
            });
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export {uploadData};
