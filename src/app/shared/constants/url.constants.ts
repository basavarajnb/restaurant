export class UrlConstants {

    public static get baseApiUrl() {
        return 'https://demo7680223.mockable.io/api/';
    }


    public static get getAllFoodItems() {
        return UrlConstants.baseApiUrl + 'food-item-list';
    }
    public static get getFilterConfig() {
        return UrlConstants.baseApiUrl + 'food-filter-config';
    }
    public static get getAllTags() {
        return UrlConstants.baseApiUrl +  'food-tags';
    }
}
