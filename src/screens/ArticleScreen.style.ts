import { StyleSheet } from 'react-native';

const articleScreenStyles = StyleSheet.create({
	image: {
		width: '100%',
		height: 300,
	},
	wrapper: {
		margin: 16,
	},
	captions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	flameIcon: {
		marginRight: 2,
	},
	goToSourceBtn: {
		marginVertical: 16,
	},
	content: {
		marginVertical: 8,
	},
});

export default articleScreenStyles;
