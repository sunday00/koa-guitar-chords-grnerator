import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faPencilRuler,
} from "@fortawesome/free-solid-svg-icons";

const Footer = ({pathname}) => {
    return (
        <footer>
            <nav>
                <ul>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faHome} />
                        </a>
                    </li>
                    {
                        (pathname.startsWith("/chord/read") || pathname.startsWith("/chord/create")) && 
                        <li>
                            <a href={`/chord/list/${pathname.split("/")[3]}`}> 
                                <FontAwesomeIcon icon={faList} />
                            </a>
                        </li>
                        
                    }
                    {
                        pathname.startsWith("/chord/list") && 
                        <li>
                            <a href={`/chord/create/${pathname.split("/")[3]}`}> <FontAwesomeIcon icon={faPencilRuler} />
                            </a>
                        </li>
                    }
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;