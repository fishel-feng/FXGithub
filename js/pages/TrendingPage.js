import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {Navigator} from 'react-native-deprecated-custom-components';
import TrendingCell from '../common/TrendingCell';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from "./RepositoryDetail";

const API_URL = 'https://github.com/trending/';

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
    this.state = {
      result: '',
      languages: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.languageDao.fetch().then(result => {
      this.setState({
        languages: result
      });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    let content = this.state.languages.length > 0 ?
      <ScrollableTabView
        tabBarBackgroundColor='#2196F3'
        tabBarInactiveTextColor='mintcream'
        tabBarActiveTextColor='white'
        tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        renderTabBar={() => <ScrollableTabBar/>}>
        {this.state.languages.map((result, i, arr) => {
          let lan = arr[i];
          return lan.checked ? <TrendingTab key={i} tabLabel={lan.name} {...this.props}/> : null;
        })}
      </ScrollableTabView> : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'趋势'}
          statusBar={{backgroundColor: '#2196F3'}}/>
        {content}
      </View>
    );
  }
}

class TrendingTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      isLoading: true
    });
    let url = this.genFetchUrl('?since=daily',this.props.tabLabel);
    this.dataRepository.fetchRepository(url).then(result => {
      let items = result && result.items ? result.items : result ? result : [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        isLoading: false
      });
      if (result && result.update_date && !this.dataRepository.checkData(result.update_date)) {
        DeviceEventEmitter.emit('showToast', '过时');
        return this.dataRepository.fetchNetRepository(url);
      } else {
        DeviceEventEmitter.emit('showToast', '缓存');
      }
    }).then(items => {
      if (!items || items.length === 0) {
        return;
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      DeviceEventEmitter.emit('showToast', '网络');
    }).catch(error => {
      this.setState({
        result: JSON.stringify(error)
      });
    });
  }

  onSelect(item) {
    this.props.navigator.push({
      component: RepositoryDetail,
      params: {
        item: item,
        ...this.props
      }
    });
  }

  genFetchUrl(timeSpan, category) {
    return API_URL + category + timeSpan.searchText;
  }

  renderRow(data) {
    return <TrendingCell onSelect={() => this.onSelect(data)} key={data.id} data={data}/>
  }

  render() {
    return <View style={{flex: 1}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={data => this.renderRow(data)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.loadData()}
            color={['#2179F3']}
            tintColor={'#2179F3'}
            title={'loading...'}
            titleColor={'#2179F3'}/>
        }/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20
  }
});