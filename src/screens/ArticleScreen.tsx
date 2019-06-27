import React from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Title, Paragraph, Caption, Button } from 'react-native-paper';
import { useNavigationParam } from 'react-navigation-hooks';
import { MaterialIcons } from '@expo/vector-icons';

import articleScreenStyles from './ArticleScreen.style';
import mockedArticles from '../data';


const ArticleScreen = () => {
	const itemId = useNavigationParam('itemId');
	const { title, content, imageHref } = mockedArticles[itemId];

	const goToSource = () => console.log('Go to source');

	return (
		<ScrollView>
			<Image style={articleScreenStyles.image} source={{ uri: imageHref }} />
			<View style={articleScreenStyles.wrapper}>
				<Title>{ title }</Title>
				<View style={articleScreenStyles.captions}>
					<MaterialIcons
						name="whatshot"
						style={articleScreenStyles.flameIcon}
						size={14}
					/>
					<Caption>521 | instalki.pl | 2h</Caption>
				</View>
				<Paragraph>{ content }</Paragraph>
				<Button
					onPress={goToSource}
					icon="link"
					mode="contained"
					style={articleScreenStyles.goToSourceBtn}
					children="Visit website"
				/>
			</View>
		</ScrollView>
	);
};

export default ArticleScreen;
