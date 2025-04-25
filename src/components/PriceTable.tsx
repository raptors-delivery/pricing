import { MapPin } from "lucide-react";
import { ShippingData } from "../types";
import raptors from "/raptors.jpg";

interface PriceTableProps {
  data: ShippingData;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
}

const PriceTable: React.FC<PriceTableProps> = ({
  data,
  isAdmin = false,
  onEdit,
}) => {
  return (
    <div className="w-full">
      <div className="bg-black text-white text-center py-2 text-2xl font-bold">
        {data.priceTableTitle}
      </div>
      <div className="w-full overflow-x-auto relative">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${raptors})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <table className="w-full bg-white bg-opacity-90" dir="rtl">
          <tbody>
            {data.locations.map((location) => (
              <tr
                key={location.id}
                className="border-b border-gray-200 hover:bg-gray-50 hover:bg-opacity-90 transition-colors"
                onClick={() => isAdmin && onEdit && onEdit(location.id)}
              >
                <td className="py-3 px-4 text-right font-bold text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-red-600 h-6 w-6 shrink-0" />
                    <span>{location.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-left font-bold text-xl" dir="ltr">
                  {location.price} LE
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
