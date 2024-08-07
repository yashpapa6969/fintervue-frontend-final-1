import { useParams } from "react-router-dom";
import VideoCall from "../components/common/VideoCall"

const MeetingPage = () => {
    const {id} = useParams();

    return (
        <div className="h-screen w-full">
            <VideoCall channelId={id} />
        </div>
    )
}

export default MeetingPage