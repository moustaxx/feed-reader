import React from 'react';
import { View, ScrollView, Text, Image, ActivityIndicator } from 'react-native';
import { List } from 'react-native-paper';
import { DrawerContentComponentProps } from 'react-navigation-drawer';

import logoIcon from '../../../assets/small-icon.png';
import menuDrawerStyles from './MenuDrawer.style';
import { feedly, useAPIRequest } from '../../utils/feedlyClient';
import { IFeed } from '../../API/types/getCollections';
import { setArticlesTargetID } from '../../store/articles/articles.actions';
import { store } from '../../store';


const DrawerListItem = ({ feed, onPress }: { feed: IFeed; onPress: () => void }) => {
	const googleFaviconURL = `https://www.google.com/s2/favicons?domain=${feed.website}`;
	const imgURL = `https://i.olsh.me/icon?url=${feed.website}&size=16..64..300&fallback_icon_url=${googleFaviconURL}`;
	return (
		<List.Item
			left={() => <Image source={{ uri: imgURL }} style={menuDrawerStyles.listItemImg} />}
			title={feed.title}
			onPress={onPress}
		/>
	);
};

const MenuDrawer = ({ navigation }: DrawerContentComponentProps) => {
	const { data, loading, error } = useAPIRequest(() => feedly.getCollections());

	if (loading && !data) {
		return (
			<View style={menuDrawerStyles.loadingOrError}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={menuDrawerStyles.loadingOrError}>
				<Text>Error</Text>
				<Text>{error.message}</Text>
			</View>
		);
	}

	const { userID } = feedly;

	const navigateToArticleList = (targetID: string) => {
		store.dispatch(setArticlesTargetID(targetID));
		navigation.navigate('Home');
	};

	return (
		<View style={menuDrawerStyles.container}>
			<ScrollView style={menuDrawerStyles.scroller}>
				<View style={menuDrawerStyles.header}>
					<Image style={menuDrawerStyles.headerImg} source={logoIcon} />
					<Text style={menuDrawerStyles.headerText}>Feed Reader</Text>
				</View>
				<List.Section title="Feeds">
					<List.Item
						title="All"
						left={(props) => <List.Icon icon="menu" {...props} />}
						onPress={() => void navigateToArticleList(`user/${userID}/category/global.all`)}
					/>
					<List.Item
						title="Read later"
						left={(props) => <List.Icon icon="read" {...props} />}
						onPress={() => void navigateToArticleList(`user/${userID}/tag/global.saved`)}
					/>
					{data?.map((collection) => (
						<List.Accordion
							key={collection.id}
							title={collection.label}
							left={(props) => (
								<List.Icon icon="rss" style={menuDrawerStyles.listIcon} {...props} />
							)}
							onPress={() => void navigateToArticleList(collection.id)}
						>
							{collection.feeds.map((feed) => (
								<DrawerListItem
									key={feed.id}
									feed={feed}
									onPress={() => void navigateToArticleList(feed.id)}
								/>
							))}
						</List.Accordion>
					))}
				</List.Section>
				<List.Section title="Other">
					<List.Item
						left={(props) => <List.Icon icon="settings" {...props} />}
						title="Settings"
						onPress={() => void navigation.navigate('Settings')}
					/>
					<List.Item
						left={(props) => <List.Icon icon="account-circle" {...props} />}
						title="My profile"
						onPress={() => void navigation.navigate('My Profile')}
					/>
				</List.Section>
			</ScrollView>
			<View style={menuDrawerStyles.footer}>
				<Text style={menuDrawerStyles.description}>Feed Reader</Text>
				<Text style={menuDrawerStyles.version}>v1.0</Text>
			</View>
		</View>
	);
};

export default MenuDrawer;
