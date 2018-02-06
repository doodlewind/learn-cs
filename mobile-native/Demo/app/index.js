import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GREETING, square } from './utils/custom'

export default class App extends React.Component {
  state = {
    num: 2
  }

  onSquare = () => {
    square(this.state.num)
      .then((num) => this.setState({ num: num || 2 }))
      .catch(console.log)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>{this.state.num}</Text>
        <Text onPress={this.onSquare}>
          {GREETING}
        </Text>
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
