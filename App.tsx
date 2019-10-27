import { Platform } from 'react-native';
import { useScreens } from 'react-native-screens'; // eslint-disable-line import/no-unresolved
import Main from './src/Main';

// eslint-disable-next-line react-hooks/rules-of-hooks
if (Platform.OS !== 'web') useScreens();

export default Main;
