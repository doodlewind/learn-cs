import React, { Component, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import Video from 'react-native-video'

export default class VideoWrapper extends Component {
  render () {
    return (
      <Fragment>
        <View style={styles.videoWrapper}>
          <Video
            repeat
            resizeMode='cover'
            source={require('../resources/wa2.mp4')}
            style={styles.video}
          />
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
    bottom: '50%',
    right: 0
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
