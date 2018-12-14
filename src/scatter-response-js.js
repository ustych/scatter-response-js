import axios from 'axios'

class Scatter {
  static init (data) {
    if (this._initialDataIsCorrect(data)) {
      if (typeof data === 'string') {
        this._setUrl(data)
      } else {
        this._setUrl(data)
        this._setParams(data)
      }
    }
    return this
  }

  static get () {
    return this._handleMultipleRequests(this._sendRequest)
  }

  // resolve multiple requests
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

  // Just send request by some driver(axios, native fetch)
  static _sendRequest () {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await axios.get(this.prototype._url, { params: this.prototype._params })
          return resolve(response)
        } catch (error) {
          return reject(error)
        }
      }, 250)
    })
  }

  // Service methods
  static _setUrl (data) {
    if (typeof data === 'string') {
      this.prototype._url = data
    } else if (typeof data === 'object') {
      if (Object.keys(data).includes('url')) {
        this.prototype._url = data.url
        delete data.url
      }
    } else {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }
  }

  static _setParams (data) {
    // refactor this
    if (typeof data === 'string') {
      this.prototype._params.push(data)
    } else {
      if (Array.isArray(data)) {
        let params = new Set(this.prototype._params)
        data.forEach(param => params.add(param))

        this.prototype._params = [...Array.from(params)]
      } else {
        let params = new Set(this.prototype._params)
        data.params.forEach(param => params.add(param))

        this.prototype._params = [...Array.from(params)]
      }
    }
  }

  // Validate methods
  static _initialDataIsCorrect (data) {
    let dataType = typeof data

    if (!data || !this.prototype._allowedTypes.includes(dataType) || (dataType === 'object' && Array.isArray(data))) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }
    return true
  }
}

Scatter.prototype._promise = null
Scatter.prototype._allowedTypes = ['string', 'object']

export default Scatter
