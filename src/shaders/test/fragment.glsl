

precision mediump float;

uniform vec3 uColorF_1,uColorF_2,uColorB_1,uColorB_2;
varying vec3 v_pos;

void main()
{
    vec3 color1,color2;
    if(gl_FrontFacing)
    {
    color1 = uColorF_1;
    color2 = uColorF_2;
    }   
    else
    {
    color1 = uColorB_1;
    color2 = uColorB_2;
    }

    vec3 finalColor = step(v_pos.y, 0.)< 0.5? color1:color2;

    gl_FragColor = vec4(finalColor, 1.0);
}