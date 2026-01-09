export enum UserRole {
    ADMIN = 'ADMIN',
    AGENT = 'AGENT',
    PARTNER = 'PARTNER',
}

export enum PartnerType {
    HOSPITAL = 'HOSPITAL',
    SHOP = 'SHOP',
    DISTRIBUTOR = 'DISTRIBUTOR',
    MUNICIPAL = 'MUNICIPAL',
}

export enum ProductUnit {
    PCS = 'PCS',
    KG = 'KG',
    PACK = 'PACK',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DISPATCHED = 'DISPATCHED',
    DELIVERED = 'DELIVERED',
    REJECTED = 'REJECTED',
}
