import { ShippingData } from "../types";

interface HeaderProps {
  data: ShippingData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <div className="bg-yellow-400 py-4 px-6 flex flex-col md:flex-row-reverse items-center justify-between rounded-t-lg">
      <div className="flex flex-col items-end">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black drop-shadow-[0_2px_1px_rgba(255,255,255,0.5)] tracking-wider">
          {data.title}
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-black">
          {data.subtitle}
        </h2>
      </div>
      <div className="mt-4 md:mt-0">
        <div
          className="text-center text-xl font-bold bg-black text-white py-2 px-4 rounded-lg"
          dir="ltr"
        >
          {data.insideRegionTitle}
          <span className="block text-2xl">{data.insideRegionPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
