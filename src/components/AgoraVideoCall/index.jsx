import { useState, useEffect, useRef } from "react";
import { merge } from "lodash";
import AgoraRTC from "agora-rtc-sdk-ng";

import "./canvas.css";

const tile_canvas = {
    "1": ["span 12/span 24"],
    "2": ["span 12/span 12/13/25", "span 12/span 12/13/13"],
    "3": ["span 6/span 12", "span 6/span 12", "span 6/span 12/7/19"],
    "4": [
        "span 6/span 12",
        "span 6/span 12",
        "span 6/span 12",
        "span 6/span 12/7/13",
    ],
    "5": [
        "span 3/span 4/13/9",
        "span 3/span 4/13/13",
        "span 3/span 4/13/17",
        "span 3/span 4/13/21",
        "span 9/span 16/10/21",
    ],
    "6": [
        "span 3/span 4/13/7",
        "span 3/span 4/13/11",
        "span 3/span 4/13/15",
        "span 3/span 4/13/19",
        "span 3/span 4/13/23",
        "span 9/span 16/10/21",
    ],
    "7": [
        "span 3/span 4/13/5",
        "span 3/span 4/13/9",
        "span 3/span 4/13/13",
        "span 3/span 4/13/17",
        "span 3/span 4/13/21",
        "span 3/span 4/13/25",
        "span 9/span 16/10/21",
    ],
};

const AgoraCanvas = (props) => {
    const [displayMode, setDisplayMode] = useState("pip");
    const [streamList, setStreamList] = useState([]);
    const [readyState, setReadyState] = useState(false);
    const [stateSharing, setStateSharing] = useState(false);

    const clientRef = useRef(null);
    const localStreamRef = useRef(null);
    const shareClientRef = useRef(null);
    const shareStreamRef = useRef(null);

    useEffect(() => {
        const $ = props;

        // Initialize AgoraRTC local client
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        subscribeStreamEvents();
        client.join($.appId, $.channel, null, $.uid, (uid) => {
            console.log(`User ${uid} join channel successfully at ${new Date().toLocaleTimeString()}`);

            const localStream = streamInit(uid, $.attendeeMode, $.videoProfile);
            localStreamRef.current = localStream;
            localStream.init(
                () => {
                    if ($.attendeeMode !== "audience") {
                        addStream(localStream, true);
                        client.publish(localStream, (err) => {
                            console.log("Publish local stream error: " + err);
                        });
                    }
                    setReadyState(true);
                },
                (err) => {
                    console.log("getUserMedia failed", err);
                    setReadyState(true);
                }
            );
        });


        const handleMouseMove = () => {
            if (window._toolbarToggle) {
                clearTimeout(window._toolbarToggle);
            }
            document.querySelector(".ag-btn-group").classList.add("active");
            window._toolbarToggle = setTimeout(() => {
                document.querySelector(".ag-btn-group").classList.remove("active");
            }, 2000);
        };

        const canvas = document.querySelector("#ag-canvas");
        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            client && client.unpublish(localStreamRef.current);
            localStreamRef.current && localStreamRef.current.close();
            if (stateSharing) {
                shareClientRef.current && shareClientRef.current.unpublish(shareStreamRef.current);
                shareStreamRef.current && shareStreamRef.current.close();
            }
            client && client.leave(() => {
                console.log("Client succeed to leave.");
            }, () => {
                console.log("Client failed to leave.");
            });
        };
    }, [props]);

    useEffect(() => {
        const canvas = document.querySelector("#ag-canvas");

        if (displayMode === "pip") {
            const no = streamList.length;
            if (no > 4) {
                setDisplayMode("tile");
                return;
            }
            streamList.forEach((item, index) => {
                let id = item.getId();
                let dom = document.querySelector("#ag-item-" + id);
                if (!dom) {
                    dom = document.createElement("section");
                    dom.setAttribute("id", "ag-item-" + id);
                    dom.setAttribute("class", "ag-item");
                    canvas.appendChild(dom);
                    item.play("ag-item-" + id);
                }
                if (index === no - 1) {
                    dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
                } else {
                    dom.setAttribute(
                        "style",
                        `grid-area: span 3/span 4/${4 + 3 * index}/25;
            z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
                    );
                }
                item.player.resize && item.player.resize();
            });
        } else if (displayMode === "tile") {
            streamList.forEach((item, index) => {
                let id = item.getId();
                let dom = document.querySelector("#ag-item-" + id);
                if (!dom) {
                    dom = document.createElement("section");
                    dom.setAttribute("id", "ag-item-" + id);
                    dom.setAttribute("class", "ag-item");
                    canvas.appendChild(dom);
                    item.play("ag-item-" + id);
                }
                dom.setAttribute("style", `grid-area: ${tile_canvas[streamList.length][index]}`);
                item.player.resize && item.player.resize();
            });
        }
    }, [streamList, displayMode]);

    const streamInit = (uid, attendeeMode, videoProfile, config) => {
        let defaultConfig = {
            streamID: uid,
            audio: true,
            video: true,
            screen: false,
        };

        switch (attendeeMode) {
            case "audio-only":
                defaultConfig.video = false;
                break;
            case "audience":
                defaultConfig.video = false;
                defaultConfig.audio = false;
                break;
            default:
                break;
        }

        const stream = AgoraRTC.createStream(merge(defaultConfig, config));
        stream.setVideoProfile(videoProfile);
        return stream;
    };

    const subscribeStreamEvents = () => {
        const client = clientRef.current;
        client.on("stream-added", (evt) => {
            let stream = evt.stream;
            console.log("New stream added: " + stream.getId());
            console.log("At " + new Date().toLocaleTimeString());
            console.log("Subscribe ", stream);
            client.subscribe(stream, (err) => {
                console.log("Subscribe stream failed", err);
            });
        });

        client.on("peer-leave", (evt) => {
            console.log("Peer has left: " + evt.uid);
            console.log(new Date().toLocaleTimeString());
            console.log(evt);
            removeStream(evt.uid);
        });

        client.on("stream-subscribed", (evt) => {
            let stream = evt.stream;
            console.log("Got stream-subscribed event");
            console.log(new Date().toLocaleTimeString());
            console.log("Subscribe remote stream successfully: " + stream.getId());
            console.log(evt);
            addStream(stream);
        });

        client.on("stream-removed", (evt) => {
            let stream = evt.stream;
            console.log("Stream removed: " + stream.getId());
            console.log(new Date().toLocaleTimeString());
            console.log(evt);
            removeStream(stream.getId());
        });
    };

    const removeStream = (uid) => {
        setStreamList((prevList) => {
            return prevList.filter((item) => {
                if (item.getId() === uid) {
                    item.close();
                    let element = document.querySelector("#ag-item-" + uid);
                    if (element) {
                        element.parentNode.removeChild(element);
                    }
                    return false;
                }
                return true;
            });
        });
    };

    const addStream = (stream, push = false) => {
        setStreamList((prevList) => {
            const repeatition = prevList.some((item) => item.getId() === stream.getId());
            if (repeatition) {
                return prevList;
            }
            if (push) {
                return [...prevList, stream];
            } else {
                return [stream, ...prevList];
            }
        });
    };

    return <div id="ag-canvas" style={{ display: readyState ? "block" : "none" }}></div>;
};

export default AgoraCanvas;
