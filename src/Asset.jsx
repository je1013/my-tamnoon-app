import { useContext, useState } from "react";
import { EditModeContext } from "./Assets";

export default function Asset({data}) {
  const {id, name, owner, isCrownJewel, isCrownJewelJSON} = data;
  const {isEditMode, addChangeToQueue} = useContext(EditModeContext);
  const [crownJewelState, setCrownJewelState] = useState(isCrownJewel);

  function modifyCrownJewelState(value) {
    const isTrue = (value === 'true');
    setCrownJewelState(isTrue);
    addChangeToQueue(id, isTrue, isCrownJewel, isCrownJewelJSON);
  }

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{owner}</td>
      <td>
        {
          isEditMode ?
          <select value={crownJewelState} onChange={(e)=>{modifyCrownJewelState(e.target.value)}}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
          :
          isCrownJewel.toString()
        }
      </td>
    </tr>
  )
}
