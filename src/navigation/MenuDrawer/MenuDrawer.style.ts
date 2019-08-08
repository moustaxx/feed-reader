import { StyleSheet } from 'react-native';


const menuDrawerStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroller: {
		flex: 1,
	},
	header: {
		height: 160,
		backgroundColor: '#424f8f',
		// justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	headerImg: {
		marginLeft: 4,
		width: 96,
		height: 96,
	},
	headerText: {
		color: 'white',
		fontSize: 24,
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray',
	},
	version: {
		flex: 1,
		textAlign: 'right',
		marginRight: 20,
		color: 'gray',
	},
	description: {
		flex: 1,
		marginLeft: 20,
		fontSize: 16,
	},
});

export default menuDrawerStyles;
