import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Video from 'react-native-video'

const videos = [
  require(`../resources/wa2/1.mp4`),
  require(`../resources/wa2/2.mp4`),
  require(`../resources/wa2/3.mp4`),
  require(`../resources/wa2/4.mp4`),
  require(`../resources/wa2/5.mp4`)
]

const next = (num) => !num ? 1 : (num + 1) % 5

export default class VideoWrapper extends Component {
  video = null
  index = 0
  state = {
    paused: false,
    source: videos[0]
  }
  onPlay = () => {
    this.setState({ paused: false })
  }
  onStop = () => {
    this.setState({ paused: true })
  }
  onChangeSrc = () => {
    this.index = next(this.index)
    this.setState({ source: videos[this.index] })
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
    backgroundColor: 'black',
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
