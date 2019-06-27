import React from 'react';
import { Image, View } from 'react-native';
import { Paragraph, Subheading, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';

import articleStyles from './Article.style';

interface IArticleProps {
	id: string | number;
	title: string;
	imageHref: string;
	content: string;
}

const Article = ({ id, title, imageHref, content }: IArticleProps) => {
	const { navigate } = useNavigation();
	const goToArticle = () => navigate('ArticleScreen', { itemId: id });

	return (
		<TouchableRipple onPress={goToArticle}>
			<View style={articleStyles.root}>
				<View style={articleStyles.content}>
					<Subheading
						style={articleStyles.title}
						numberOfLines={3}
						children={title}
					/>
					<Paragraph
						numberOfLines={3}
						children={content}
					/>
					<View style={articleStyles.captions}>
						<MaterialIcons
							name="whatshot"
							style={articleStyles.flameIcon}
							size={14}
						/>
						<Caption>521 | instalki.pl | 2h</Caption>
					</View>
				</View>
				<Image source={{ uri: imageHref }} style={articleStyles.image} />
			</View>
		</TouchableRipple>
	);
};

export default Article;
