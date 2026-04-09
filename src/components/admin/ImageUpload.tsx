import React, { useRef, useState } from "react";
import { supabase } from "../../supabaseClient";

interface ImageUploadProps {
  bucket?: string;
  folder?: string;
  onUploaded: (url: string) => void;
  label?: string;
  currentUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket = "permias-media",
  folder = "misc",
  onUploaded,
  label = "Upload Image",
  currentUrl,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);

    const ext = file.name.split(".").pop();
    const filename = `${folder}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filename, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    onUploaded(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      {currentUrl && (
        <img
          src={currentUrl.startsWith("http") ? currentUrl : process.env.PUBLIC_URL + currentUrl}
          alt="current"
          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
        />
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUpload;
