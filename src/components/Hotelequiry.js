import React, { useState } from "react";

const Hotelequiry = ({ packagedata }) => {
  const [formData, setFormData] = useState({
    packageType: packagedata?.title || "",
    fullName: "",
    email: "",
    contact: "",
    adults: 2,
    children: 0,
    rooms: 1,
    agree: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle increment/decrement
  const handleCountChange = (type, value) => {
    setFormData((prev) => {
      const updated = { ...prev };

      if (type === "adults") {
        updated.adults = Math.max(1, prev.adults + value); // Adults can't go below 1
      } else {
        updated.children = Math.max(0, prev.children + value);
      }

      const totalGuests = updated.adults + updated.children;
      updated.rooms = Math.ceil(totalGuests / 4) || 1; // 1 room per 4 guests
      return updated;
    });
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // If user checks the agreement checkbox, clear the error message
    if (name === "agree" && checked) {
      setErrorMessage("");
    }

    // Also clear error when the user starts typing in any text/email input
    if (
      (name === "fullName" || name === "email" || name === "contact") &&
      value.trim() !== ""
    ) {
      setErrorMessage("");
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.packageType) {
      setErrorMessage("Package type is required.");
      return;
    }

    if (!formData.fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Email address is required.");
      return;
    }

    if (!formData.agree) {
      setErrorMessage(
        "Please agree to all the terms and conditions before proceeding."
      );
      return;
    }

    // If all valid
    setErrorMessage(""); // clear any previous error
    console.log("📩 Enquiry Form Data =>", formData);
    alert("✅ Enquiry submitted successfully!");
  };

  return (
    <div className="sm:bg-transparent rounded-lg w-full bg-opacity-90">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-x-3 gap-y-2 sm:gap-y-6 items-center justify-center"
      >
        {/* Package Type */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-[#656565]">
            Package Type <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="packageType"
            value={formData.packageType}
            disabled
            className="bg-[#f5f5f5] text-gray-900 outline-none border-none text-sm sm:text-base focus:outline-none rounded-lg block w-full p-3"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-[#656565]">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-[#f5f5f5] text-gray-900 outline-none border-none text-sm sm:text-base rounded-lg block w-full p-3"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-[#656565]">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#f5f5f5] text-gray-900 outline-none border-none text-sm sm:text-base rounded-lg block w-full p-3"
            required
          />
        </div>
        {/* Contact */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-[#656565]">
            Contact Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={(e) => {
              // Allow only digits
              const numericValue = e.target.value.replace(/\D/g, "");
              setFormData((prev) => ({
                ...prev,
                contact: numericValue,
              }));

              // Clear error if user starts typing
              if (numericValue.trim() !== "") {
                setErrorMessage("");
              }
            }}
            placeholder="+91"
            className="bg-[#f5f5f5] text-gray-900 outline-none border-none text-sm sm:text-base rounded-lg block w-full p-3"
            required
          />
        </div>

        {/* Guests & Rooms */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-[#656565]">
            Guests & Rooms <span className="text-red-600">*</span>
          </label>

          <div className="flex gap-4">
            {/* Adults */}
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">Adult</p>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
                <button
                  type="button"
                  onClick={() => handleCountChange("adults", -1)}
                  className="text-xl font-bold"
                >
                  –
                </button>
                <span className="mx-3 text-lg font-semibold">
                  {formData.adults}
                </span>
                <button
                  type="button"
                  onClick={() => handleCountChange("adults", 1)}
                  className="text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">Child</p>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
                <button
                  type="button"
                  onClick={() => handleCountChange("children", -1)}
                  className="text-xl font-bold"
                >
                  –
                </button>
                <span className="mx-3 text-lg font-semibold">
                  {formData.children}
                </span>
                <button
                  type="button"
                  onClick={() => handleCountChange("children", 1)}
                  className="text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Rooms */}
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">Room</p>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 bg-gray-100">
                <span className="mx-3 text-lg font-semibold text-gray-700">
                  {formData.rooms}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1"
          />
          <label
            htmlFor="agree"
            className="sm:text-base text-sm text-opacity-70 font-medium text-[#232323]"
          >
            I agree with Terms of Service and Privacy Statement.
          </label>
        </div>

        {/* Dynamic Warning Box */}
        {errorMessage && (
          <div className="w-full p-4 bg-[#fff1f1] text-[#a87575] text-sm sm:text-base xl:text-lg font-normal rounded">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="uppercase font-semibold sm:h-14 h-10 px-8 bg-blue-100 hover:bg-black hover:text-white transition-all duration-200 mt-4 sm:mt-0 sm:bg-transparent w-full sm:w-auto border-[1px] sm:border-[3px] border-black text-black rounded"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
};

export default Hotelequiry;
