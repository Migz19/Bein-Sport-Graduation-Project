"use client";

import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";

const FileUpload = () => {
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  const handleUploadClick = () => {
    // fileInputRef.current?.click();
    if (!userId) {
      alert("Please login first");
      router.push("/components/Login");
      return;
    }
    router.push("/possession");
  };

  return (
    <div className="model">
      <div className="text-center">
        <Button className="tag-btn" onClick={handleUploadClick}>
          Analyze Now!
        </Button>
      </div>
    </div>
  );
};

const Model = () => <FileUpload />;

export default Model;