"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface ImageUploadProps {
  onSuccess: (result: any) => void;
  folder?: string;
  className?: string;
  title?: string;
  allowMultiple?: boolean;
  children: React.ReactNode;
}

// Enhanced ImageUpload component with better multiple file handling
export default function ImageUpload({
  onSuccess,
  folder,
  children,
  className,
  title = "Upload Image",
  allowMultiple = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      options={{
        showCompletedButton: false,
        folder: folder || "uploads",
        sources: ["local", "url", "camera"],
        multiple: allowMultiple,
        maxFiles: allowMultiple ? 10 : 1,
        clientAllowedFormats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
          "gif",
          "bmp",
          "tiff",
          "ai",
          "svg",
          "eps",
          "pdf",
          "psd",
        ],
        resourceType: "auto",
        maxFileSize: 10000000, // 10MB
        showPoweredBy: false,
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
        },
        text: {
          en: {
            "queue.title": allowMultiple
              ? "Upload Multiple Files"
              : "Upload File",
            "queue.title_uploading_with_counter": "Uploading {{num}} files",
            "queue.title_uploading": "Uploading files",
            "queue.mini_title": "Uploaded",
            "queue.mini_title_uploading": "Uploading",
            "local.dd_title_single": "Drag and Drop your file here",
            "local.dd_title_multi": "Drag and Drop your files here",
          },
        },
      }}
      onSuccess={(result: any, { widget }) => {
        console.log("Upload event:", result?.event);
        console.log("Upload info:", result?.info);

        // Handle upload start
        if (result?.event === "queues-start") {
          setIsUploading(true);
          setUploadProgress("Starting upload...");
        }

        // Handle individual file success
        if (result?.event === "success" && result?.info) {
          console.log("File uploaded successfully:", result.info);
          onSuccess(result.info);

          if (allowMultiple) {
            setUploadProgress(
              `Uploaded: ${result.info.original_filename || "file"}`
            );
          } else {
            setUploadProgress("Upload complete!");
            widget.close();
          }
        }

        // Handle upload progress
        if (result?.event === "upload-added") {
          setUploadProgress(
            `Preparing: ${result.info.original_filename || "file"}`
          );
        }

        // Handle all uploads complete
        if (result?.event === "queues-end") {
          setIsUploading(false);
          setUploadProgress("");

          if (allowMultiple) {
            // Keep widget open for multiple uploads, but show completion
            setTimeout(() => {
              setUploadProgress("Ready for more uploads");
            }, 1000);

            setTimeout(() => {
              setUploadProgress("");
            }, 3000);
          }
        }

        // Handle errors
        if (result?.event === "abort") {
          setIsUploading(false);
          setUploadProgress("Upload cancelled");
          setTimeout(() => setUploadProgress(""), 2000);
        }
      }}
      onError={(error: any) => {
        console.error("Upload error:", error);
        setIsUploading(false);
        setUploadProgress("Upload failed");
        setTimeout(() => setUploadProgress(""), 3000);
      }}
    >
      {({ cloudinary, widget, open }) => (
        <div className="relative">
          <button
            type="button"
            aria-label={
              allowMultiple ? "Upload multiple images" : `${title}`
            }
            onClick={() => {
              console.log("Opening upload widget...");
              open?.();
            }}
            disabled={isUploading}
            className={`${className} disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
          >
          

            {/* Button content */}
            {isUploading ? (
              <span className="flex items-center justify-center opacity-50">
                <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                Uploading...
              </span>
            ) : (
              children
            )}
          </button>

        
        </div>
      )}
    </CldUploadWidget>
  );
}
