import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Html, OrbitControls, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const FreeFarm = (args) => {
  const farmRef = useRef();
  useFrame(() => {
    if (farmRef.current) {
      farmRef.current.rotation.x += 0.05;
      farmRef.current.rotation.y += 0.1;
      farmRef.current.position.z = (farmRef.current.position.z + 0.01) % 10;
    }
  });
  const { scene } = useLoader(GLTFLoader, "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf");
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return <primitive ref={farmRef} object={copiedScene} {...args} />;
};

function App() {
  return (
    <Canvas shadows style={{ height: '100vh' }}>
      <Suspense fallback={<Loader />}>
        <pointLight color="yellow" position={[10, 10, 10]} />
        <FreeFarm position={[1, 1, 1]} scale={0.2} rotation-x={1} />
        <OrbitControls />
        <Environment preset="forest" background />
      </Suspense>
    </Canvas>
  );
}

export default App;