import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const KEY = 'text';

export default class AsyncStorageTest extends Component {

  constructor(props) {
    super(props);

  }

  onSave() {
    AsyncStorage.setItem(KEY, this.text, (error) => {
      if (!error) {
        this.toast.show('保存成功', DURATION.LENGTH_LONG);
      } else {
        this.toast.show('保存失败', DURATION.LENGTH_LONG);
      }
    });
  }

  onRemove() {
    AsyncStorage.removeItem(KEY, (error) => {
      if (!error) {
        this.toast.show('删除成功', DURATION.LENGTH_LONG);
      } else {
        this.toast.show('删除失败', DURATION.LENGTH_LONG);
      }
    });
  }

  onFetch() {
    AsyncStorage.getItem(KEY, (error, result) => {
      if (!error) {
        if (result !== '') {
          this.toast.show(KEY + ':' + result, DURATION.LENGTH_LONG);
        } else {
          this.toast.show(KEY + '不存在', DURATION.LENGTH_LONG);
        }
      } else {
        this.toast.show('失败', DURATION.LENGTH_LONG);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'AsyncStorage'}
          style={{backgroundColor: '#2196F3'}}/>
        <TextInput
          style={{borderWidth: 1, height: 40, margin: 6}}
          onChangeText={text => this.text = text}/>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.tips}
            onPress={() => this.onSave()}>
            保存
          </Text>
          <Text
            style={styles.tips}
            onPress={() => this.onRemove()}>
            移除
          </Text>
          <Text
            style={styles.tips}
            onPress={() => this.onFetch()}>
            取出
          </Text>
        </View>
        <Toast ref={toast => this.toast = toast}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tips: {
    fontSize: 18,
    margin: 5
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
});