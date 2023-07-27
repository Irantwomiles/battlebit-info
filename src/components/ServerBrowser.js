import {useState, useEffect} from "react";
import {Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

const gamemodes = {
  "CONQ": "Conquest",
  "DOMI": "Domination",
  "RUSH": "Rush",
  "18": "Capture The Flag",
  "FRONTLINE": "Frontline",
  "TDM": "Team Deathmatch"
}

const serverLocation = {
  "Europe_Central": "https://img.icons8.com/?size=1x&id=21742&format=png",
  "Brazil_Central": "https://img.icons8.com/?size=1x&id=15509&format=png",
  "America_Central": "https://img.icons8.com/?size=1x&id=15532&format=png",
  "Japan_Central": "https://img.icons8.com/?size=1x&id=22435&format=png",
  "Australia_Central": "https://img.icons8.com/?size=1x&id=22557&format=png"
}

function ServerBrowser() {

  const [data, setData] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState("--");
  const [totalQueuePlayers, setTotalQueuePlayers] = useState("--");

  const fetchServerListData = async () => {
    const res = await fetch('https://publicapi.battlebit.cloud/Servers/GetServerList');
    const _data = await res.json();

    setData(_data);
  }

  useEffect(() => {

    const timer = setInterval(() => {
      fetchServerListData();
    }, 1000 * 3);

    fetchServerListData();

    return () => {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => {

    let totalPlayers = 0;
    let totalQueue = 0;

    for(const d of data) {
      totalPlayers += d['Players'];
      totalQueue += d['QueuePlayers'];
    }

    setTotalPlayers(`${totalPlayers}`);
    setTotalQueuePlayers(`${totalQueue}`);

  }, [data]);

  return (
      <div className="container">
        <div>Players online <span style={{color: "white", fontWeight: "bold"}}>{totalPlayers}</span> | Players in queue <span style={{color: "white", fontWeight: "bold"}}>{totalQueuePlayers}</span></div>

        <div className={"server-list"}>
          <Table className={"table table-borderless"} variant={"custom"}>
            <tbody>
              <tr className={"server-list-items server-list-header"}>
                <th>Map Name</th>
                <th>Gamemode</th>
                <th>Map Size</th>
                <th>Players</th>
                <th>Region</th>
                <th>Day/Night</th>
              </tr>
              {
                data.map((d, index) => (
                    <tr key={index} className={"server-list-items"}>
                      <td>{d['Map']}</td>
                      <td>{gamemodes[d['Gamemode']]}</td>
                      <td>{d['MapSize']}</td>
                      <td>{d['Players']}/{d['MaxPlayers']} ({d['QueuePlayers']})</td>
                      <td><img src={serverLocation[d['Region']]} alt={d['Region']} /></td>
                      <td>{d['DayNight'] === 'Day' ?
                          <FontAwesomeIcon icon={faSun} className={"day-icon"}/> :
                          <FontAwesomeIcon icon={faMoon} className={"night-icon"}/>
                      }
                      </td>
                    </tr>
                ))
              }
            </tbody>
          </Table>
        </div>

      </div>
  );
}


export default ServerBrowser;
