export const uniqueFileName = (type) => {
    let date = new Date()

    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDay()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    let ext = type.split("/")[1]

    return `${year}${month}${day}${h}${m}${s}.${ext}`
}