import { type FC, useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Image } from "@nextui-org/react";
import { ButtSex } from "@/ui/button/ripple";
import { FileInputIcon } from "lucide-react";
import moment from "moment";

interface PdfProps {
  address: FC;
  auto: FC;
  request: FC;
  subject: FC;
  title: string;
  description?: string;
}
export const PdfObject = ({
  title,
  description,
  request,
  auto,
  address,
  subject,
}: PdfProps) => {
  const componentRef = useRef(null);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    // Create a Blob for PDF preview
    const pdfBlob = pdf.output("blob");
    setPdfBlob(URL.createObjectURL(pdfBlob));
    setLoading(false);
    // Optionally, save the PDF
    // pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);
  }, []);

  return (
    <div>
      {/* Section to generate PDF */}
      <div
        ref={componentRef}
        className="border-[0.33px] border-primary-300 p-5 shadow-md"
      >
        <header className="flex h-fit items-start justify-between pt-4">
          <div className="flex items-center space-x-1">
            <Image
              alt="fastinsure-logo"
              src="/svg/f_v2.svg"
              radius="none"
              style={{ height: "28px" }}
            />
            <div
              style={{
                height: 32,
                flexDirection: "column",
                fontSize: "12px",
                color: "#6F7385",
              }}
              className="flex flex-col justify-center font-inst text-xs leading-none tracking-tight"
            >
              <div>FastInsure</div>
              <div style={{ height: "2px" }} />
              <div>Technologies</div>
            </div>
          </div>
          <div>
            <div className="font-inst font-semibold tracking-tight">
              {title}
            </div>
            <div className="font-jet text-[10px]">ID: {description}</div>
          </div>
          <div style={{ height: 48 }}>
            <div className="font-jet text-[10px] font-thin text-primary">
              {moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </header>
        <div className="h-4 border-b-[0.33px] border-primary"></div>
        <div className="py-2"></div>
        <div className="flex h-full justify-between">
          <div className="h-full pt-5">{subject({})}</div>
          <div className="h-full pt-5">{address({})}</div>
        </div>
        <div className="h-full pt-5">{request({})}</div>
        <div className="h-full">{auto({})}</div>
      </div>

      {/* Buttons */}
      <div className="flex h-24 items-center justify-end pt-4">
        <ButtSex
          onClick={generatePdf}
          size="lg"
          inverted
          end={FileInputIcon}
          loading={loading}
        >
          <span className="px-4">Generate PDF</span>
        </ButtSex>
      </div>

      {/* Preview PDF */}
      {pdfBlob && (
        <div style={{ marginTop: "10px" }}>
          <object
            data={pdfBlob}
            type="application/pdf"
            width="100%"
            height="700px"
            style={{ border: "1px solid #ddd", borderRadius: 8 }}
          >
            <p>
              Your browser does not support PDFs.{" "}
              <a href={pdfBlob} download={`${description}.pdf`}>
                Download the PDF
              </a>
              .
            </p>
          </object>
        </div>
      )}
    </div>
  );
};
