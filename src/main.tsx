import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GameProvider } from './contexts/game-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <GameProvider>
      <App />
    </GameProvider>
  </DndProvider>,
);
