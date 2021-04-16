export const uniqueFileName = (type) => {
    let date = new Date();

    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDay();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();

    let file_extansion = type.split("/")[1];

    return `${y}${m}${d}${h}${min}${s}.${file_extansion}`;
};