import { StyleSheet } from 'react-native';
import theme from '../../theme';

const articleStyles = StyleSheet.create({
	root: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#00000020',
		backgroundColor: theme.colors.surface,
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
