import { StyleSheet } from 'react-native';

const articleStyles = StyleSheet.create({
	root: {
		marginHorizontal: 8,
		padding: 8,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#00000020',
	},
	imageLeft: {
		width: 150,
		height: 100,
		marginVertical: 4,
		marginRight: 12,
		resizeMode: 'cover',
	},
	imageRight: {
		width: 150,
		height: 100,
		marginVertical: 4,
		marginLeft: 12,
		resizeMode: 'cover',
	},
	title: {
		fontWeight: 'bold',
	},
	content: {
		flex: 1,
		flexDirection: 'column',
	},
	captions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	flameIcon: {
		marginRight: 2,
	},
	readTextColor: {
		color: '#666',
	},
});

export default articleStyles;
