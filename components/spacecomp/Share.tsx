import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

export default function SharePop({ onClose, URL }: { onClose: () => void; URL: string }) {
  const [copied, setCopied] = useState(false);

  const CopytheLink = () => {
    navigator.clipboard.writeText(URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm transition-opacity duration-300 ease-in-out p-4">
      <Card className="relative top-5 flex flex-col items-center w-full max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm h-auto shadow-lg p-5 bg-white rounded-lg">
        <X
          className="absolute top-3 right-3 md:top-5 md:right-5 cursor-pointer rounded-full bg-white/60 p-2 w-8 h-8 text-gray-800"
          onClick={onClose}
        />
        <CardContent className="flex py-12 flex-col items-center justify-center w-full h-full gap-4">
          <span className="font-bold text-lg md:text-xl xl:text-2xl text-center">Share the Listing</span>

          <Button
            variant="outline"
            className="px-6 py-2 bg-[#8559EC] text-white font-bold w-full md:w-auto text-sm md:text-base lg:text-lg hover:bg-[#6644B8] hover:text-white border border-gray-300"
            onClick={CopytheLink}
          >
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-sm md:text-lg font-semibold mb-2 text-center">Scan to View this Listing</h2>
            <QRCodeCanvas value={URL} size={120} className="md:size-[150px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
