import { useState } from "react";
import { ShippingData } from "../types";

interface AdminPanelProps {
  data: ShippingData;
  onUpdateData: (newData: ShippingData) => void;
  onClose: () => void;
  editingId?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  data,
  onUpdateData,
  onClose,
  editingId,
}) => {
  const editingLocation = editingId
    ? data.locations.find((loc) => loc.id === editingId)
    : undefined;

  const [name, setName] = useState(editingLocation?.name || "");
  const [price, setPrice] = useState(editingLocation?.price.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = { ...data };

    if (editingId) {
      // Update existing location
      updatedData.locations = data.locations.map((loc) =>
        loc.id === editingId ? { ...loc, name, price: Number(price) } : loc
      );
    } else {
      // Add new location
      const newId = (
        Math.max(...data.locations.map((l) => Number(l.id))) + 1
      ).toString();
      updatedData.locations = [
        ...data.locations,
        { id: newId, name, price: Number(price) },
      ];
    }

    onUpdateData(updatedData);
    onClose();
  };

  const handleDelete = () => {
    if (!editingId || !window.confirm("هل أنت متأكد من حذف هذا العنصر؟"))
      return;

    const updatedData = { ...data };
    updatedData.locations = data.locations.filter(
      (loc) => loc.id !== editingId
    );

    onUpdateData(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md" dir="rtl">
        <h2 className="text-xl font-bold mb-4 text-center">
          {editingId ? "تعديل موقع" : "إضافة موقع جديد"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              اسم الموقع
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              السعر (LE)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-yellow-400"
              required
              min="0"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-sm transition-colors"
            >
              {editingId ? "تحديث" : "إضافة"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-sm transition-colors"
            >
              إلغاء
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm transition-colors"
              >
                حذف
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
