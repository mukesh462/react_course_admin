export const UrltoFile = async (url) => {
    const mainUrl = process.env.REACT_APP_IMAGE;
    
  const file = await fetch(mainUrl+url)
    .then((res) => res.blob())
    .then((blob) => new File([blob], "image", { type: blob.type }));

  return url ? file : null;
};
