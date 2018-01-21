## Compile WASM

```
emcc extern.cpp -O1 -s EXPORTED_FUNCTIONS="['_square_val']" -s WASM=1 -s SIDE_MODULE=1 -o extern.wasm
```

To run example:

1. Compile WASM with command above.
2. Run web server in this path.
3. Open `/examples` to see basic demo.
