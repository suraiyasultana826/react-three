import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit.js';
// import { TeapotGeometry } from 'three/examples/jsm/Addons.js';
import { GUI } from 'dat.gui';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const axesHelper = new THREE.AxesHelper(16);
    test.scene.add(axesHelper);

    // const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    // test.scene.add(boxMesh);



    // const teapotGeometry = new TeapotGeometry(10, 8);
    // const teapotMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
    // teapotMesh.position.x = 1;
    // test.scene.add(teapotMesh);

    const gui = new GUI();

    // gui.add(teapotMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    // gui.add(teapotMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    // gui.add(teapotMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
    // gui.add(teapotMesh.scale, 'x', 0, 2).name('Scale X Axis');
    // gui.add(teapotMesh.scale, 'y', 0, 2).name('Scale Y Axis');
    // gui.add(teapotMesh.scale, 'z', 0, 2).name('Scale Z Axis');


    // const materialParams = {
    //   teapotMeshColor: teapotMesh.material.color.getHex(),
    // };
    // gui.add(teapotMesh.material, 'wireframe');
    // gui
    // .addColor(materialParams, 'teapotMeshColor')
    // .onChange((value) => teapotMesh.material.color.set(value));


    //  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 16);
    // const cylinderMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    // cylinderMesh.position.x = 1;
    // test.scene.add(cylinderMesh);

    const al = new THREE.AmbientLight(0xffffff, 0.5);
    test.scene.add(al);

    // const geometryFolder = gui.addFolder('Mesh Geometry');
    // geometryFolder.open();
    // const rotationFolder = geometryFolder.addFolder('Rotation');
    // rotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    // rotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    // rotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
    // const scaleFolder = geometryFolder.addFolder('Scale');
    // scaleFolder.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
    // scaleFolder.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
    // scaleFolder.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');
    // scaleFolder.open();

    // const materialFolder = gui.addFolder('Mesh Material');
    // const materialParams = {
    //   boxMeshColor: boxMesh.material.color.getHex(),
    // };
    // materialFolder.add(boxMesh.material, 'wireframe');
    // materialFolder
    //   .addColor(materialParams, 'boxMeshColor')
    //   .onChange((value) => boxMesh.material.color.set(value));

        // set up ambient light gui
     const alFolder = gui.addFolder('ambient light');
     const alSettings = { color: al.color.getHex() };
     alFolder.add(al, 'visible');
     alFolder.add(al, 'intensity', 0, 1, 0.1);
     alFolder
       .addColor(alSettings, 'color')
       .onChange((value) => al.color.set(value));
     alFolder.open();



    //  const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
    //  const boxMaterial = new THREE.ShaderMaterial({
    //    wireframe: true,
    //    vertexShader: `
    //    void main()	{
    //      // projectionMatrix, modelViewMatrix, position -> passed in from Three.js
    //      gl_Position = projectionMatrix
    //        * modelViewMatrix
    //        * vec4(position.x, position.y, position.z, 1.0);
    //    }
    //    `,
    //    fragmentShader: `
    //    void main() {
    //      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //    }
    //    `,
    //  });
    //  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    //  test.scene.add(boxMesh);

         // part 3 - basics of glsl shaders
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
    const boxMaterial = new THREE.ShaderMaterial({
      wireframe: true,
      vertexShader: `
      void main()	{
        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, position.y, position.z, 1.0);
        gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(position.x, sin(position.z), position.z, 1.0);
        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
        // gl_Position = projectionMatrix
        //   * modelViewMatrix
        //   * vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
      }
      `,
      fragmentShader: `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
      }
      `,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);
   



    return () => {
      gui.destroy();
    };

  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;