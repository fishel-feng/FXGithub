import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';
import HttpUtils from './HttpUtils';

export default class FetchTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: ''
    };
  }

  load(url) {
    HttpUtils.get(url).then(result => {
      this.setState({result: JSON.stringify(result)});
    }).catch(err => {
      this.setState({result: JSON.stringify(err)});
    });
  }

  post(url, data) {
    HttpUtils.get(url, data).then(result => {
      this.setState({result: JSON.stringify(result)});
    }).catch(err => {
      this.setState({result: JSON.stringify(err)});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'FetchTest'}
        />
        <Text style={styles.text} onPress={() => this.load('http://rap.taobao.org/mockjsdata/11793/test')}>获取数据</Text>
        <Text style={styles.text} onPress={() => this.post('http://rap.taobao.org/mockjsdata/11793/submit', {
          userName: '小明',
          password: '123456'
        })}>提交数据</Text>
        <Text>{this.state.result}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 18
  }
});