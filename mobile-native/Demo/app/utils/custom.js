import { CustomClass } from 'NativeModules'

export const GREETING = CustomClass.greeting

export const square = (num) => new Promise((resolve, reject) => {
  CustomClass.square(num, (err, number) => {
    console.log(number)
    if (err) reject(err)
    else resolve(number)
  })
})
