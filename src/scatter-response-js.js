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

  static _sendRequest () {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await axios.get(this._url, { params: this.prototype._params })
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
      }
    } else {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }
  }

  static _setParams (data) {
    let params = Object.assign({}, data)
    delete params.url
    this.prototype._params = params
  }

  // Validate methods
  static _initialDataIsCorrect (data) {
    const alowedTypes = ['string', 'object']
    let dataType = typeof data

    if (!data || !alowedTypes.includes(dataType) || (dataType === 'object' && Array.isArray(data))) {
      throw new Error('Method init() needs at least url to inicialize Scatter')
    }
    return true
  }
}

Scatter.prototype._promise = null

export default Scatter
