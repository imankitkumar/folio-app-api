import Proxy from 'free-proxy'

const list = new Proxy()

list.get().then(res => console.log(res))