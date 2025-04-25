export interface ShippingLocation {
  id: string;
  name: string;
  price: number;
  regions?: string[];
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
}

export interface ShippingData {
  title: string;
  subtitle: string;
  priceTableTitle: string;
  insideRegionTitle: string;
  insideRegionPrice: string;
  locations: ShippingLocation[];
  contact: ContactInfo;
}