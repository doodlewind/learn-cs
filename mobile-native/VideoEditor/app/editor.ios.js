import React from 'react'
import { View } from 'react-native'
import { VideoPlayer } from 'react-native-video-processing'

export default class Editor extends React.Component {
  editor = null
  render () {
    return (
      <View style={{
        flex: 1,
        width: '100%'
      }}>
        <VideoPlayer
          ref={ref => this.editor = ref}
          play
          replay
          source={require(`./resources/1.mp4`)}
          style={{ backgroundColor: 'black' }}
          playerWidth={100}
          playerHeight={100}
          resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
          onChange={({ nativeEvent }) => console.log({ nativeEvent })}
        />
      </View>
    )
  }
}
