## Install Emscripten

```
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
./emsdk activate --build=Release sdk-incoming-64bit binaryen-master-64bit
source ./emsdk_env.sh
```

## Compile WASM

```
emcc extern.cpp -O1 -s EXPORTED_FUNCTIONS="['_square_val']" -s WASM=1 -s SIDE_MODULE=1 -o extern.wasm
```

To run example:

1. Compile WASM with command above.
2. Run web server in this path.
3. Open `/examples` to see basic demo.
