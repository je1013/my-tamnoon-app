import raw_assets from './json/assets.json';
import Asset from './Asset.jsx'

export default function Assets() {
  const assets = raw_assets.map(asset => {
    return {
      id: asset._id || 'N/A',
      name: asset.assetName || 'N/A',
      owner: asset.owner.name || asset.owner.owner.name || 'N/A',
      isCrownJewel: asset.enriched.isCrownJewel,
    }
  });

  console.log(assets);
  const columns = ['Id', 'Asset Name', 'Owner Name', 'Is Crown Jewel'];
  return (
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
  )
}
