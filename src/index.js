const THREE = require("three");
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add model to scene
const loader = new GLTFLoader().setPath("./assets/");
loader.load("scene1.gltf", function (gltf) {
    scene.add(gltf.scene);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.error(error);
});

// import gradient background for scene
const imgLoader = new THREE.TextureLoader();
imgLoader.load("./assets/RandD-Spinwall-background.png", function (texture) {
    scene.background = texture
})

// add scene lighting to achieve color and edge definition. 
const ambientLight = new THREE.AmbientLight(0xffffff, 4.6);
ambientLight.position.set(10, 10, 10);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, -10, 10);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-5, 10, -10);
scene.add(directionalLight2);

// Enable Orbit Controls and Set Camera Positions
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(4, 0, 0);
controls.update();

const animate = function () {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};

animate();