import { OrbitControls } from '@react-three/drei';
const App = () => {
    return (
        <>
            <OrbitControls makeDefault />
            <mesh scale={1.5}>
                <meshNormalMaterial />
                <boxGeometry />
            </mesh>
        </>
    );
};

export default App;

