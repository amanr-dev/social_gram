import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const TopCreators = () => {
  const { data: creators, isFetching: loading } = useGetUsers(12);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-creators">
      <h1 className="text-light-1 text-2xl mb-4">Top Creators</h1>
      <div className="creator-grid">
        {creators?.documents.map((creator, index) => (
          <Link to={`/user-profile/${creator.$id}`}>
            <div
              className="p-2 flex items-center justify-center  w-full rounded-xl px-4 py-5 flex-col border-light-3 border-2 "
              key={index}
            >
              <img
                src={creator.imageUrl}
                className="w-14 h-14 object-contain rounded-full"
                alt={`${creator.name}'s post`}
              />
              <h4 className="text-light-1 text-lg font-semibold">
                {creator.name}
              </h4>
              <span className="text-light-3 text-sm">{creator.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;