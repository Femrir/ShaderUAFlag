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
    float a_x = (position.x - 0.5) * uAmplitude.x;
    float a_y = (position.x - 0.5) * uAmplitude.y;
    
    modelPosition.z += sin(position.x * uFriquency.x + uTime*uSpeed.x) * a_x ;
    modelPosition.x += sin(modelPosition.y * uFriquency.y + uTime*uSpeed.y) * a_y;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionposition = projectionMatrix * viewPosition;

    gl_Position = projectionposition;
}