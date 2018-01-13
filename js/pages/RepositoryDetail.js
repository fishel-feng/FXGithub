import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
  DeviceEventEmitter,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtils from "../util/ViewUtils";

const TRENDING_URL = 'https://github.com/';

export default class RepositoryDetail extends Component {
  constructor(props) {
    super(props);
    this.url = this.props.item.html_url ? this.props.item.html_url : TRENDING_URL + this.props.item.fullName;
    let title = this.props.item.full_name ? this.props.item.full_name : this.props.item.fullName;
    this.state = {
      url: this.url,
      canGoBack: false,
      title: title
    }
  }

  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      url: e.url
    });
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.title}
          style={{backgroundColor: '#2196F3'}}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}/>
        <WebView
          ref={webView => this.webView = webView}
          source={{uri: this.state.url}}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          startInLoadingState={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});