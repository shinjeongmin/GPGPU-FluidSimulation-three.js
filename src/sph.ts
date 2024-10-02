import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import { Particle } from './particle';

export class SPH{
  //#region SPH variable - general
  public showSpheres: boolean = true;
  public numToSpawn: THREE.Vector3 = new THREE.Vector3(10, 10, 10);
  public totalParticles: number = this.numToSpawn.x * this.numToSpawn.y * this.numToSpawn.z;
  public spawnCenter: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public particleRadius: number = 0.1;
  //#endregion

  //#region SPH variable - particle rendering
  public particleMesh: THREE.Mesh;
  public particleRenderSize: number = 8;
  public material: THREE.Material;
  //#endregion

  //#region SPH variable - compute
  public gpuCompute: GPUComputationRenderer;
  public dtPosition: THREE.DataTexture;
  public positionVariable: any;
  public particles: Particle[];
  //#endregion

  //#region SPH variable - compute
  // const gpuCompute = new GPUComputationRenderer(canvas.clientWidth,  canvas.clientHeight, renderer)
  // const dtPosition = gpuCompute.createTexture();
  // const positionVariable = gpuCompute.addVariable('uCurrentPosition', computefragment, dtPosition )
  // gpuCompute.setVariableDependencies(positionVariable, [positionVariable])
  // gpuCompute.init()
  // let particles: Particle[];
  //#endregion

  constructor(private canvas: HTMLElement, private renderer: THREE.WebGLRenderer) {
    this.particleMesh = new THREE.Mesh();

    this.gpuCompute = new GPUComputationRenderer(this.canvas.clientWidth, this.canvas.clientHeight, this.renderer);
  }

  public setShowSpheres(value: boolean){
    this.showSpheres = value
    if(this.showSpheres)
      this.particleMesh.visible = true;
    else
      this.particleMesh.visible = false;
    console.log(this.showSpheres)
  }
  public setShader(computefragment: string){
    this.dtPosition = this.gpuCompute.createTexture();
    this.positionVariable = this.gpuCompute.addVariable('uCurrentPosition', computefragment, this.dtPosition);
    this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable]);

    this.gpuCompute.init();
  }
}