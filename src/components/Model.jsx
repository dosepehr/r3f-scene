import { Center, useGLTF, useTexture } from '@react-three/drei';
import Fireflies from './Fireflies';

export function Model() {
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
                    <meshBasicMaterial color='#fff' />
                </mesh>
            </>
            <Fireflies />
        </Center>
    );
}

useGLTF.preload('/portal.glb');
