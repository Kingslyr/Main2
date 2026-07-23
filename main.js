import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

const container = document.getElementById("earth-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// TEXTURE LOADER (use distinct variable name)
const textureLoader = new THREE.TextureLoader();

// CDN/raw URLs so the demo runs without local assets
const earthTexture = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg");
const cloudTexture = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png");
const nightTexture = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png");

// EARTH
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 128, 128),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    metalness: 0.05,
    roughness: 0.75,
    emissiveMap: nightTexture,
    emissive: new THREE.Color(0x00ffd5),
    emissiveIntensity: 0.15,
  })
);
scene.add(earth);

// CLOUDS
const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(1.012, 128, 128),
  new THREE.MeshStandardMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
);
scene.add(clouds);

// ATMOSPHERE
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.08, 128, 128),
  new THREE.MeshBasicMaterial({
    color: 0x00ffc8,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
  })
);
scene.add(atmosphere);

// STARFIELD 1 (larger, sparse)
const starGeometry1 = new THREE.BufferGeometry();
const starVertices1 = [];
for (let i = 0; i < 12000; i++) {
  starVertices1.push((Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800);
}
starGeometry1.setAttribute('position', new THREE.Float32BufferAttribute(starVertices1, 3));
const stars1 = new THREE.Points(starGeometry1, new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, sizeAttenuation: true }));
scene.add(stars1);

// STARFIELD 2 (denser, small)
const starGeometry2 = new THREE.BufferGeometry();
const positions2 = [];
const starCount2 = 3000;
for (let i = 0; i < starCount2; i++) {
  positions2.push((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200);
}
starGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3));
const stars2 = new THREE.Points(starGeometry2, new THREE.PointsMaterial({ size: 0.08, color: 0xffffff }));
scene.add(stars2);

// SATELLITES
const satelliteGroup = new THREE.Group();
scene.add(satelliteGroup);
for (let i = 0; i < 6; i++) {
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.03, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00ffcc, emissiveIntensity: 2 })
  );
  body.position.x = 1.45;
  const orbit = new THREE.Group();
  orbit.rotation.y = (Math.PI * 2 / 6) * i;
  orbit.add(body);
  satelliteGroup.add(orbit);
}

// MOUSE PARALLAX
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
});

// LIGHTS (create before animate)
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 3, 5);
scene.add(light);
const ambient = new THREE.AmbientLight(0x88ffaa, 0.5);
scene.add(ambient);

// ANIMATE (single function)
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.0018;
  clouds.rotation.y += 0.0022;
  atmosphere.rotation.y += 0.0009;
  stars1.rotation.y += 0.00005;

  satelliteGroup.children.forEach((orbit, index) => {
    orbit.rotation.y += 0.008 + (index * 0.001);
    orbit.rotation.z += 0.001;
  });

  // secondary starfield motion
  stars2.rotation.y -= 0.0002;

  camera.position.x += ((mouseX * 0.25) - camera.position.x) * 0.04;
  camera.position.y += ((-mouseY * 0.18) - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// RESIZE HANDLER (clean and top-level)
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// LOADER HIDE (top-level, avoid shadowing `textureLoader`)
window.addEventListener('load', () => {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    loadingEl.style.opacity = '0';
    loadingEl.style.pointerEvents = 'none';
    setTimeout(() => {
      loadingEl.remove();
    }, 700);
  }
});
