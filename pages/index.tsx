import axios from 'axios';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard key={video._id} post={video} isShowingOnHome/>
        ))
      ) : (
        <NoResults text={`No Vidoes`} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post');
  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
