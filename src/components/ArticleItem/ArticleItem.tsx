import React from 'react';
import { View, Image } from 'react-native';
import { Paragraph, Subheading, Caption } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';

import articleStyles from './ArticleItem.style';
import { IAppState, IArticle } from '../../store/types';
import ArticleItemSwipeable from './ArticleItemSwipeable';

export interface IArticleItemProps {
	article: IArticle;
}

const ArticleItem = ({ article }: IArticleItemProps) => {
	const { navigate } = useNavigation();
	const { articlePictureOnLeft } = useSelector((state: IAppState) => state.settings);

	const goToArticle = () => void navigate('ArticleScreen', { article });

	return (
		<ArticleItemSwipeable articleID={article.id} articleSaved={article.saved}>
			<RectButton onPress={goToArticle}>
				<View style={articleStyles.root}>
					{(article.thumbnail || article.imageURL) && articlePictureOnLeft && (
						<Image
							source={{ uri: article.thumbnail || article.imageURL }}
							style={articleStyles.imageLeft}
						/>
					)}
					<View style={articleStyles.content}>
						<Subheading
							style={[articleStyles.title, !article.unread && articleStyles.readTextColor]}
							numberOfLines={3}
							children={article.title}
						/>
						<Paragraph
							numberOfLines={3}
							children={article.content}
						/>
						<View style={articleStyles.captions}>
							<MaterialIcons
								name="whatshot"
								style={articleStyles.flameIcon}
								size={14}
							/>
							<Caption>
								{ /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
								{article.engagement} | {article.sourceName} | {article.crawled} {article.saved && '| Saved'}
							</Caption>
						</View>
					</View>
					{(article.thumbnail || article.imageURL) && !articlePictureOnLeft && (
						<Image
							source={{ uri: article.thumbnail || article.imageURL }}
							style={articleStyles.imageRight}
						/>
					)}
				</View>
			</RectButton>
		</ArticleItemSwipeable>
	);
};

export default React.memo(ArticleItem);
