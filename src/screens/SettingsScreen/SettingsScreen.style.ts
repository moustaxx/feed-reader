import { StyleSheet } from 'react-native';

const settingsStyles = StyleSheet.create({
	root: {
		height: '100%',
	},
	content: {
		padding: 16,
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
