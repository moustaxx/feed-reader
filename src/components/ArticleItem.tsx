import React from 'react';
import { View, Image } from 'react-native';
import { Paragraph, Subheading, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import innertext from 'innertext';
import { format } from 'timeago.js';

import articleStyles from './ArticleItem.style';

interface IArticleProps {
	id: string | number;
	title?: string;
	content?: string;
	imageURL?: string;
	sourceName?: string;
	engagement?: number;
	crawled: number;
}

const ArticleItem = ({
	id,
	title,
	content,
	imageURL,
	sourceName = 'Unknown',
	engagement = 0,
	crawled = Date.now(),
}: IArticleProps) => {
	const { navigate } = useNavigation();
	const goToArticle = () => navigate('ArticleScreen', { itemId: id });
	const date = format(crawled, 'my-locale');

	return (
		<TouchableRipple onPress={goToArticle}>
			<View style={articleStyles.root}>
				<View style={articleStyles.content}>
					<Subheading
						style={articleStyles.title}
						numberOfLines={3}
						children={title && title}
					/>
					<Paragraph
						numberOfLines={3}
						children={content && innertext(content)}
					/>
					<View style={articleStyles.captions}>
						<MaterialIcons
							name="whatshot"
							style={articleStyles.flameIcon}
							size={14}
						/>
						{ /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
						<Caption>{engagement} | {sourceName} | {date}</Caption>
					</View>
				</View>
				{imageURL && <Image source={{ uri: imageURL }} style={articleStyles.image} />}
			</View>
		</TouchableRipple>
	);
};

export default ArticleItem;
