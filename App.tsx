import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens'; // eslint-disable-line import/no-unresolved
import Main from './src/Main';

if (Platform.OS !== 'web') enableScreens();

export default Main;
