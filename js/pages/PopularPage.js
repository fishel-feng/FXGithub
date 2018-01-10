import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {Navigator} from 'react-native-deprecated-custom-components';
import RepositoryCell from '../common/RepositoryCell';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: ''
    };
  }

  loadData() {
    let url = URL + this.key + QUERY_STR;
    this.dataRepository.fetchNetRepository(url).then(result => {
      this.setState({
        result: JSON.stringify(result)
      });
    }).catch(error => {
      this.setState({
        result: JSON.stringify(error)
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'最热'}
        />
        <ScrollableTabView renderTabBar={() => <ScrollableTabBar/>}>
          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="IOS">IOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JS">JS</PopularTab>
        </ScrollableTabView>
      </View>
    );
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url).then(result => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result.items)
      });
    }).catch(error => {
      this.setState({
        result: JSON.stringify(error)
      });
    });
  }

  renderRow(data) {
    return <RepositoryCell data={data}/>
  }

  render() {
    return <View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={data => this.renderRow(data)}
      />
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