// sleep
const sleep = (time:number) => new Promise<void>((resolve) => { setTimeout(() => { resolve() }, time) })

export default {
  sleep
}
