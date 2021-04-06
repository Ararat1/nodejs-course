const currentTime = () => {
    let now = new Date;

    let h = now.getHours();
    let m = now.getSeconds();
    let s = now.getSeconds();
    let ms = now.getMilliseconds();

    let result = `${h}:${m}:${s}:${ms}`;

    return result;
}

module.exports = {
    currentTime
};