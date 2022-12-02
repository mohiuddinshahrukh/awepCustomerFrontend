import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import React from "react";
// import { OrbitControls, TransformControls } from "three-stdlib";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log("error", error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <FailSafeView />;
    }

    return this.props.children;
  }
}

export default function Stage3DView({ url }) {
  url =
    "https://firebasestorage.googleapis.com/v0/b/awep-92675.appspot.com/o/3D-Models%2Fretro_style_stage.glb?alt=media&token=76314b97-2727-4594-8533-9a75c2b223ad";
  const failSafeUrl = "./sofa2.glb";
  function Model(props) {
    const { scene } = useGLTF(url);

    return <primitive object={scene} {...props} />;
  }
  return (
    <ErrorBoundary>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          width: "100%",
          height: "500px",
          // position: "absolute",
        }}
      >
        {/* <orbitControls />
      <transformControls /> */}
        <color attach="background" args={["#000000"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
          enabled={true} // the controls can be disabled by setting this to false
          // global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          // snap={true} // Snap-back to center (can also be a spring config)
          // speed={1} // Speed factor
          // zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, 0, 0]} // Default rotation
          // polar={[0, Math.PI / 2]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Horizontal limits
          // config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </ErrorBoundary>
  );
}

const FailSafeView = () => {
  const url = "./sofa.glb";
  function Model(props) {
    const { scene } = useGLTF(url);

    return <primitive object={scene} {...props} />;
  }
  return (
    <ErrorBoundary>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          width: "100%",
          height: "500px",
          // position: "absolute",
        }}
      >
        {/* <orbitControls />
        <transformControls /> */}
        <color attach="background" args={["#000000"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
          enabled={true} // the controls can be disabled by setting this to false
          // global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          // snap={true} // Snap-back to center (can also be a spring config)
          // speed={1} // Speed factor
          // zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, 0, 0]} // Default rotation
          // polar={[0, Math.PI / 2]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Horizontal limits
          // config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </ErrorBoundary>
  );
};
