import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


const container =
document.getElementById(
"earth-container"
);



const scene =
new THREE.Scene();



const camera =
new THREE.PerspectiveCamera(
35,
window.innerWidth/window.innerHeight,
0.1,
1000
);



camera.position.z = 3;



const renderer =
new THREE.WebGLRenderer({
alpha:true,
antialias:true
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


renderer.setPixelRatio(
window.devicePixelRatio
);


container.appendChild(
renderer.domElement
);





// EARTH

// =========================
// TEXTURES
// =========================

const loader = new THREE.TextureLoader();

const earthTexture = loader.load("assets/earth.jpg");
const cloudTexture = loader.load("assets/earth-clouds.png");
const nightTexture = loader.load("assets/earth-night.jpg");

// =========================
// EARTH
// =========================

const earth = new THREE.Mesh(

    new THREE.SphereGeometry(1,128,128),

    new THREE.MeshStandardMaterial({

        map:earthTexture,

        metalness:.05,

        roughness:.75,

        emissiveMap:nightTexture,

        emissive:new THREE.Color(0x00ffd5),

        emissiveIntensity:.15

    })

);

scene.add(earth);

// =========================
// CLOUDS
// =========================

const clouds = new THREE.Mesh(

    new THREE.SphereGeometry(1.012,128,128),

    new THREE.MeshStandardMaterial({

        map:cloudTexture,

        transparent:true,

        opacity:.55,

        depthWrite:false

    })

);

scene.add(clouds);

// =========================
// ATMOSPHERE
// =========================

const atmosphere = new THREE.Mesh(

    new THREE.SphereGeometry(1.08,128,128),

    new THREE.MeshBasicMaterial({

        color:0x00ffc8,

        transparent:true,

        opacity:.15,

        side:THREE.BackSide

    })

);

scene.add(atmosphere);

// =========================
// STARFIELD
// =========================

const starGeometry = new THREE.BufferGeometry();

const starVertices=[];

for(let i=0;i<12000;i++){

    starVertices.push(

        (Math.random()-.5)*800,

        (Math.random()-.5)*800,

        (Math.random()-.5)*800

    );

}

starGeometry.setAttribute(

'position',

new THREE.Float32BufferAttribute(

starVertices,

3

)

);

const stars = new THREE.Points(

starGeometry,

new THREE.PointsMaterial({

color:0xffffff,

size:.6,

sizeAttenuation:true

})

);

scene.add(stars);

// =========================
// SATELLITES
// =========================

const satelliteGroup=new THREE.Group();

scene.add(satelliteGroup);

for(let i=0;i<6;i++){

const body=new THREE.Mesh(

new THREE.BoxGeometry(.03,.03,.08),

new THREE.MeshStandardMaterial({

color:0xffffff,

emissive:0x00ffcc,

emissiveIntensity:2

})

);

body.position.x=1.45;

const orbit=new THREE.Group();

orbit.rotation.y=(Math.PI*2/6)*i;

orbit.add(body);

satelliteGroup.add(orbit);

}

// =========================
// MOUSE PARALLAX
// =========================

let mouseX=0;

let mouseY=0;

window.addEventListener("mousemove",(e)=>{

mouseX=(e.clientX/window.innerWidth-.5);

mouseY=(e.clientY/window.innerHeight-.5);

});

// =========================
// ANIMATE
// =========================

function animate(){

requestAnimationFrame(animate);

earth.rotation.y+=0.0015;

clouds.rotation.y+=0.0019;

atmosphere.rotation.y+=0.0008;

stars.rotation.y+=0.00005;

satelliteGroup.children.forEach((orbit,index)=>{

orbit.rotation.y+=0.008+(index*.001);

orbit.rotation.z+=0.001;

});

camera.position.x+=((mouseX*.25)-camera.position.x)*.04;

camera.position.y+=((-mouseY*.18)-camera.position.y)*.04;

camera.lookAt(0,0,0);

renderer.render(scene,camera);

}

animate();
// LIGHT

const light =
new THREE.DirectionalLight(
0xffffff,
2
);


light.position.set(
5,
3,
5
);


scene.add(light);



const ambient =
new THREE.AmbientLight(
0x88ffaa,
0.5
);


scene.add(ambient);





// STARS

const starsGeometry =
new THREE.BufferGeometry();


const starCount = 3000;


const positions=[];


for(let i=0;i<starCount;i++){

positions.push(
(Math.random()-0.5)*200,
(Math.random()-0.5)*200,
(Math.random()-0.5)*200
);

}



starsGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
positions,
3
)
);



const stars =
new THREE.Points(

starsGeometry,

new THREE.PointsMaterial({
size:.08,
color:0xffffff
})

);



scene.add(stars);






function animate(){

requestAnimationFrame(
animate
);


earth.rotation.y +=0.002;


stars.rotation.y -=0.0002;


renderer.render(
scene,
camera
);

}


animate();





window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);
window.addEventListener("load", () => {

    const loader = document.getElementById("loading");

    loader.style.opacity = "0";

    loader.style.pointerEvents = "none";

    setTimeout(() => {

        loader.remove();

    },700);

});
