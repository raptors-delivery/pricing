import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import React from "react";

interface ExportOptionsProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ menuRef }) => {
  const prepareForExport = () => {
    if (!menuRef.current) return null;

    const menuClone = menuRef.current.cloneNode(true) as HTMLElement;

    // Enhanced export styling
    menuClone.style.width = "210mm";
    menuClone.style.margin = "0";
    menuClone.style.padding = "0";
    menuClone.style.backgroundColor = "white";
    menuClone.style.minHeight = "297mm"; // A4 height
    menuClone.style.pageBreakAfter = "always";

    // Temporarily append to document for rendering
    menuClone.style.position = "absolute";
    menuClone.style.left = "-9999px";
    document.body.appendChild(menuClone);

    return menuClone;
  };

  const cleanupExport = (element: HTMLElement | null) => {
    if (element) {
      document.body.removeChild(element);
    }
  };

  const exportAsPNG = async () => {
    const exportElement = prepareForExport();
    if (!exportElement) return;

    try {
      const canvas = await html2canvas(exportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: 794,
        windowHeight: 1123,
        logging: false,
      });

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = "raptors-shipping-menu.png";
      link.click();
    } catch (error) {
      console.error("Failed to export as PNG:", error);
      alert("فشل في تصدير الملف كصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      cleanupExport(exportElement);
    }
  };

  const exportAsPDF = async () => {
    const exportElement = prepareForExport();
    if (!exportElement) return;

    try {
      const canvas = await html2canvas(exportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: 794,
        windowHeight: 1123,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Calculate dimensions while maintaining aspect ratio
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add margins
      const margin = 10; // 10mm margins
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      // Center the content vertically and horizontally
      const xOffset = margin;
      const yOffset = (pageHeight - contentHeight) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        xOffset,
        yOffset,
        contentWidth,
        contentHeight
      );
      pdf.save("raptors-shipping-menu.pdf");
    } catch (error) {
      console.error("Failed to export as PDF:", error);
      alert("فشل في تصدير الملف كـPDF. يرجى المحاولة مرة أخرى.");
    } finally {
      cleanupExport(exportElement);
    }
  };

  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        onClick={exportAsPNG}
        className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Download className="h-5 w-5" />
        تصدير كصورة PNG
      </button>

      <button
        onClick={exportAsPDF}
        className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Download className="h-5 w-5" />
        تصدير كملف PDF
      </button>
    </div>
  );
};

export default ExportOptions;
