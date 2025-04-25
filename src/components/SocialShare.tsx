import { Share2 } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const shareData = {
    title: "Raptors Shipping Services",
    text: "Check out Raptors Shipping Services pricing menu",
    url: url || window.location.href,
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&t=${encodeURIComponent(title)}`;
        window.open(shareUrl, "_blank", "width=600,height=400");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <Share2 className="h-5 w-5" />
      مشاركة
    </button>
  );
};

export default SocialShare;
