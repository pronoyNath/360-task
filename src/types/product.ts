
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    reviews?: Review[];
  }
  
  export interface Review {
    id?: number;
    text: string;
    rating: number;
    reviewerName: string;
    date: string;
    comment: string;
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface UpdateProductRequest {
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
    reviews?: Review[];
  }
  
  // export type PaginationProps = {
  //   current: number ;
  //   pageSize: number;
  //   pageSizeOptions: string[];
  //   showSizeChanger: boolean;
  //   total: number;
  // };
  
  export type CategoryObject = {
    slug: string;
    name: string;
    url: string;
  };
  
  export type CategoryType = string | CategoryObject;
  