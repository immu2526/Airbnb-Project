import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteListing, listingDetails } from "../../store/listing-Slice";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Review from "../components/Review";
import ShowReview from "../components/ShowReview";
const ShowListing = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, singleListing, isLoading } = useSelector(
    (state) => state.listing
  );

  const { user } = useSelector((state) => state.user);

  // console.log("single data", user);

  useEffect(() => {
    dispatch(listingDetails(id))
      .unwrap()
      .then((res) => console.log(" indivisula id call API CALL"))
      .catch((err) => console.log(err));
  }, [dispatch]);

  if (isLoading || !singleListing) return <h1>Loading...</h1>;
  // console.log(singleListing);

  // Authorization

  const isOwner =
    singleListing &&
    user &&
    singleListing.owner._id.toString() === user.id.toString();

  // console.log(isOwner);

  //

  let handleDelete = (id) => {
    dispatch(deleteListing(id))
      .unwrap()
      .then((res) => {
        toast.success("Listing Deleted!");
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  let editHandler = (id) => {
    navigate(`/listing/${id}/edit`);
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg ml-10 font-semibold hover:bg-gray-300 transition duration-150"
      >
        ← Go Back
      </button>
      <div className="w-full flex items-center flex-col my-2">
        <div className="h-[200px] w-[250px] md:h-[240px] md:w-[350px] lg:h-[280px] lg:w-[450px]">
          <img
            src={singleListing.image.url}
            alt=""
            className="h-full w-full object-cover rounded-[5px]"
          />
        </div>
      </div>
      <h1 className="text-[18px] font-bold ml-5 my-1 md:ml-40 lg:ml-[25%] lg:text-2xl  ">
        {singleListing.title}
      </h1>
      <p className="text-sm ml-5 md:ml-40 lg:ml-[25%] lg:text-xl ">
        Description :{" "}
        <span className="text-gray-500">{singleListing.description}</span>
      </p>
      <p className="text-sm ml-5 md:ml-40  lg:ml-[25%] lg:text-xl">
        Location :{" "}
        <span className="text-gray-500">{singleListing.location}</span>
      </p>
      <p className="text-[16px] ml-5 font-bold md:ml-40  lg:ml-[25%] lg:text-xl ">
        Price :{" "}
        {singleListing.price.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </p>
      {isOwner ? (
        <div className="flex gap-2 px-3 my-2 md:ml-39 lg:ml-[25%]">
          <button
            onClick={() => handleDelete(singleListing._id)}
            className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => editHandler(singleListing._id)}
            className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded"
          >
            Edit
          </button>
        </div>
      ) : null}
      <br />
      <Review />
      <ShowReview review={singleListing.reviews} id={singleListing._id} />
      <br />
      <Footer />
    </>
  );
};

export default ShowListing;
