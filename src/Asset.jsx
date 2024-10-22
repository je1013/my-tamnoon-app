export default function Asset({data}) {
  const {id, name, owner, isCrownJewel} = data;

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{owner}</td>
      <td>{isCrownJewel.toString()}</td>
    </tr>
  )
}
