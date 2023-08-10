import { Sparkles } from '@react-three/drei';
import React from 'react';

const Fireflies = () => {
    return (
        <>
            <Sparkles
                size={6}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.5}
                count={50}
                noise={[0.01, 0.01, 0.01]}
            />
        </>
    );
};

export default Fireflies;
