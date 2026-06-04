import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { destroyReview } from "../../store/listing-Slice/review";

const ShowReview = ({ review, id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // console.log("this is review ", review);

  function getStars(rating) {
    const filledStar = "★";
    const emptyStar = "☆";
    const totalStars = 5;
    return filledStar.repeat(rating) + emptyStar.repeat(totalStars - rating);
  }

  let handleDelete = (reviewId, id) => {
    console.log(reviewId, id);
    dispatch(destroyReview({ id: id, reviewId: reviewId }))
      .unwrap()
      .then((res) => {
        toast.success("Review Deleted!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <hr className="text-gray-700 my-5" />
      <div className="w-full px-[5px] flex items-center justify-center flex-wrap gap-2 lg:justify-around ">
        {review.map((val, ind) => (
          <div
            key={ind}
            className="w-[150px] h-[150px] rounded overflow-hidden shadow-lg p-2 flex flex-col justify-between md:w-[220px] md:h-[200px] lg:w-[300px]"
          >
            <div>
              <div className="font-bold text-[15px] mb-2 md:text-[20px]">
                {val.name || "Adam"}
              </div>
              <p className="text-gray-700 text-base text-[10px] line-clamp-4 md:text-[13px]">
                {val.comment || "Lorem ipsum dolor sit amet..."}
              </p>
            </div>
            <div>
              <span className="text-gray-700 text-[10px] md:text-[15px]">
                Rating {getStars(val.rating)}
              </span>
              <div>
                {user?.id && user.id === val.owner ? (
                  <button
                    onClick={() => handleDelete(val._id, id)}
                    className="bg-red-500 hover:bg-red-700 text-white text-sm py-0.5 px-2 rounded md:px-6 md:py-2"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowReview;
