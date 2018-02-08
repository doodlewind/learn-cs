import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Video from 'react-native-video'

export default class VideoWrapper extends Component {
  video = null
  state = {
    paused: false,
    source: require('../resources/wa2.mp4')
  }
  onPlay = () => {
    this.setState({ paused: false })
  }
  onStop = () => {
    this.setState({ paused: true })
  }
  onChangeSrc = () => {
    console.log('changing src')
    this.setState({ source: require('../resources/key-demo.mp4') })
  }

  render () {
    return (
      <Fragment>
        <View style={styles.videoWrapper}>
          <Video
            ref={video => { this.video = video }}
            repeat
            resizeMode='cover'
            onLoad={this.onLoad}
            paused={this.state.paused}
            source={this.state.source}
            style={styles.video}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={this.onStop} title='Stop' />
          <Button onPress={this.onPlay} title='Play' />
          <Button onPress={this.onChangeSrc} title='Change' />
        </View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  videoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: '60%',
    right: 0
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})
