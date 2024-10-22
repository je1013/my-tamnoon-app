import raw_assets from './json/assets.json';
import Asset from './Asset.jsx'
import { createContext, useState } from 'react';

export const EditModeContext = createContext(null);
export default function Assets() {
  const columns = ['Id', 'Asset Name', 'Owner Name', 'Is Crown Jewel'];
  const [savedEdits, setSavedEdits] = useState(JSON.parse(localStorage.getItem("savedEdits") || '{}'));
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEdits, setCurrentEdits] = useState({});

  const assets = raw_assets.map(asset => {
    const hasCrownJewelChanges = savedEdits[asset._id] !== undefined;
    return {
      id: asset._id || 'N/A',
      name: asset.assetName || 'N/A',
      owner: asset.owner.name || asset.owner.owner.name || 'N/A',
      isCrownJewel: hasCrownJewelChanges ? savedEdits[asset._id] : asset.enriched.isCrownJewel,
      isCrownJewelJSON: asset.enriched.isCrownJewel,
    }
  });

  function addChangeToQueue(id, value, original, isCrownJewelJSON) {
    setCurrentEdits(curr => {
      if (value === original) {
        delete curr[id];
      } else {
        curr[id] = {value, isCrownJewelJSON};
      }
      return curr;
    });
  }

  function toggleIsEditMode() {
    if (isEditMode) {
      setSavedEdits(saved => {
        for (const [id, details] of Object.entries(currentEdits)) {
          if (details.isCrownJewelJSON === details.value) {
            delete saved[id];
          } else {
            saved[id] = details.value;
          }
        }

        return saved;
      })

      localStorage.setItem('savedEdits', JSON.stringify(savedEdits));
    };

    setCurrentEdits({});
    setIsEditMode(v => !v);
  }

  return (
    <EditModeContext.Provider value={{isEditMode, addChangeToQueue}}>
      <h3>Current Mode: {isEditMode ? 'Edit' : 'View'} Mode</h3>
      <button value={isEditMode} onClick={toggleIsEditMode}>Change Mode</button>
      <table>
        <thead>
          <tr>
            {
              columns.map((column, index) => {
                return (<th key={index} scope="col">{column}</th>)
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            assets.map(asset => {
              return (<Asset key={asset.id} data={asset}/>)
            })
          }
        </tbody>
      </table>
    </EditModeContext.Provider>
  )
}
