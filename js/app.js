//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;
let fastAnim = true;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  // @ts-ignore
  scene = new THREE.Scene();

  const fov = 60;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  // @ts-ignore
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 4, 25);

  // @ts-ignore
  const ambient = new THREE.AmbientLight(0x000025, 2);
  scene.add(ambient);

  // @ts-ignore
  const light = new THREE.DirectionalLight(0x000136, 1);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  // @ts-ignore
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  // @ts-ignore
  let loader = new THREE.GLTFLoader();
  loader.load("../house/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    fastAnimate();
  });
}

function fastAnimate() {
  requestAnimationFrame(fastAnimate);
  if (house.rotation.z < 30) {
    house.rotation.z += 0.5;
  } else {
    house.rotation.z += 0.005;
  }
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
