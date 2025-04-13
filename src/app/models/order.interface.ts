import { CartItem } from './cart-item.interface';
import { Profile } from './profile.interface';

export interface Order {
  id: string; 
  profile: Profile;
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
  deliveryDate: Date;
  status: 'feldolgozas alatt' | 'szallitas alatt' | 'teljesitve' | 'torolve';
  deliveryAddress: string;
}