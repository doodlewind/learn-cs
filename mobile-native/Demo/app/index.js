import React from 'react'
import { StyleSheet, View } from 'react-native'
import VideoWrapper from './video'

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <VideoWrapper />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
