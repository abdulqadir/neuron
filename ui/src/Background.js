/* global THREE */
import React, { Component } from 'react';
import './Background.css';

export default class Background extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        try {
            this.renderer = new THREE.WebGLRenderer({canvas:this.canvas, antialias:true});
        }
        catch(e) {
            return;
        }
        this.camera = new THREE.PerspectiveCamera(72, window.innerWidth/window.innerHeight, 3, 110);
        this.camera.position.z = 27;
        this.scene = new THREE.Scene();
        this.group = new THREE.Group();
        this.scene.add(this.group);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color('#ffffff'));
        var textureCanvas = document.createElement('canvas');
        textureCanvas.width = 64;
        textureCanvas.height = 64;
        var ctx = textureCanvas.getContext('2d');
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(32,32,21,0,Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();
        var canvasTexture = new THREE.CanvasTexture(textureCanvas);
        var material = new THREE.SpriteMaterial({map: canvasTexture, color: '#E1F5FE', premultipliedAlpha: true});
        var pointCount = 1053;
        for (var i=0; i < pointCount; i++) {
            var point = new THREE.Sprite(material);
            point.position.x = THREE.Math.randFloatSpread(110);
            point.position.y = THREE.Math.randFloatSpread(110);
            point.position.z = THREE.Math.randFloatSpread(110);
            this.group.add(point);
        }
        this.animate();
        window.onresize = this.resize;
        window.ondeviceorientation = this.resize;
    }

    resize() {
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight, true);
    }

    animate() {
        var time = new Date().getTime();
        if (typeof this.timestamp === 'undefined') {
            this.timestamp = time;
        }
        var frames = (time - this.timestamp)/42;
        this.group.rotation.x += frames * 0.0053;
        this.group.rotation.y += frames * 0.0052;
        this.group.rotation.z += frames * 0.0023;
        this.renderer.render(this.scene, this.camera);
        this.timestamp = time;
        window.requestAnimationFrame(this.animate);
    }

    render() {
        return (
            <canvas ref={c=>this.canvas=c} className="background" />
        );
    }
}
