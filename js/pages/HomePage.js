import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tab_popular',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_popular'}
            selectedTitleStyle={{color: 'red'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]}
                                             source={require('../../res/images/ic_popular.png')}/>}
            onPress={() => this.setState({selectedTab: 'tab_popular'})}>
            <PopularPage/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_trending'}
            selectedTitleStyle={{color: 'yellow'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]}
                                             source={require('../../res/images/ic_trending.png')}/>}
            onPress={() => this.setState({selectedTab: 'tab_trending'})}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_favorite'}
            selectedTitleStyle={{color: 'red'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]}
                                             source={require('../../res/images/ic_popular.png')}/>}
            onPress={() => this.setState({selectedTab: 'tab_favorite'})}>
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_my'}
            selectedTitleStyle={{color: 'yellow'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]}
                                             source={require('../../res/images/ic_trending.png')}/>}
            onPress={() => this.setState({selectedTab: 'tab_my'})}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page1: {
    flex: 1,
    backgroundColor: 'red',
  },
  page2: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  image: {
    height: 22,
    width: 22
  }
});
