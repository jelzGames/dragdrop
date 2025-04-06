
import CardItem from './CardItem'; 
import { useParams } from 'react-router-dom';
import { ColumnId } from './boardtypes'


export default function CardPage() 
{
  const { id, idColumn } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <CardItem id={id} columnId={idColumn as ColumnId}/>
    </div>
  );
}
