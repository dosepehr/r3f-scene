import { OrbitControls } from '@react-three/drei';
import Model from './components/Model';
const App = () => {
    return (
        <>
            <OrbitControls makeDefault />
            <Model />
        </>
    );
};

export default App;

