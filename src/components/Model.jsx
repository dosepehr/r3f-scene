import { Center, shaderMaterial, useGLTF, useTexture } from '@react-three/drei';
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
        <Center>
            <>
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
            </>
            <Fireflies />
        </Center>
    );
};

useGLTF.preload('/portal.glb');

export default Model;
