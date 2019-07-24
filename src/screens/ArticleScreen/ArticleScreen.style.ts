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
		paddingVertical: 4,
	},
	content: {
		marginVertical: 8,
	},
	navHeaderRight: {
		flexDirection: 'row',
		flexGrow: 1,
		marginRight: 8,
	},
	navHeaderRightIcon: {
		marginLeft: 2,
	},
	navHeaderTitleContainerStyle: {
		marginRight: 32,
	},
});

export default articleScreenStyles;
