import { useEffect, useState } from "react";
import { shippingData as initialData } from "../data/shippingData";
import { AdminContext } from "../hooks/useAdmin";
import { ShippingData } from "../types";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ShippingData>(initialData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [savedMenus, setSavedMenus] = useState<ShippingData[]>([]);

  const updateData = (newData: ShippingData) => {
    setData(newData);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const saveMenu = () => {
    const menuName = prompt("أدخل اسمًا لحفظ هذه القائمة:");
    if (!menuName) return;

    const newMenu = { ...data, title: menuName };
    setSavedMenus([...savedMenus, newMenu]);

    // Also save to localStorage for persistence
    try {
      const existingMenus = JSON.parse(
        localStorage.getItem("raptorsMenus") || "[]"
      );
      localStorage.setItem(
        "raptorsMenus",
        JSON.stringify([...existingMenus, newMenu])
      );
      alert("تم حفظ القائمة بنجاح!");
    } catch (error) {
      console.error("Failed to save menu:", error);
    }
  };

  const loadMenu = () => {
    if (savedMenus.length === 0) {
      alert("لا توجد قوائم محفوظة!");
      return;
    }

    // Create a simple menu selection
    const menuNames = savedMenus.map((menu) => menu.title);
    const selection = prompt(`اختر قائمة للتحميل:\n${menuNames.join("\n")}`);

    if (!selection) return;

    const selectedMenu = savedMenus.find((menu) => menu.title === selection);
    if (selectedMenu) {
      setData(selectedMenu);
      alert("تم تحميل القائمة بنجاح!");
    } else {
      alert("لم يتم العثور على القائمة المحددة!");
    }
  };

  // Load saved menus from localStorage on init
  useEffect(() => {
    try {
      const storedMenus = JSON.parse(
        localStorage.getItem("raptorsMenus") || "[]"
      );
      if (storedMenus.length > 0) {
        setSavedMenus(storedMenus);
      }
    } catch (error) {
      console.error("Failed to load saved menus:", error);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        data,
        updateData,
        isAdmin,
        toggleAdmin,
        saveMenu,
        loadMenu,
        savedMenus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
