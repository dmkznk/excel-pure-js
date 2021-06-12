async function start() {
    return  await Promise.resolve('1')

}

start().then((val) => console.log(val))
