import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( "#1C1C1C" );

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        uFriquency: { value: new THREE.Vector2(10, 7) },
        uAmplitude: { value: new THREE.Vector2(0.17, 0.1) },
        uSpeed: { value: new THREE.Vector2(3, 2) },
        uTime: { value: 0 },

        uColorF_1: { value: new THREE.Color('#0057b8') },
        uColorF_2: { value: new THREE.Color('#ffd700') },

        uColorB_1: { value: new THREE.Color('#ff0000') },
        uColorB_2: { value: new THREE.Color('#191919') },
    },
    side: 2,
})


const speedGui = gui.addFolder("Speed")
speedGui.close()
speedGui
    .add(material.uniforms.uSpeed.value, 'x')
    .min(-5)
    .max(5)
    .step(0.1)
speedGui
    .add(material.uniforms.uSpeed.value, 'y')
    .min(-5)
    .max(5)
    .step(0.1)

const friquencyGui = gui.addFolder("Friquency")
friquencyGui.close()
friquencyGui
    .add(material.uniforms.uFriquency.value, 'x')
    .min(0)
    .max(10)
    .step(0.01)
friquencyGui
    .add(material.uniforms.uFriquency.value, 'y')
    .min(0)
    .max(10)
    .step(0.01)

const amplitudeGui = gui.addFolder("Amplitude")
amplitudeGui
    .add(material.uniforms.uAmplitude.value, 'x')
    .min(0)
    .max(1)
    .step(0.01)
amplitudeGui
    .add(material.uniforms.uAmplitude.value, 'y')
    .min(0)
    .max(1)
    .step(0.01)

// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.y = 0.5
scene.add(mesh)

const radius = 0.01;
const height = 3;

const geometryCylinder = new THREE.CylinderGeometry( radius, radius, height, 32 ); 
const materialCylinder = new THREE.MeshBasicMaterial( {color: '#8A9393'} ); 
const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder ); 
cylinder.position.set(mesh.scale.x/2 + radius, - height/2 + mesh.scale.y/2,0)

scene.add(cylinder)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2 * mesh.scale.x, - 0.5, 2 * mesh.scale.x)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.set(mesh.scale.x/4 + radius,  - height/4 + mesh.scale.y/2,0)
console.log(controls)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    precision: 'highp'
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()