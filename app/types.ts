export interface Post {
    id: number;
    name: string;
    madeby: string;
    madein: string;
    contact_email: string;
    contact_phone: string;
    price: number;
    year: number;
    section: string;
    quality: string;
    description: string;
    image: string | null;
  }