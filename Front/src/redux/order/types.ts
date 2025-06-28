export interface CreateOrderItemDto {
    productId: number
    quantity: number
    price: number
}

export interface CreateOrderDto {
    deliveryServiceId?: number
    totalPrice?: number
    status?: string
    address?: string
    city?: string
    postalCode?: string
    country?: string
    phoneNumber?: string
    apartmentNumber?: string
    orderItems: CreateOrderItemDto[]
}

export interface OrderItemDto {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    productName: string;
    imageBase64: string | null;
}

export interface OrderDto {
    id: number;
    userId: number;
    totalPrice: number;
    deliveryServiceId: number;
    trackingNumber: string;
    status: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    apartmentNumber: string;
    orderItems: OrderItemDto[];
    createdDate: string;
    lastUpdatedDate: string;
    firstName: string;
    lastName: string;
}