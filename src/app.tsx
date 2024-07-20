import Grid from './components/grid';
import Level from './components/assets/level';

import ModalLoss from './components/modals/modal-loss';
import ModalWin from './components/modals/modal-win';
import MusicButton from './components/assets/music-btn';
import StartBtn from './components/assets/start-btn';
import { useGameCtx } from './contexts/game-context';
import ListAnswer from './components/blocks/list-answer';

const App = () => {
  const { handelCheat } = useGameCtx();
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div
        className="max-w-6xl h-[640px] bg-center bg-no-repeat relative bg-cover w-full flex flex-col gap-12 items-center "
        style={{
          backgroundImage: 'url(/bg.png)',
        }}
      >
        <button
          className="bg-red-400 text-white px-4 py-2 cursor-pointer rounded font-semibold self-start bottom-[calc(100%_+_16px)] absolute  opacity-0 hover:opacity-100  z-50"
          onClick={handelCheat}
        >
          Cheat
        </button>
        <ModalLoss />
        <ModalWin />
        <Level />
        <MusicButton />
        <StartBtn />
        <Grid />
        <ListAnswer />
        <div
          className="absolute bottom-0 left-0 right-0 p-4 h-full bg-no-repeat bg-center bg-cover z-0"
          style={{
            backgroundImage: 'url(/clould.png)',
          }}
        />
      </div>
    </div>
  );
};

export default App;
