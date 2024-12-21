import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Image } from "@nextui-org/react";
import { ButtSex } from "@/ui/button/ripple";
import { DocumentIcon } from "@heroicons/react/24/outline";

const PdfGenerator = () => {
  const [pdfPreview, setPdfPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  const generatePdf = useCallback(async () => {
    setLoading(true);
    if (!componentRef.current) {
      setLoading(false);
      return;
    }

    // Capture the component as a canvas
    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL("image/png");

    // Create a new PDF
    const pdf = new jsPDF("portrait", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // If the content is long, handle page breaks
    while (imgHeight > pageHeight) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    }

    // Get PDF as data URI for preview
    const pdfUri = pdf.output("datauristring");
    setPdfPreview(pdfUri);
    setLoading(false);

    // Optionally, save the PDF
    // pdf.save("download.pdf");
  }, []);

  return (
    <div>
      {/* Section to generate PDF */}
      <div
        ref={componentRef}
        style={{ padding: "20px", border: "1px solid #ddd" }}
      >
        <header className="flex h-20 items-start justify-between border-b-[0.33px] border-double border-primary pt-4">
          <div className="flex h-fit space-x-4">
            <Image alt="fastinsure-logo" src="/svg/f.svg" className="size-10" />
            <div className="flex h-12 flex-col justify-center space-y-1 font-inst text-sm font-medium leading-none tracking-tight">
              <h1>FastInsure</h1>
              <h1>Technologies</h1>
            </div>
          </div>
        </header>

        <div className="py-6">
          <h2 className="font-jet text-xs tracking-tighter">Request Info</h2>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex h-24 items-center justify-end">
        <ButtSex
          onClick={generatePdf}
          size="lg"
          inverted
          end={DocumentIcon}
          loading={loading}
        >
          <span className="px-4">Generate PDF</span>
        </ButtSex>
      </div>

      {/* Preview PDF */}
      {pdfPreview && (
        <div style={{ marginTop: "20px" }} className="rounded-md">
          <h3>PDF Preview:</h3>
          <iframe
            src={pdfPreview}
            title="Preview"
            width="100%"
            height="500px"
            style={{ border: "1px solid #ddd" }}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
