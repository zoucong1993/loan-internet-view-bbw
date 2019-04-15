//依赖的js库文件
let libs = [
    './static/lib/jquery.min.js',
    './static/lib/promise.min.js',
    './static/lib/html2canvas.js',
    './static/lib/canvg.js',
];

libs = libs.map(lib => {
    let obj = {
        outputPath: './static/lib/',
        publicPath: './static/lib/',
        includeSourcemap: false
    };
    if (typeof lib === "string") {
        obj.filepath = lib;
    } else {
        Object.assign(obj, lib);
    }
    return obj;
});
console.log(libs)

module.exports = libs;