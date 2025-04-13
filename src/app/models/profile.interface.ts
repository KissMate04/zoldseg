export interface Profile {
    name: string;
    email: string;
    phone: string;
    address: { 
        country: string
        zipCode: string;
        city: string;
        street: string;
        houseNumber: string;
        other?: string;
    };
    imageUrl: string;
  }