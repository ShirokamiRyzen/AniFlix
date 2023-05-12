import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

async function downloadAnime(
  source,
  downloadSource,
  Title,
  resolution,
  force = false,
  callback,
) {
  if (downloadSource.includes(source) && force === false) {
    Alert.alert(
      'Lanjutkan?',
      'kamu sudah mengunduh bagian ini. Masih ingin melanjutkan?',
      [
        {
          text: 'Batalkan',
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: 'Lanjutkan',
          onPress: () => {
            downloadAnime(
              source,
              downloadSource,
              Title,
              resolution,
              true,
              callback,
            );
          },
        },
      ],
    );
    return;
  }
  const sourceLength = downloadSource.filter(z => z === source).length;
  if (force === true && sourceLength > 0) {
    Title += ' (' + sourceLength + ')';
  }

  RNFetchBlob.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      path:
        '/storage/emulated/0/Download' +
        '/' +
        Title +
        ' ' +
        resolution +
        '.mp4',
      notification: true,
      mime: 'video/mp4',
      title: Title + ' ' + resolution + '.mp4',
    },
  })
    .fetch('GET', source)
    .then(resp => {
      // the path of downloaded file
      // resp.path();
    })
    .catch(() => {});
  callback?.();
}

export default downloadAnime;
