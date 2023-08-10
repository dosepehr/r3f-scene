import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Canvas } from '@react-three/fiber';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [1, 2, 6],
            }}
        >
            <App />
        </Canvas>
    </StrictMode>
);

