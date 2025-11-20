import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateInitialGuestData } from "../utils/api";
const GuestDetailsForm = ({
  setStep,
  packagedata,
  existingData,
  setGuestInfo,
}) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState(() =>
    existingData?.guestData
      ? existingData.guestData
      : generateInitialGuestData(packagedata)
  );
  const [contactDetails, setContactDetails] = useState({
    email: "",
    countryCode: "+91",
    phone: "",
  });

  const [errors, setErrors] = useState({}); // store validation errors

  const handleChange = (roomIndex, type, personIndex, field, value) => {
    const updated = [...guestData];
    updated[roomIndex][type][personIndex][field] = value;
    setGuestData(updated);

    // LIVE REMOVE ERROR
    const errorKey = `${
      type === "adults" ? "adult" : "child"
    }-${roomIndex}-${personIndex}-${field}`;

    if (errors[errorKey]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[errorKey];
      setErrors(updatedErrors);
    }
  };

  const handleContactChange = (field, value) => {
    setContactDetails((prev) => ({ ...prev, [field]: value }));

    // remove error when typing
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[`contact-${field}`];
      return updated;
    });
  };

  // 🔴 VALIDATION CHECK
  const validateForm = () => {
    const newErrors = {};
    if (!contactDetails.phone || contactDetails.phone.trim() === "") {
      newErrors["contact-phone"] = "Phone is required";
    }

    if (!contactDetails.email || contactDetails.email.trim() === "") {
      newErrors["contact-email"] = "Email is required";
    }
    guestData.forEach((room, rIndex) => {
      // Adults
      room.adults.forEach((adult, aIndex) => {
        ["title", "firstName", "lastName"].forEach((field) => {
          if (!adult[field] || adult[field].trim() === "") {
            newErrors[`adult-${rIndex}-${aIndex}-${field}`] = "Required";
          }
        });
      });

      room.children.forEach((child, cIndex) => {
        ["title", "firstName", "lastName"].forEach((field) => {
          if (!child[field] || child[field].trim() === "") {
            newErrors[`child-${rIndex}-${cIndex}-${field}`] = "Required";
          }
        });
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // NEXT BUTTON
const handleContinue = () => {
  if (!validateForm()) return;

  setLoading(true); // start loader

  setTimeout(() => {
    const finalData = {
      contactDetails,
      guestData,
    };

    setGuestInfo(finalData);
    setStep(2); // navigate after 2 seconds
    setLoading(false);
  }, 2000);
};


  useEffect(() => {
    if (!existingData) return;

    console.log("Prefill guest info:", existingData);

    // Prefill contact details
    setContactDetails({
      email: existingData.contactDetails?.email || "",
      countryCode: existingData.contactDetails?.countryCode || "+91",
      phone: existingData.contactDetails?.phone || "",
    });

    // Prefill guest data (only if structure matches rooms)
    if (existingData.guestData) {
      setGuestData(existingData.guestData);
    }
  }, [existingData]);

  return (
    <div className=" rounded-lg shadow-md w-full">
      {/* Header */}
      <div className="flex items-center p-3 bg-indigo-600 text-white mb-4">
        <span className=" text-base sm:text-lg font-bold">Guest Details</span>
      </div>

      <div className="flex flex-col p-4 sm:p-6 gap-y-4 sm:gap-y-4">
        {/* Room 1 */}

        {/* Room List */}
        <div className="relative border-l-2 border-gray-200 ml-6 sm:ml-10">
          {packagedata?.map((room, roomIndex) => (
            <div key={roomIndex} className="mb-8 sm:mb-10 relative">
              {/* Circle */}
              <div className="absolute -left-[28px] sm:-left-[39px] flex flex-col items-center">
                <div className="bg-[#009CFF] text-white font-semibold rounded-full w-12 h-12 sm:w-16 sm:h-16 flex flex-col justify-center items-center shadow-md border-4 border-white">
                  <span className="text-[11px] sm:text-[13px] leading-none">
                    R
                  </span>
                  <span className="text-lg sm:text-xl font-bold leading-none">
                    {roomIndex + 1}
                  </span>
                </div>

                {roomIndex < packagedata?.length - 1 && (
                  <div className="h-full w-[2px] sm:w-[3px] bg-gray-300 mt-1"></div>
                )}
              </div>

              {/* Card */}
              <div className="ml-8 sm:ml-10">
                <div className="bg-[#E9F4FF] rounded-t-lg px-3 py-2 font-semibold text-gray-800 border">
                  Room - {roomIndex + 1}
                </div>

                <div className="bg-white border border-t-0 rounded-b-lg px-4 py-3">
                  <div className="flex flex-col gap-y-6 sm:w-[90%]">
                    {/* Adults */}
                    {guestData[roomIndex].adults.map((adult, adultIndex) => (
                      <div
                        key={adultIndex}
                        className="grid sm:flex gap-4 items-center"
                      >
                        <span className="font-semibold w-full sm:w-[15%]">
                          Adult {adultIndex + 1}
                        </span>

                        {/* Title */}
                        <div className="sm:w-[25%] w-full">
                          <label>Title</label>
                          <select
                            className="border p-2 rounded-md w-full"
                            value={adult.title}
                            onChange={(e) =>
                              handleChange(
                                roomIndex,
                                "adults",
                                adultIndex,
                                "title",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select</option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                          </select>
                          {errors[`adult-${roomIndex}-${adultIndex}-title`] && (
                            <p className="text-red-500 text-xs">Required</p>
                          )}
                        </div>

                        {/* First Name */}
                        <div className="sm:w-[30%]">
                          <label>First Name</label>
                          <input
                            className="border p-2 rounded-md w-full"
                            value={adult.firstName}
                            onChange={(e) =>
                              handleChange(
                                roomIndex,
                                "adults",
                                adultIndex,
                                "firstName",
                                e.target.value
                              )
                            }
                          />
                          {errors[
                            `adult-${roomIndex}-${adultIndex}-firstName`
                          ] && <p className="text-red-500 text-xs">Required</p>}
                        </div>

                        {/* Last Name */}
                        <div className="sm:w-[30%]">
                          <label>Last Name</label>
                          <input
                            className="border p-2 rounded-md w-full"
                            value={adult.lastName}
                            onChange={(e) =>
                              handleChange(
                                roomIndex,
                                "adults",
                                adultIndex,
                                "lastName",
                                e.target.value
                              )
                            }
                          />
                          {errors[
                            `adult-${roomIndex}-${adultIndex}-lastName`
                          ] && <p className="text-red-500 text-xs">Required</p>}
                        </div>
                      </div>
                    ))}

                    {/* Children */}
                    {guestData[roomIndex].children.map((child, childIndex) => (
                      <div
                        key={childIndex}
                        className="grid sm:flex gap-4 items-center"
                      >
                        <span className="font-semibold w-full sm:w-[15%]">
                          Child {childIndex + 1}
                        </span>

                        {/* Title */}
                        <div className="sm:w-[25%]">
                          <label>Title</label>
                          <select
                            className="border p-2 rounded-md w-full"
                            value={child.title}
                            onChange={(e) =>
                              handleChange(
                                roomIndex,
                                "children",
                                childIndex,
                                "title",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select</option>
                            <option>Master</option>
                            <option>Miss</option>
                          </select>
                          {errors[`child-${roomIndex}-${childIndex}-title`] && (
                            <p className="text-red-500 text-xs">Required</p>
                          )}
                        </div>

                        {/* First Name */}
                        <div className="sm:w-[30%]">
                          <label>First Name</label>
                          <input
                            className="border p-2 rounded-md w-full"
                            value={child.firstName}
                            onChange={(e) =>
                              handleChange(
                                roomIndex,
                                "children",
                                childIndex,
                                "firstName",
                                e.target.value
                              )
                            }
                          />
                          {errors[
                            `child-${roomIndex}-${childIndex}-firstName`
                          ] && <p className="text-red-500 text-xs">Required</p>}
                        </div>

                        {/* Last Name */}
                        <div className="sm:w-[30%]">
                          <label>Last Name</label>
                          <input
                            className="border p-2 rounded-md w-full"
                            value={child.lastName}
                            onChange={(e) =>
                              handleChange(
                                roomIndex,
                                "children",
                                childIndex,
                                "lastName",
                                e.target.value
                              )
                            }
                          />
                          {errors[
                            `child-${roomIndex}-${childIndex}-lastName`
                          ] && <p className="text-red-500 text-xs">Required</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <div className="">
          <div className="font-semibold text-lg sm:text-xl text-gray-700">
            Contact Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Email */}
            <div className="flex flex-col gap-y-1">
              <label className="block font-semibold text-gray-600">
                Email ID
              </label>

              <input
                type="email"
                className={`border p-2 rounded-md w-full ${
                  errors["contact-email"] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email"
                value={contactDetails.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
              />

              {errors["contact-email"] && (
                <p className="text-red-500 text-xs">Email is required</p>
              )}
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-y-1">
              <label className="block font-semibold text-gray-600">
                Mobile No
              </label>

              <div className="flex">
                <select
                  className="border border-gray-300 p-2 rounded-l-md"
                  value={contactDetails.countryCode}
                  onChange={(e) =>
                    handleContactChange("countryCode", e.target.value)
                  }
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>

                <input
                  type="tel"
                  className={`border p-2 rounded-r-md w-full ${
                    errors["contact-phone"]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Mobile Number"
                  value={contactDetails.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                />
              </div>

              {errors["contact-phone"] && (
                <p className="text-red-500 text-xs">Phone number is required</p>
              )}
            </div>
          </div>
        </div>

        {/* GST Details */}
        <div className="">
          <div className="font-semibold text-gray-700">
            GST Details (Optional)
          </div>
          <div className="flex items-center mt-2">
            <input type="checkbox" id="gstDetails" className="mr-2" />
            <label htmlFor="gstDetails">+ Add GST Details</label>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            className="mr-2 mt-1"
          />
          <label htmlFor="agreeTerms">
            I understand and agree to the rules of this fare, the{" "}
            <Link to="/terms-and-consition" className="text-blue-600 underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {/* Continue to Payment Button */}
        <div className="w-full items-center justify-end flex">
          <button
            onClick={handleContinue}
            disabled={!agreeTerms || loading}
            className="bg-indigo-600 shadow-sm sm:w-fit hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400 text-white text-base font-medium py-2 px-6 rounded-md w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              "Continue to Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsForm;
