const request = require('request')
const normalizeUrl = require('normalize-url')

let data = {}

function check(index, option, update, log, error) {
  if (!option.url) {
    log(`${option.name}: no URL set`)
    log(`Skipping...`)
    return
  }
  function doit() {
    let startTime = (new Date).getTime()
    request({method, url} = option, (err, response, body) => {
      if (err) {
        error(`${option.name} error:`)
        error('>', err.message)
        log(`Skipping...`)

        const time = ((new Date).getTime() - startTime) / 1000
        data.data[index].result = {
          status: 0,
          message: err.message,
          // body: null,
          time
        }
      } else {
        const status = response.statusCode
        const message = response.statusMessage
        const time = ((new Date).getTime() - startTime) / 1000
        ;(status >= 400 ? error : log)(`${option.name}: ${status} - ${message} - ${time}s`)
        data.data[index].result = {
          status,
          message,
          // body,
          time
        }
      }
      update(data)
      setTimeout(doit, option.interval * 1000)
    })
  }

  doit()
}

function ping(options, update, log, error) {
  // setup default data & check
  let siteOptions = options.data.map((site, i) => {
    let option = {
      name: site.name || `Site ${i + 1}`,
      url: site.url ? normalizeUrl(site.url) : null,
      method: ['GET', 'POST'].includes(site.method) ? site.method : 'GET',
      interval: site.interval ? Math.max(1, Number(site.interval)) : 3,
      result: null
    }
    log()
    log(`Starting monitoring ${option.name}...`)
    check(i, option, update, log, error)

    return option
  })

  data = Object.assign({}, options, {
    data: siteOptions
  })

  // initial update
  log()
  update(data)
}

module.exports = ping
