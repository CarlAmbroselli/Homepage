(function(window){'use strict';var BreathingHalftone=window.BreathingHalftone;var isInited=false;function init(){if(isInited){return;}
isInited=true;var img=document.querySelector('#hero img');new BreathingHalftone(img,{dotSize:{diameter:1/60,threshold:0.05,initVelocity:0.02,oscPeriod:3,oscAmplitude:0.2},isAdditive:false,isRadial:false,channels:['red','green','blue'],isChannelLens:true,friction:0.06,displacement:{hoverDiameter:0.1,hoverForce:-0.02,activeDiameter:0.6,activeForce:0.01}});}
document.addEventListener('DOMContentLoaded',init,false);window.onload=init;})(window);