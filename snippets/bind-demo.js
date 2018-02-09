// A simple `bind` example.

function foo () {
  console.log(this.x)
}

// undefined
foo()

// Bind { x: 123 } to `this` in foo.
const boundFoo = foo.bind({ x: 123 })

// 123
boundFoo()
