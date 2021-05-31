export const SearchRestaurants = async (urlParams) => {
    const response = await fetch(`/-/search?${urlParams}`);
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body.businesses;
}
