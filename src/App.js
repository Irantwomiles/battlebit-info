import './App.scss';

import {useState, useEffect} from "react";

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
  "Japan_Central": "https://img.icons8.com/?size=1x&id=22435&format=png"
}

function App() {

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
      <div className="main-wrapper">
        <div>Players online <span style={{color: "white", fontWeight: "bold"}}>{totalPlayers}</span> | Players in queue <span style={{color: "white", fontWeight: "bold"}}>{totalQueuePlayers}</span></div>

        <div className={"server-list"}>
          <table>
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
                      <td><img src={serverLocation[d['Region']]} /></td>
                      <td>{d['DayNight'] === 'Day' ? <i className="fa-regular fa-sun day-icon"/> :
                          <i className="fa-regular fa-moon night-icon"/>}</td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
  );
}


export default App;
