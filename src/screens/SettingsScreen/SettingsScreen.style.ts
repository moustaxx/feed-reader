import { StyleSheet } from 'react-native';

const settingsStyles = StyleSheet.create({
	root: {
		padding: 16,
		height: '100%',
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 8,
	},
	logoutBtn: {
		marginVertical: 8,
	},
});

export default settingsStyles;
