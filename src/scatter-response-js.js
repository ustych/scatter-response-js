import axios from 'axios'

class Scatter {
  // ok
  static init (data) {
    if (this._initialDataIsCorrect(data)) {
      this._setUrl(data)
    }
    return this
  }

  static async get (wanted) {
    Scatter.prototype._wants.push(wanted)
    let response = await this._handleMultipleRequests(this._sendRequest)
    response.data.count = 20
    response.data.item = 'product'

    // this.appendDataToResponse()
    return new Promise(resolve => {
      let newData = {}
      newData[wanted] = response.data[wanted]
      return resolve(newData)
    })
  }

  // ok
  static _handleMultipleRequests (fn) {
    if (this._promise != null) {
      return this._promise
    }

    this._promise = fn.call(this)
    this._promise.finally(() => {
      this._promise = null
    })
    return this._promise
  }

  // add additional data to query for axios from multiple get methods
  static _sendRequest () {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await axios.get(this.prototype._url)
          return resolve(response)
        } catch (error) {
          return reject(error)
        }
      }, 250)
    })
  }

  // Service methods
  // ok
  static _setUrl (data) {
    if (typeof data === 'string') {
      this.prototype._url = data
    } else {
      this.prototype._url = data.url
    }
  }

  // Validate methods (extract code below to Validator class)
  static _initialDataIsCorrect (data) {
    const alowedTypes = ['string', 'object']
    let dataType = typeof data

    if (!alowedTypes.includes(dataType)) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }

    if (dataType === 'string' && !data.length) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }

    if (dataType === 'object' && !Object.keys(data).length) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }

    if (dataType === 'object' && Array.isArray(data)) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }

    if (dataType === 'object' && !Object.keys(data).includes('url')) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }

    return true
  }
}

Scatter.prototype._promise = null
Scatter.prototype._wants = []

export default Scatter
