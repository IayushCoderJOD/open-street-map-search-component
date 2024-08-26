// import Button from "@material-ui/core/Button";
// import Divider from "@material-ui/core/Divider";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import React, { useState } from "react";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
// const params = {
//   q: "",
//   format: "json",
//   addressdetails: "addressdetails",
// };

// export default function SearchBox(props) {
//   const { setSelectPosition } = props;
//   const [searchText, setSearchText] = useState("");
//   const [listPlace, setListPlace] = useState([]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 1 }}>
//           <OutlinedInput
//             style={{ width: "100%" }}
//             value={searchText}
//             onChange={(event) => {
//               setSearchText(event.target.value);
//             }}
//           />
//         </div>
//         <div
//           style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => {
//               const params = {
//                 q: searchText,
//                 format: "json",
//                 addressdetails: 1,
//                 polygon_geojson: 0,
//               };
//               const queryString = new URLSearchParams(params).toString();
//               fetch(`${NOMINATIM_BASE_URL}${queryString}`)
//                 .then((response) => response.json())
//                 .then((result) => {
//                   setListPlace(result);
//                 })
//                 .catch((err) => console.log("err: ", err));
//             }}
//           >
//             Search
//           </Button>
//         </div>
//       </div>
//       <div>
//         <List component="nav" aria-label="main mailbox folders">
//           {listPlace.map((item) => (
//             <div key={item.place_id}>
//               <ListItem
//                 button
//                 onClick={() => {
//                   const { lat, lon } = item;
//                   setSelectPosition({ lat, lon });
//                 }}
//               >
//                 <ListItemIcon>
//                   <img
//                     src="./placeholder.png"
//                     alt="Placeholder"
//                     style={{ width: 38, height: 38 }}
//                   />
//                 </ListItemIcon>
//                 <ListItemText primary={item.display_name} />
//               </ListItem>
//               <Divider />
//             </div>
//           ))}
//         </List>
//       </div>
//     </div>
//   );
// }

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useState } from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [latText, setLatText] = useState("");
  const [lonText, setLonText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleAddressSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    fetch(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result);
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleLatLonSearch = () => {
    const lat = parseFloat(latText);
    const lon = parseFloat(lonText);
    if (!isNaN(lat) && !isNaN(lon)) {
      setSelectPosition({ lat, lon });
    } else {
      alert("Invalid latitude or longitude");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "32px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by address"
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddressSearch}
          >
            Search
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={latText}
            onChange={(event) => setLatText(event.target.value)}
            placeholder="Latitude"
          />
        </div>
        <div style={{ flex: 1, marginLeft: "10px" }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={lonText}
            onChange={(event) => setLonText(event.target.value)}
            placeholder="Longitude"
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleLatLonSearch}
          >
            Go
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => (
            <div key={item.place_id}>
              <ListItem
                button
                onClick={() => {
                  const { lat, lon } = item;
                  setSelectPosition({ lat, lon });
                }}
              >
                <ListItemIcon>
                  <img
                    src="./placeholder.png"
                    alt="Placeholder"
                    style={{ width: 38, height: 38 }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
