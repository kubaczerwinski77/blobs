import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

const Game = () => {
  const context = useContext(SocketContext);

  return null;
  // return (
  //   <div style={{ height: "100vh" }}>
  //     <Canvas style={{ background: "#FFF8EA" }}>
  //       <ambientLight intensity={0.5} />
  //       <pointLight position={[10, 10, 10]} />
  //       <PerspectiveCamera makeDefault rotation={[deg2rad(-20), 0, 0]} />
  //       {/* <OrbitControls /> */}
  //       <Sky
  //         distance={10000}
  //         sunPosition={calcPosFromAngles(0.6, 0.1)}
  //         mieCoefficient={0.005}
  //         mieDirectionalG={0.8}
  //         rayleigh={0.5}
  //         turbidity={10}
  //       />
  //       <Physics gravity={[0, -20, 0]} allowSleep={true}>
  //         <Player />
  //         <Plane />
  //         {context?.players &&
  //           Object.entries<PlayerEntity>(context?.players)
  //             .filter((entity) => entity[0] !== context.id)
  //             .map(([id, player]) => {
  //               return <Cube key={id} position={player.position} />;
  //             })}
  //       </Physics>
  //     </Canvas>
  //   </div>
  // );
};

export default Game;
