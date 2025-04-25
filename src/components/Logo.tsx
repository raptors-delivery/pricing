import raptors from "../../public/raptors.jpg";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 logo-container p-2 rounded-lg">
      <img
        src={raptors}
        alt="Raptors Logo"
        className="h-12 w-12 object-contain"
      />
      <div className="text-3xl font-bold tracking-wider">
        <span className="text-black">RAPTORS</span>
      </div>
    </div>
  );
};

export default Logo;
