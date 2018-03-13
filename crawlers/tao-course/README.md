# Crawler Demo

```
npm install
node index
```

Results will be written into `./results` in JSON format. Please install json2csv globally and combine it with `./post-process.js` for data exporting.


``` sh
nohup node index.js &!


tar -cvf result.tar ./results/*
python -m SimpleHTTPServer 10000
# Download tar file and unzip.

node post-process.js results/20180228/**/*.json
json2csv -i result.json > result.csv
```
