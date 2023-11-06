import * as tree from 'three'
import './style.css'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// scene
const scene = new tree.Scene();


// geometry
const geometry = new tree.SphereGeometry(3, 64, 64);

// material how it looks like i.e matellic roughness
const material = new tree.MeshStandardMaterial({
    color: "#00ff83",
    // flatShading: true,
    roughness: 0.1
  })

// mesh both geo and matellic

const mesh = new tree.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// light
const light = new tree.DirectionalLight(0xffffff, 1, 100);
light.position.set(1, 10, 10);
light.intensity = 1.5
scene.add(light);

// camera
const camera = new tree.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 15;
scene.add(camera);

// rendererr
const canvas = document.querySelector('.webgl');
const renderer = new tree.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3;

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(sizes.width, sizes.height)
})


const loop = () =>{
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(mesh.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z:1, duration: 1}) 
t1.fromTo("nav", {y: "-100%"}, {y: "0%", duration: 1})
t1.fromTo(".title", {opacity: 0}, {opacity: 1, duration: 1})

// mouse animation

let mouseDown = false
window.addEventListener("mousedown", () => {
  mouseDown = true
})
window.addEventListener("mouseup", () => {
  mouseDown = false
})

window.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    const rgb = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    mesh.material.color.setStyle(rgb);
  }
});

// rgb = [
//   Math.round((event.pageX / window.innerWidth) * 255),
//   Math.round((event.pageY / window.innerHeight) * 255),
//   156,
// ]
// let newColor = new tree.Color(`rgb(${rgb.join(",")})`)
// gsap.to(mesh.material.color, {
//   r: newColor.r,
//   g: newColor.g,
//   b: newColor.b
// })