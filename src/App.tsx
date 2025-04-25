import { useRef, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import ExportOptions from "./components/ExportOptions";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PriceTable from "./components/PriceTable";
import SocialShare from "./components/SocialShare";
import { useAdmin } from "./hooks/useAdmin";

function App() {
  const { data, updateData, isAdmin, toggleAdmin, saveMenu, loadMenu } =
    useAdmin();
  const [editingLocationId, setEditingLocationId] = useState<
    string | undefined
  >();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEditLocation = (id: string) => {
    if (isAdmin) {
      setEditingLocationId(id);
    }
  };

  const handleCloseAdmin = () => {
    setEditingLocationId(undefined);
  };

  const handleAddNew = () => {
    setEditingLocationId("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden"
        ref={menuRef}
      >
        <Header data={data} />
        <PriceTable data={data} isAdmin={isAdmin} onEdit={handleEditLocation} />
        <Footer data={data} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ExportOptions menuRef={menuRef} />

        <SocialShare
          url={window.location.href}
          title="Raptors Shipping Services"
        />

        <button
          onClick={toggleAdmin}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors"
        >
          {isAdmin ? "إغلاق وضع الإدارة" : "وضع الإدارة"}
        </button>

        {isAdmin && (
          <>
            <button
              onClick={handleAddNew}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              إضافة موقع جديد
            </button>

            <button
              onClick={saveMenu}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              حفظ القائمة
            </button>

            <button
              onClick={loadMenu}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              تحميل قائمة
            </button>
          </>
        )}
      </div>

      {editingLocationId !== undefined && (
        <AdminPanel
          data={data}
          onUpdateData={updateData}
          onClose={handleCloseAdmin}
          editingId={editingLocationId || undefined}
        />
      )}

      <div className="mt-4 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Raptors Shipping Services - جميع الحقوق
          محفوظة
        </p>
      </div>
    </div>
  );
}

export default App;
