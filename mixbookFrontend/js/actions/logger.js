import { Alert } from 'react-native';
import FileSystem from 'react-native-filesystem-v1';

export const LOG_FILE_PATH = 'logs/error-log.txt';
export const LOG_LOCATION = FileSystem.storage.temporary;

// severity: 1=normal, 2=critical
export default function logError(errorText, severity) {
  async function writeToFile(txt, severityText) {
    const isAppend = true;
    var logLine = '[' + severityText + '] [' + new Date() + ']: ' + txt + '\n';
    let data = await FileSystem.writeToFile(LOG_FILE_PATH, logLine, isAppend, LOG_LOCATION)
    .catch((error) => {
      console.warn(error);
    });
    console.warn('[' + severityText + ']: ' + txt);
  };

  var severityText;
  if (severity <= 1) {
    severityText = "ERROR";
  } else if (severity > 1) {
    severityText = "CRITICAL";
    Alert.alert(
      "Critical Error",
      errorText + '\n\nTry restarting the app. For support, use the Contact Us button in account settings.',
      [

      ],
      { cancelable: false }
    );
  }

  writeToFile(errorText, severityText)
  .catch((error) => {
    console.error("error with the logger");
    console.error(error);
  });
}

