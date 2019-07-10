import {Component, ViewChild, ElementRef} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @ViewChild('rendererContainer', {static: false}) rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  torusKnot = null;

  constructor() {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.camera.position.z = 23;
      // // 0xffd700
      // // 0x2194ce
      // const geometry = new THREE.BoxGeometry(500, 500, 500);
      // var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
      // const material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true, vertexColors:THREE.VertexColors});
      // this.mesh = new THREE.Mesh(geometry, material);
      // this.scene.add(this.mesh);

      var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
      var material = new THREE.MeshBasicMaterial( { color: 0xffff, wireframe: true } );
      // this.torusKnot = new THREE.Mesh( geometry, material );
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add( this.mesh );

      
  }

  ngAfterViewInit() {
      // const canvas = this.renderer.domElement;
      // const width = canvas.clientWidth;
      // const height = canvas.clientHeight;

      // if (canvas.width !== width ||canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        // this.renderer.setSize(width, height, false);
        // this.camera.aspect = width / height;
        // this.camera.updateProjectionMatrix();
    
        // set render target sizes here
      // }
      this.renderer.setClearColor(0x000, 1.0);
      this.renderer.setSize( 718, 500, false );
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.renderer.setSize(width, height);
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      this.animate();
  }

  animate() {
      window.requestAnimationFrame(() => this.animate());
      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
  }
}
