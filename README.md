# Pingdash ![](https://img.shields.io/npm/v/pingdash.svg)
A simple status dashboard for all your services.

![](https://raw.githubusercontent.com/quietshu/pingdash/master/screenshot-terminal.png)

![](https://raw.githubusercontent.com/quietshu/pingdash/master/screenshot-browser.png)

## Usage
Create a config and run `pingdash config.json`, a beautiful realtime monitoring page will be instantly setup on http://localhost:3000.

The config file is defined as below:

## config.json sample
```javascript
{
  "title": "Hello Pingdash",
  "port": 3000,
  "data": [
    // send a GET request to Google every 3 seconds
    {
      "name": "Google",
      "url": "https://google.com",
      "interval": 3
    },
    // ping GitHub once every minute
    {
      "name": "GitHub",
      "method": "ping github.com -c 1",
      "interval": 60
    },
    // ...
  ]
}
```

For more examples, you can checkout the default.json file in this repo.

## Install
You could use npm or yarn to install it globally (recommand node.js version >= 6.0):

```bash
npm i pingdash -g
```

Or use yarn:

```bash
yarn global add pingdash
```

## Options
```bash
$ pingdash --help

  Usage: pingdash [options] <config file>

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -p, --port <port>  server's listen port, 3000 default
    -s, --silent       don't output any logs

```

## License
The MIT license.
