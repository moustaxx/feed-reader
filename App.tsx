import { Platform } from 'react-native';
import { useScreens } from 'react-native-screens'; // eslint-disable-line import/no-unresolved
import Main from './src/Main';

if (Platform.OS !== 'web') useScreens();

export default Main;
