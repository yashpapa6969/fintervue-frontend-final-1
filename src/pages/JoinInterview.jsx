import { useState, useEffect } from "react";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Conference from "./Conference";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: ""
  });

  const isConnected = useHMSStore(selectIsConnectedToRoom)

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userName = '',
      roomCode = '',
    } = inputValues

    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

    try {
      await hmsActions.join({ userName, authToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NmZhM2EyZTQ5NDRmMDY3MzEzYTdhZTgiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NmZhNjgwMjBhZmNkN2M0OTczYzExYTciLCJ1c2VyX2lkIjoiMTZkNTBhN2YtZDUyNi00MzRiLTkwOTAtZTBkMjJjNTViNWU0IiwiZXhwIjoxNzI3Nzc1OTA3LCJqdGkiOiI3N2EwNzZjMS1hMDUxLTQwMGUtODZhYi00MDJlM2FhNDY1MTIiLCJpYXQiOjE3Mjc2ODk1MDcsImlzcyI6IjY2ZmEzYTJlNDk0NGYwNjczMTNhN2FlNiIsIm5iZiI6MTcyNzY4OTUwNywic3ViIjoiYXBpIn0.fm-2KtqLQAUrkIBEPNk__z9wrawjcAQ2DOvpJQbDhRQ" });
    } catch (e) {
      console.error(e)
    }
  };


  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);


  return (
    <>
      {
        isConnected ? <Conference/>  : (
          <form onSubmit={handleSubmit}>
            <h2>Join Room</h2>
            <div className="input-container">
              <input
                required
                value={inputValues.name}
                onChange={handleInputChange}
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
              />
            </div>
            <div className="input-container">
              <input
                id="room-code"
                type="text"
                name="roomCode"
                placeholder="Room code"
                onChange={handleInputChange}
              />
            </div>
            <button className="btn-primary">Join</button>
          </form>
        )
      }
    </>
  )
}

export default JoinForm;
