export const getFileNameInformation = (logoBase64: string) => {
  const base64EncodedImageString = logoBase64?.replace(
    /^data:image\/\w+;base64,/,
    '',
  );
  const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');

  return imageBuffer;
};
