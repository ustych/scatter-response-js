import Scatter from './scatter-response-js'

window.Scatter = Scatter

Scatter.init('https://httpbin.org/get')

Scatter.get(['count']).then(response => console.log(response))
Scatter.get(['item']).then(response => console.log(response))
