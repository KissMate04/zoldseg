export interface Product {
    id: number;
    name: string;
    description: string;
    origin: string;
    price: number;
    imageUrl: string;
    category: 'zoldseg' | 'gyumolcs';
    stock: number;
    rating: number;
    unit: 'kg' | 'db' | 'cs';
}