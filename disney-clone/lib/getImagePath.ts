const getImagePath = (imagePath?: string, fullSized?: boolean) => {
    return imagePath ? `http://image.tmdb.org/t/p/${fullSized ? "original" : "w500"}/${imagePath}`
    : "https://links.papareact.com/o8z";
};

export default getImagePath;