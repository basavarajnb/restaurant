export class FoodItem {
    name: string;
    id: string;
    price: number;
    rating: number;
    imageUrl: string;
    description: string;
    preparationTime: number;
    categories: Array<string>;
    isVeg: boolean;
    available: boolean;
    tags: Array<string>;
}
