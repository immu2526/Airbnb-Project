import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListing } from "../../store/listing-Slice";
import { toast } from "react-toastify";

const Create = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ file: null, url: "", filename: "" });
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImage({ file, url, filename: file.name });
  };

  const removeImage = () => {
    if (image.url) URL.revokeObjectURL(image.url);
    setImage({ file: null, url: "", filename: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("location", form.location);
    formData.append("country", form.country);
    formData.append("image", image.file);

    dispatch(createListing(formData))
      .unwrap()
      .then((res) => {
        toast.success("Listing Added!");

        // form reset
        setForm({
          title: "",
          description: "",
          price: "",
          location: "",
          country: "",
        });

        // image reset
        if (image.url) URL.revokeObjectURL(image.url);

        setImage({
          file: null,
          url: "",
          filename: "",
        });

        // file input reset
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">New Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
            placeholder="Enter description"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>

          {image.url ? (
            <div className="relative rounded overflow-hidden border">
              <img
                src={image.url}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
              <p className="text-xs text-gray-500 px-2 py-1 bg-white truncate">
                {image.filename}
              </p>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded px-3 py-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <p className="text-sm text-gray-500">
                <span className="text-blue-500 font-medium">Choose a file</span>{" "}
                or drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files[0])}
            required
            className="hidden"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            placeholder="0"
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="City or area"
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white text-sm font-medium py-2 rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default Create;
