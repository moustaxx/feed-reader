import React from 'react';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';

import mainStyles from './Main.style';
import { ACCESS_TOKEN } from '../.env';

const App = () => {
	fetch('http://cloud.feedly.com/v3/collections', {
		headers: {
			Authorization: `OAuth ${ACCESS_TOKEN}`,
		},
	})
		.then(resp => resp.json())
		.then(r => console.log(r));

	return (
		<View style={mainStyles.container}>
			<Appbar.Header>
				<Appbar.BackAction />
				<Appbar.Content
					title="Title"
					subtitle="Subtitle"
				/>
				<Appbar.Action icon="search" />
				<Appbar.Action icon="more-vert" />
			</Appbar.Header>
		</View>
	);
};

export default App;
