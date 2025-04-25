import { createContext, useContext } from "react";
import { ShippingData } from "../types";

export interface AdminContextType {
  data: ShippingData;
  updateData: (newData: ShippingData) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  saveMenu: () => void;
  loadMenu: () => void;
  savedMenus: ShippingData[];
}

// Export the context so the hook can import it
export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
