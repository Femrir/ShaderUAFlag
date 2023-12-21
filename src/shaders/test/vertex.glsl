uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFriquency,uAmplitude,uSpeed;
uniform float uTime;

attribute vec3 position;
varying vec3 v_pos;

void main()
{
    v_pos = position;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFriquency.x + uTime*uSpeed.x) * uAmplitude.x;
    modelPosition.x += sin(modelPosition.y * uFriquency.y + uTime*uSpeed.y) * uAmplitude.y;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionposition = projectionMatrix * viewPosition;

    gl_Position = projectionposition;
}