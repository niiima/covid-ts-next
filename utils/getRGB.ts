const getRGB = (context) => {
    var data = context.getImageData(0, 0, 1, 1).data;
    var rgb = [data[0], data[1], data[2]];
    console.log(rgb)
    return rgb;
}

export default getRGB;