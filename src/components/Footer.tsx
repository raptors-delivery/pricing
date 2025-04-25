import { MapPin, Phone } from "lucide-react";
import { ShippingData } from "../types";

interface FooterProps {
  data: ShippingData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <div className="bg-yellow-400 py-3 px-4 rounded-b-lg" dir="ltr">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span>{data.contact.phone}</span>
          <span>فون</span>
          <Phone className="h-5 w-5 text-black" />
        </div>

        <div className="flex items-center gap-2 text-lg font-bold">
          <span>{data.contact.whatsapp}</span>
          <span>واتساب</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
            alt="WhatsApp"
            className="h-5 w-5"
          />
        </div>
      </div>

      <div className="mt-2 text-base font-medium flex items-center justify-center gap-2">
        <span>{data.contact.address}</span>
        <MapPin className="h-5 w-5 text-red-600 shrink-0" />
      </div>
    </div>
  );
};

export default Footer;
