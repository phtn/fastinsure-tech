export const grayscale = (
  ctx: CanvasRenderingContext2D,
  sw: number,
  sh: number,
) => {
  const imageData = ctx.getImageData(0, 0, sw, sh);
  const data = imageData.data;
  // data.forEach((i) => {
  //   i += 4;
  //   const avg = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
  //   data[i] = avg;
  //   data[i + 1] = avg;
  //   data[i + 2] = avg;
  // });
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  return imageData;
};
