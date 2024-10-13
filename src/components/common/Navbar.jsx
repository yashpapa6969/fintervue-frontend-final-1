import { Volume2, VolumeX } from "lucide-react";
import Logo from "../../assests/logo/logo.png";

import { Link } from "react-router-dom";

const Navbar = ({ audioOn, setAudioOn }) => {

    return (
        <div className="w-full flex items-center justify-between py-2 px-10">
            <Link to={"/"}>
                <img src={Logo} alt="Logo"     className="cursor-pointer w-48 h-auto" 
                />
                
            </Link>
            <div className="flex items-center gap-4">
                <div
                    onClick={() => setAudioOn(!audioOn)}
                    className="flex items-center justify-center cursor-pointer rounded-full h-10 w-10 transition-all hover:bg-gray-200"
                >
                    {audioOn ?
                        <Volume2 />
                        : <VolumeX />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar