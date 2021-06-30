import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faGuitar,
  faMusic,
  faPencilAlt,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

const Footer = ({ pathname }) => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faHome} />
            </a>
          </li>
          {(pathname === "/" || pathname === "") && (
            <li>
              <a href={`/provider/create`}>
                <FontAwesomeIcon icon={faList} />
              </a>
            </li>
          )}
          {(pathname.startsWith("/chord/read") ||
            pathname.startsWith("/chord/create")) && (
            <>
              <li>
                <a href={`/chord/list/${pathname.split("/")[3]}`}>
                  <FontAwesomeIcon icon={faList} />
                </a>
              </li>
              <li>
                <a
                  href={`/chord/edit/${pathname.split("/")[3]}/${
                    pathname.split("/")[4]
                  }`}
                >
                  <FontAwesomeIcon icon={faWrench} />
                </a>
              </li>
            </>
          )}
          {pathname.startsWith("/chord/list") && (
            <>
              <li>
                <a href={`/chord/create/${pathname.split("/")[3]}`}>
                  <FontAwesomeIcon icon={faGuitar} />
                </a>
              </li>
              <li>
                <a href={`/song/create/${pathname.split("/")[3]}`}>
                  <FontAwesomeIcon icon={faMusic} />
                </a>
              </li>
            </>
          )}
          {pathname.startsWith("/song/list") && (
            <>
              <li>
                <a href={`/chord/create/${pathname.split("/")[3]}`}>
                  <FontAwesomeIcon icon={faGuitar} />
                </a>
              </li>
              <li>
                <a href={`/song/create/${pathname.split("/")[3]}`}>
                  <FontAwesomeIcon icon={faMusic} />
                </a>
              </li>
            </>
          )}
          {pathname.startsWith("/song/read") && (
            <>
              <li>
                <a href={`/song/list/${pathname.split("/")[3]}`}>
                  <FontAwesomeIcon icon={faList} />
                </a>
              </li>
              <li>
                <a
                  href={`/riff/create/${pathname.split("/")[3]}/${
                    pathname.split("/")[4]
                  }`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
