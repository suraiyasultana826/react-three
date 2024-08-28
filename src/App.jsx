import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit.js';
import { TeapotGeometry } from 'three/examples/jsm/Addons.js';
import { GUI } from 'dat.gui';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    // test.scene.add(boxMesh);



    const teapotGeometry = new TeapotGeometry(10, 8);
    const teapotMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
    teapotMesh.position.x = 1;
    test.scene.add(teapotMesh);

    const gui = new GUI();

    gui.add(teapotMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    gui.add(teapotMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    gui.add(teapotMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');


    //  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 16);
    // const cylinderMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    // cylinderMesh.position.x = 1;
    // test.scene.add(cylinderMesh);



  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;