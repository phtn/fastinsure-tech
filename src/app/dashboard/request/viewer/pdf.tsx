import { type FC, useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Image } from "@nextui-org/react";
import { ButtSex } from "@/ui/button/ripple";
import { FileInputIcon } from "lucide-react";
import moment from "moment";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import init, { json_to_csv_3 } from "@wasm/csv3/csv";
import type {
  AddressFieldProps,
  AutoFieldProps,
  ReqFieldProps,
  SubjectFieldProps,
} from "./body";

interface PdfProps {
  address: FC;
  auto: FC;
  request: FC;
  subject: FC;
  subjectData?: SubjectFieldProps;
  addressData?: AddressFieldProps;
  autoData?: AutoFieldProps;
  requestData?: ReqFieldProps;
  title: string;
  description?: string;
  id: string | undefined;
}
export const PdfObject = ({
  title,
  description,
  request: Request,
  auto: Auto,
  address: Address,
  subject: Subject,
  subjectData,
  addressData,
  requestData,
  autoData,
  id,
}: PdfProps) => {
  const componentRef = useRef(null);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [csvLoading, setCsvLoading] = useState(false);

  const pageOne = useRef<HTMLDivElement>(null);
  const pageTwo = useRef<HTMLDivElement>(null);

  const generatePdf = useCallback(async () => {
    setPdfLoading(true);
    if (!componentRef.current) {
      setPdfLoading(false);
      return;
    }

    if (!pageOne.current || !pageTwo.current) {
      setPdfLoading(false);
      return;
    }

    const pageOneCanvas = await html2canvas(pageOne.current);
    const pageTwoCanvas = await html2canvas(pageTwo.current);
    const pageOneData = pageOneCanvas.toDataURL("image/png");
    const pageTwoData = pageTwoCanvas.toDataURL("image/png");

    // Create a new PDF
    const pdf = new jsPDF("portrait", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageOneHeight = (pageOneCanvas.height * imgWidth) / pageOneCanvas.width;
    const pageTwoHeight = (pageTwoCanvas.height * imgWidth) / pageTwoCanvas.width;
    const position = 0;

    pdf.addImage(pageOneData, "PNG", 0, position, imgWidth, pageOneHeight);
    pdf.addPage()
    pdf.addImage(pageTwoData, "PNG", 0, position, imgWidth, pageTwoHeight);

    // If the content is long, handle page breaks

    // Create a Blob for PDF preview
    const pdfBlob = pdf.output("blob");
    setPdfBlob(URL.createObjectURL(pdfBlob));
    setPdfLoading(false);
    // Optionally, save the PDF
    // pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);
  }, []);

  const csvInstance = useRef(null);

  const initialize = useCallback(async () => {
    if (csvInstance.current) return;
    await init();
  }, []);

  useEffect(() => {
    initialize().catch(console.error);
  }, [initialize]);

  const generateCsv = useCallback(async () => {
    setCsvLoading(true);
    const table = [
      {
        tableName: "Request",
        data: [requestData],
      },
      {
        tableName: "Assured",
        data: [subjectData],
      },
      {
        tableName: "Address",
        data: [addressData],
      },
      {
        tableName: "Vehicle",
        data: [autoData],
      },
    ];

    const json = JSON.stringify(table);
    const csv = json_to_csv_3(json);

    try {
      // Generate CSV using WASM
      // Download the CSV
      const blob = new Blob([`\uFEFF${csv}`], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.setAttribute("download", `${id}.csv`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setCsvLoading(false);
    } catch (error) {
      console.error("Error generating CSV:", error);
      setCsvLoading(false);
    }
  }, [addressData, autoData, subjectData, requestData, id]);

  return (
    <div>
      {/* Buttons */}
      <div className="flex h-24 items-center space-x-4 border-b">
        <ButtSex
          size="md"
          inverted
          onClick={generatePdf}
          end={FileInputIcon}
          loading={pdfLoading}
        >
          <span className="px-4">PDF</span>
        </ButtSex>
        <ButtSex
          size="md"
          inverted
          end={ArrowDownTrayIcon}
          loading={csvLoading}
          onClick={generateCsv}
        >
          <span className="px-4">CSV</span>
        </ButtSex>
      </div>
      {/* Section to generate PDF */}
      <div ref={componentRef}>
        <div ref={pageOne} className="border-[0.33px] border-primary-300 p-5 shadow-md">
          <FileHeader page={1} title={title} id={id} />
          <div className="flex h-full justify-between">
            <div className="h-full pt-5">
              <Subject />
            </div>
            <div className="h-full pt-5">
              <Address />
            </div>
          </div>
          <div className="h-full pt-5">
            <Request />
          </div>

          <div className="flex h-[7.25rem] w-full items-end justify-center">
            <div className="h-px w-full border-b-[0.33px] border-dashed border-primary-300/60" />
          </div>
        </div>

        <div ref={pageTwo} className="border-[0.33px] border-primary-300 p-5 shadow-md">
          <FileHeader page={2} title={title} id={id} />
          <section className="py-4">
            <div className="h-full">
              <Auto />
            </div>
          </section>
        </div>
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

const FileHeader = (props: {
  page: number;
  title: string;
  id: string | undefined;
}) => (
  <div>
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
      <div className="space-y-1">
        <div className="font-inst font-semibold tracking-tight">
          {props.title}
        </div>
        <div className="font-jet text-[10px]">ID: {props.id}</div>
      </div>
      <div style={{ height: 48 }}>
        <div className="font-jet text-[10px] font-thin text-primary">
          {moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
        <div className="font-jet text-[10px] font-thin text-primary">
          Page {props.page} of 2
        </div>
      </div>
    </header>

    <div className="h-4 border-b-[0.33px] border-primary py-1"></div>
  </div>
);
