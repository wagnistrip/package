import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";

const RoomCard = ({ pkg }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = () => {
    setLoading(true);

    setTimeout(() => {
      navigate(
        `/packages/${pkg?.title
          ?.toLowerCase()
          ?.replace(/\s+/g, "-")
          ?.replace(/[^\w-]+/g, "")}`,
        { state: { pkg } }
      );
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <div
      key={pkg.id}
      className="bg-white max-h-[600px] rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&w=800&q=80"
          }
          alt={pkg?.title}
          className="w-full h-60 object-cover"
        />
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          {"Recommended"}
        </span>
        <span className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded">
          {pkg?.duration_nights}N/{pkg?.duration_days}D
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2">{pkg?.title}</h3>
        <ul className="text-sm text-gray-600 space-y-1 mb-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            {pkg?.itineraries.map((place, i) => (
              <li key={i} className="flex flex-row items-center gap-x-2">
                <GoDotFill /> {place?.title}
              </li>
            ))}
          </div>
          {pkg?.inclusions.map((feat, i) => (
            <li key={i} className="text-green-600">
              ✔ {feat?.title}
            </li>
          ))}
        </ul>

        {/* Price & Button - stick to bottom */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-lg font-bold">{pkg?.total_fare}/Person</p>
            <p className="text-xs text-gray-500">{pkg?.total_fare}</p>
          </div>

          <button
            onClick={handleBookNow}
            disabled={loading}
            className="uppercase tracking-widest text-blue-600 text-base font-semibold border-b-[1px] w-fit pr-3 py-1 hover:border-black border-gray-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              <>
                book now <SlArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
