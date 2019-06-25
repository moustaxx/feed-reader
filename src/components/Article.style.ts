import { StyleSheet } from 'react-native';

const articleStyles = StyleSheet.create({
	root: {
		marginHorizontal: 8,
		padding: 8,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#00000020',

	},
	image: {
		width: 150,
		height: 100,
		marginVertical: 4,
		resizeMode: 'cover',
	},
	title: {
		fontWeight: 'bold',
	},
	content: {
		marginRight: 12,
		flex: 1,
		flexWrap: 'wrap',
	},
	captions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	flameIcon: {
		marginRight: 2,
	},
});

export default articleStyles;
