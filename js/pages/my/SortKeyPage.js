import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';

export default class SortKeyPage extends Component {

  constructor(props) {
    super(props);
    this.dataArray = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];
    this.state = {
      checkedArray: []
    };
  }

  componentDidMount() {
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.loadData();
  }

  loadData() {
    this.languageDao.fetch().then(result => {
      this.getCheckedItem(result);
    }).catch(error => {

    });
  }

  getCheckedItem(result) {
    this.dataArray = result;
    let checkedArray = [];
    for (let i = 0; i < result.length; i++) {
      let data = result[i];
      if (data.checked) {
        checkedArray.push(data);
      }
    }
    this.setState({
      checkedArray: checkedArray
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='我的'
          style={{backgroundColor: '#2196F3'}}/>
        <Text
          style={styles.tips}
          onPress={() => {
            this.props.navigator.push({
              component: CustomKeyPage,
              params: {...this.props}
            });
          }}>
          自定义标签
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 29
  }
});