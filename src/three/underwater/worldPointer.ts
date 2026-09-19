import * as THREE from 'three';

// Shared world-space cursor point, written by the camera rig each frame.
// Fish read from this to react to the cursor's position in the ocean.
export const worldPointer = {
  pos: new THREE.Vector3(0, 2, 0),
  active: false,
  prev: new THREE.Vector3(0, 2, 0),
  delta: new THREE.Vector3(0, 0, 0)
};