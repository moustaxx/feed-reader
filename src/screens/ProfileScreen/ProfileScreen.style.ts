import { StyleSheet } from 'react-native';

const profileScreenStyles = StyleSheet.create({
	root: {
		height: '100%',
	},
	content: {
		alignItems: 'center',
		height: '100%',
		padding: 16,
	},
	message: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		borderRadius: 180,
		margin: 16,
		maxWidth: 300,
		maxHeight: 300,
	},
	email: {
		fontSize: 32,
		marginTop: 16,
		marginBottom: 32,
	},
});

export default profileScreenStyles;
