

precision mediump float;

uniform vec3 uColor1,uColor2;
varying vec3 v_pos;

void main()
{
    vec3 finalColor = step(v_pos.y, 0.)< 0.5? uColor1:uColor2;

    gl_FragColor = vec4(finalColor, 1.0);
}