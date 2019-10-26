// eslint-disable-next-line import/no-unresolved
import { DrawerNavigatorItemsProps } from 'react-navigation-drawer/lib/typescript/src/types';
import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

import logoIcon from '../../../assets/small-icon.png';
import menuDrawerStyles from './MenuDrawer.style';

const MenuDrawer = (props: DrawerNavigatorItemsProps) => {
	return (
		<View style={menuDrawerStyles.container}>
			<ScrollView style={menuDrawerStyles.scroller}>
				<View style={menuDrawerStyles.header}>
					<Image style={menuDrawerStyles.headerImg} source={logoIcon} />
					<Text style={menuDrawerStyles.headerText}>Feed Reader</Text>
				</View>
				<DrawerNavigatorItems {...props} />
			</ScrollView>
			<View style={menuDrawerStyles.footer}>
				<Text style={menuDrawerStyles.description}>Feed Reader</Text>
				<Text style={menuDrawerStyles.version}>v1.0</Text>
			</View>
		</View>
	);
};

export default MenuDrawer;
