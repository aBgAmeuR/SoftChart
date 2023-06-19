import { DragEvent, FC } from 'react';

interface SidebarProps {
  setAddingEdge: (addingEdge: boolean) => void;
}

const LeftSidebar: FC<SidebarProps> = ({ setAddingEdge }) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string, defaultData: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/data', defaultData);
    event.dataTransfer.effectAllowed = 'move';
  };

  const defaultDataClass = JSON.stringify({
    name: 'Class',
    type: 'Class',
    attributes: [],
    methods: []
  });
  const defaultDataAbstract = JSON.stringify({
    name: 'Abstract',
    type: 'abstract',
    attributes: [],
    methods: []
  });
  const defaultDataInterface = JSON.stringify({
    name: 'Interface',
    type: 'interface',
    attributes: [],
    methods: []
  });

  return (
    <aside id='Sidebar-left'>
      <p>Classes</p>
      <div className="classes">
        <div className='ClassNode' onDragStart={(event) => onDragStart(event, 'classNode', defaultDataClass)} draggable>
          <div className="name">
            <p>Class</p>
          </div>
          <div className="line"></div>
          <div>
          </div>
          <div className="line"></div>
          <div>
          </div>
        </div>
        <div className='ClassNode' onDragStart={(event) => onDragStart(event, 'classNode', defaultDataAbstract)} draggable>
          <div className="name">
            <p>Abstract</p>
          </div>
          <div className="line"></div>
          <div>
          </div>
          <div className="line"></div>
          <div>
          </div>
        </div>
        <div className='ClassNode' onDragStart={(event) => onDragStart(event, 'classNode', defaultDataInterface)} draggable>
          <div className="name">
            <p>Interface</p>
          </div>
          <div className="line"></div>
          <div>
          </div>
          <div className="line"></div>
          <div>
          </div>
        </div>
      </div>
      <p>Relations</p>
      <div className="edges">
        <div className='EdgeNode' onDragStart={(event) => onDragStart(event, 'edgeNode', '')} draggable>
          <div className="name">
            <p>Association</p>
          </div>
          <div className="line"></div>
          <div>
          </div>
        </div>
      </div>
      <button className='btn' onClick={() => setAddingEdge(true)}>Ajouter un Edge</button>
    </aside>
  );
};

export default LeftSidebar;