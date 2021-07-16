export const clone = (obj) => JSON.parse(JSON.stringify(obj || {}))
export const waitNT = (ctx) => new Promise((resolve) => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise((resolve) => requestAnimationFrame(resolve))
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
