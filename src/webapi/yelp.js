export const SearchBusinesses = async (query) => {
    const urlParams = new URLSearchParams(query);
    const response = await fetch(`/-/search?${urlParams}`);
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body.businesses;
}


export const FoodCategories = () => {
    return import("./food.categories.json");
}
