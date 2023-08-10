import {
    Center,
    shaderMaterial,
    useGLTF,
    useTexture,
    PresentationControls,
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import Fireflies from './Fireflies';
import portalVertexShader from '../shaders/portal/vertex';
import portalFragmentShader from '../shaders/portal/fragment';
import * as THREE from 'three';
import { useRef } from 'react';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000'),
    },
    portalVertexShader,
    portalFragmentShader
);
extend({ PortalMaterial });
const Model = () => {
    const portalMaterial = useRef();
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta;
    });
    const { nodes } = useGLTF('/portal.glb');
    const bakedTexture = useTexture('baked.jpg');
    bakedTexture.flipY = false;
    return (
        <>
            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]} // vertical
                azimuth={[-1, 0.75]} //herozintal
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
            >
                <Center>
                    {/* baked */}
                    <mesh
                        geometry={nodes.baked.geometry}
                        position={nodes.baked.position}
                    >
                        <meshBasicMaterial map={bakedTexture} />
                    </mesh>
                    {/* light A */}
                    <mesh
                        geometry={nodes.poleLightA.geometry}
                        position={nodes.poleLightA.position}
                    >
                        <meshBasicMaterial color='#ffffe5' />
                    </mesh>
                    {/* light B */}
                    <mesh
                        geometry={nodes.poleLightB.geometry}
                        position={nodes.poleLightB.position}
                        rotation={nodes.poleLightB.rotation}
                    >
                        <meshBasicMaterial color='#ffffe5' />
                    </mesh>
                    {/* portal light */}
                    <mesh
                        geometry={nodes.portalLight.geometry}
                        position={nodes.portalLight.position}
                        rotation={nodes.portalLight.rotation}
                    >
                        {/* <meshBasicMaterial color='#fff' /> */}
                        <portalMaterial ref={portalMaterial} />
                    </mesh>
                <Fireflies />
                </Center>
            </PresentationControls>
        </>
    );
};

useGLTF.preload('/portal.glb');

export default Model;
